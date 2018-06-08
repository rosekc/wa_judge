def not_found(message='not found.'):
    """返回404错误，表示资源未找到。
    
    :param message: 错误信息, defaults to 'not found.'
    :type message: str
    """
    return {'error': message}, 404


def bad_request(message):
    """返回400错误，表示请求错误，例如缺少某些field。
    
    :param message: 错误信息
    :type message: str
    """
    return {'error': message}, 400


def conflict(message):
    """返回409错误，表示请求冲突，例如用户已存在。
    
    :param message: 错误信息
    :type message: str
    """
    return {'error': message}, 409


def unauthorized(message):
    """返回401错误，表示请求未授权，登陆或者更换账号或许可以解决问题。
    
    :param message: 错误信息
    :type message: str
    """
    return {'error': message}, 401


def forbidden(message):
    """返回403错误，表示禁止请求，登陆或者更换账号不能解决问题。
    
    :param message: 错误信息
    :type message: str
    """
    return {'error': message}, 403
