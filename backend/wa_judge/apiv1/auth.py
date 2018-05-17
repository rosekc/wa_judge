from flask import g, request
from flask_httpauth import HTTPBasicAuth
from flask_restful import Resource
from marshmallow import ValidationError, fields
from sqlalchemy import and_, or_

from .. import db, ma
from ..models import User
from ..utils.decorator import get_args
from ..utils.errors import conflict, not_found, unprocessable_entity

auth = HTTPBasicAuth()


@auth.verify_password
def verify_password(username_or_token, password):
    if username_or_token == '':
        return False
    if password == '':
        g.current_user = User.verify_auth_token(username_or_token)
        g.token_used = True
        return g.current_user is not None
    user = User.query.filter_by(username=username_or_token).first()
    if not user or not user.verify_password(password):
        return False
    g.current_user = user
    g.token_used = False
    return True


class TokenApi(Resource):
    @auth.login_required
    def get(self):
        return {'token': g.current_user.generate_auth_token(3600)}


class UserSchema(ma.ModelSchema):
    class Meta:
        model = User
        fields = ('id', 'username', 'last_seen', 'member_since', 'password')
        load_only = ('password')
        dump_only = ('id')
    password = fields.Str()


class UserApi(Resource):
    user_schema = UserSchema()
    can_modify = ('password')

    @get_args('user_id')
    def get(self, user_id=None):
        user = User.query.filter_by(id=user_id).first()
        if user is None:
            return not_found('user not found.')
        return self.user_schema.dump(user).data

    def post(self):
        json_data = request.get_json()
        try:
            data = self.user_schema.load(json_data).data
        except (ValidationError, AttributeError) as err:
            return unprocessable_entity(err.messages)
        user = User.query.filter(or_(User.username == data.username,
                                     and_(User.email.isnot(None), User.email == data.email))).first()
        if user:
            return conflict('User have been existed')
        db.session.add(data)
        db.session.commit()
        return self.user_schema.dump(data)

    @auth.login_required
    def put(self):
        json_data = request.get_json()
        if not json_data:
            unprocessable_entity('data not found in request.')
        user = g.current_user
        for key, value in json_data.items():
            if (key not in self.can_modify):
                return unprocessable_entity('key "%s" not existed or can not modify.' % key)
            setattr(user, key, value)
        db.session.add(user)
        return self.user_schema.dump(user).data
