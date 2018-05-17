from functools import wraps

from flask import request

from .errors import unprocessable_entity


def get_args(*need_args, required=True):
    def decorator(f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            for arg in need_args:
                val = request.args.get(arg, type=int)
                if val:
                    kwargs[arg] = val
                if required and kwargs.get(arg) is None:
                    return unprocessable_entity('key %s is required.' % arg)
            return f(*args, **kwargs)
        return wrapper
    return decorator
