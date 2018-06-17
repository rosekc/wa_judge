import os

from flask import Flask, abort, current_app
from flask_marshmallow import Marshmallow
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from flask_uploads import configure_uploads, send_from_directory

from .config import config

db = SQLAlchemy()
ma = Marshmallow()


def create_app(config_name=None, test_config=None):
    app = Flask(__name__, instance_relative_config=True)

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    if config_name is None:
        config_name = app.config.get('CONFIG_NAME', 'development')
    app.config.from_object(config[config_name])

    # 为sqlite加上外键验证
    if app.config.get('SQLALCHEMY_DATABASE_URI').startswith('sqlite:///'):
        from sqlalchemy.engine import Engine
        from sqlalchemy import event

        @event.listens_for(Engine, "connect")
        def set_sqlite_pragma(dbapi_connection, connection_record):
            cursor = dbapi_connection.cursor()
            cursor.execute("PRAGMA foreign_keys=ON")
            cursor.close()

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    db.init_app(app)
    ma.init_app(app)

    api = Api(prefix='/apiv1')

    from .apiv1.auth import TokenApi, UserApi
    api.add_resource(TokenApi, '/token')
    api.add_resource(UserApi, '/users/', '/users/<int:user_id>')
    from .apiv1.contest import ContestApi, ContestProblemSetApi, SubmissionApi, SubmissionFileApi, ContestantApi
    api.add_resource(ContestApi, '/contests/', '/contests/<int:contest_id>')
    api.add_resource(ContestantApi,
                     '/contests/<int:contest_id>/contestants/')
    api.add_resource(ContestProblemSetApi,
                     '/contests/<int:contest_id>/problem_set')
    api.add_resource(SubmissionApi, '/submissions/',
                     '/submissions/<int:submission_id>')
    api.add_resource(SubmissionFileApi,
                     '/submissions/<int:submission_id>/submission_file')
    api.init_app(app)

    app.config['UPLOADS_DEFAULT_DEST'] = app.instance_path

    from .apiv1.contest import problem_sets, submission_files
    configure_uploads(app, problem_sets)
    configure_uploads(app, submission_files)

    return app


app = create_app()


@app.endpoint('_uploads.uploaded_file')
def uploaded_file(setname, filename):
    abort(404)


@app.shell_context_processor
def make_shell_context():
    from .models import User, Contest, Submission
    return dict(db=db, User=User, Contest=Contest, Submission=Submission)


@app.cli.command()
def test():
    """Run the unit tests."""
    import unittest
    tests = unittest.TestLoader().discover('tests')
    unittest.TextTestRunner(verbosity=2).run(tests)


@app.cli.command()
def init_db():
    db.create_all()


@app.cli.command()
def gen_test_db():
    from .models import User, Contest, ContestPermission, UserRole
    from datetime import datetime, timedelta
    db.create_all()
    u1 = User(username='wawawa', password='wawawa', role=UserRole.ADMIN)
    u2 = User(username='wawa', password='wawa')
    db.session.add(u1)
    db.session.add(u2)
    db.session.add(Contest(name='WA Judge Contest Round 1',
                           start_time=datetime.utcnow(), owner_user=u1,
                           permission=ContestPermission.PRIVATE, length=timedelta(seconds=3600)))
    db.session.add(Contest(name='WA Judge Contest Round 2',
                           start_time=datetime.utcnow(), owner_user=u2,
                           permission=ContestPermission.PRIVATE, length=timedelta(seconds=3600)))
    db.session.commit()
