from functools import wraps

from flask import g, request

from ..models import Contest
from .errors import bad_request, not_found, unauthorized


def get_args(*need_args, required=True):
    def decorator(f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            for arg in need_args:
                val = request.args.get(arg, type=int)
                if val:
                    kwargs[arg] = val
                if required and kwargs.get(arg) is None:
                    return bad_request('key %s is required.' % arg)
            return f(*args, **kwargs)
        return wrapper
    return decorator


def check_authentication(auth, login_required=False):
    """检查授权情况，在需要登陆的时候返回401

    Arguments:
        auth {HTTPBasicAuth} -- [`flask_httpauth`中`HTTPBasicAuth`的实例]

    Keyword Arguments:
        login_required {bool} -- [是否需要登陆] (default: {False})
    """
    def decorator(f):
        @wraps(f)
        @auth.login_required
        def wrapper(*args, **kwargs):
            if login_required and not g.authenticated:
                return auth.auth_error_callback()
            return f(*args, **kwargs)
        return wrapper
    return decorator


def need_roles(*roles):
    """检查用户角色，若不在列表里返回401
    """
    def decorator(f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            if g.current_user.role not in roles:
                return unauthorized('permission deny. try other account.')
            return f(*args, **kwargs)
        return wrapper
    return decorator


def check_contest_auth(f):
    @get_args('contest_id')
    @wraps(f)
    def wrapper(*args, **kwargs):
        arg = 'contest_id'
        contest_id = kwargs.get(arg)
        if not contest_id:
            if request.args.get(arg, type=int) is None:
                return bad_request('key %s is required.' % arg)
            contest_id = kwargs.get(arg)
        kwargs.pop(arg)
        contest = Contest.query.filter_by(id=contest_id).first()
        if contest is None:
            return not_found('contest not found.')
        kwargs['contest'] = contest
        ret = contest.can_get_in()
        if ret == 'OK':
            return f(*args, **kwargs)
        return ret
    return wrapper
