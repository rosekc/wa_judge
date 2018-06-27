from flask import g, request
from flask_httpauth import HTTPTokenAuth
from flask_restful import Resource
from marshmallow import ValidationError, fields
from sqlalchemy import and_, or_

from .. import db, ma
from ..models import User
from ..utils.decorators import get_args
from ..utils.errors import (conflict, not_found, unauthorized,
                            bad_request)
from ..utils.helpers import ExtendModelConverter

auth = HTTPTokenAuth(scheme='Bearer')


@auth.verify_token
def verify_token(token):
    g.current_user = User.verify_auth_token(token)
    if g.current_user:
        return True
    return False


# Change log: change basic auth to bearer auth
# @auth.verify_password
# def verify_password(username_or_token, password):
#     g.authenticated = False
#     g.current_user = None
#     if username_or_token == '':
#         return True
#     if password == '':
#         g.current_user = User.verify_auth_token(username_or_token)
#         g.token_used = True
#     else:
#         user = User.query.filter_by(username=username_or_token).first()
#         g.token_used = False
#         if user and user.verify_password(password):
#             g.current_user = user
#     if g.current_user:
#         g.authenticated = True
#     return g.authenticated


class TokenApi(Resource):
    def post(self):
        json_data = request.get_json()
        try:
            username = json_data['username']
            password = json_data['password']
        except (AttributeError, TypeError):
            return bad_request('miss some field')
        user = User.query.filter_by(username=username).first()
        if user and user.verify_password(password):
            return {'token': user.generate_auth_token(3600), 'user_id': user.id}
        return unauthorized('username or password is wrong')


class UserSchema(ma.ModelSchema):
    class Meta:
        model = User
        model_converter = ExtendModelConverter
        fields = ('id', 'username', 'last_seen', 'member_since', 'password', 'role')
        load_only = ('password')
        dump_only = ('id')
    password = fields.Str()


class UserApi(Resource):
    user_schema = UserSchema()
    can_modify = ('password')

    @get_args('user_id')
    @auth.login_required
    def get(self, user_id=None):
        user = User.query.filter_by(id=user_id).first()
        if user is None:
            return not_found('user not found.')
        return self.user_schema.dump(user).data

    def post(self):
        json_data = request.get_json()
        try:
            if isinstance(json_data, dict):
                users = [self.user_schema.load(json_data).data]
            else:
                users = self.user_schema.load(json_data, many=True).data
        except (ValidationError, AttributeError) as err:
            return bad_request(err.messages)
        errors = []
        data = []
        for u in users:
            user = User.query.filter(or_(User.username == u.username,
                                         and_(User.email.isnot(None), User.email == u.email))).first()
            if user:
                errors.append('User %s have been created' % u.username)
                continue
            db.session.add(u)
            data.append(u)
        db.session.commit()
        if len(errors) == 0:
            status_code = 200
        else:
            status_code = 409
        return {'errors': errors, 'data': self.user_schema.dump(data, many=True).data}, status_code

    @auth.login_required
    def put(self):
        json_data = request.get_json()
        if not json_data:
            return bad_request('data not found in request.')
        user = g.current_user
        for key, value in json_data.items():
            if key not in self.can_modify:
                return bad_request('key "%s" not existed or can not modify.' % key)
            setattr(user, key, value)
        db.session.add(user)
        db.session.commit()
        return self.user_schema.dump(user).data
