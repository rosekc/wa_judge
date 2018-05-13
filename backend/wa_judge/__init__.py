import os

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api
from flask_marshmallow import Marshmallow
from .config import config

db = SQLAlchemy()
ma = Marshmallow()


def create_app(config_name='development', test_config=None):
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_object(config[config_name])

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

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
    api.add_resource(UserApi,  '/users/', '/users/<int:user_id>')
    api.init_app(app)

    return app


app = create_app()


@app.shell_context_processor
def make_shell_context():
    from .models import User
    return dict(db=db, User=User)


@app.cli.command()
def test():
    """Run the unit tests."""
    import unittest
    tests = unittest.TestLoader().discover('tests')
    unittest.TextTestRunner(verbosity=2).run(tests)


@app.cli.command()
def init_db():
    db.create_all()
