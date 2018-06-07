import enum
from datetime import datetime

from flask import current_app
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from werkzeug.security import check_password_hash, generate_password_hash

from . import db


class UserRole(enum.Enum):
    ADMIN = 'ADMIN'
    MANAGER = 'MANAGER'
    USER = 'USER'

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(64), unique=True, index=True)
    username = db.Column(db.String(64), unique=True, index=True)
    password_hash = db.Column(db.String(128))
    role = db.Column(db.Enum(UserRole), nullable=False, default=UserRole.USER)
    member_since = db.Column(db.DateTime(), default=datetime.utcnow)
    last_seen = db.Column(db.DateTime(), default=datetime.utcnow)
    submissions = db.relationship('Submission', back_populates='author')
    own_contests = db.relationship('Contest', back_populates='owner_user')

    @property
    def password(self):
        raise AttributeError('password is not a readable attribute')

    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)

    def generate_confirmation_token(self, expiration=3600):
        s = Serializer(current_app.config['SECRET_KEY'], expiration)
        return s.dumps({'confirm': self.id}).decode('utf-8')

    def ping(self):
        """表示上线冒泡了，悄悄记下登录时间先
        """
        self.last_seen = datetime.utcnow()
        db.session.add(self)

    def generate_auth_token(self, expiration):
        s = Serializer(current_app.config['SECRET_KEY'],
                       expires_in=expiration)
        return s.dumps({'id': self.id}).decode('utf-8')

    @staticmethod
    def verify_auth_token(token):
        s = Serializer(current_app.config['SECRET_KEY'])
        try:
            data = s.loads(token)
        except:
            return None
        return User.query.get(data['id'])

    def __repr__(self):
        return '<User %r>' % self.username


class ContestPermission(enum.Enum):
    """
        `Contest`的权限枚举类

        PUBLIC - 谁都能进

        PRIVATE - 只有限定人才能进

        INVISIBLE - 除了创建者能见
    """
    PUBLIC = 'PUBLIC'
    PRIVATE = 'PRIVATE'
    INVISIBLE = 'INVISIBLE'


class Contest(db.Model):
    __tablename__ = 'contests'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64))
    create_time = db.Column(
        db.DateTime(), default=datetime.utcnow, nullable=False)
    start_time = db.Column(db.DateTime(), nullable=False)
    length = db.Column(db.Interval, nullable=False)
    permission = db.Column(db.Enum(ContestPermission), nullable=False)
    owner_user_id = db.Column(
        db.Integer, db.ForeignKey('users.id'), nullable=False)
    owner_user = db.relationship('User', back_populates='own_contests')
    problem_set_filename = db.Column(db.String(64))
    submissions = db.relationship('Submission', back_populates='contest')

    def is_running(self):
        current_time = datetime.utcnow()
        return self.start_time <= current_time <= self.start_time + self.length

    def is_ended(self):
        current_time = datetime.utcnow()
        return current_time > self.start_time + self.length

    def is_started(self):
        current_time = datetime.utcnow()
        return current_time >= self.start_time


class Submission(db.Model):
    __tablename__ = 'submissions'
    id = db.Column(db.Integer, primary_key=True)
    author_id = db.Column(
        db.Integer, db.ForeignKey('users.id'), nullable=False)
    author = db.relationship('User', back_populates='submissions')
    contest_id = db.Column(db.Integer, db.ForeignKey('contests.id'))
    contest = db.relationship('Contest', back_populates='submissions')
    submit_time = db.Column(db.DateTime(), default=datetime.utcnow)
    uploaded_filename = db.Column(db.String(128))
