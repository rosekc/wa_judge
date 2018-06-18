class Error:
    def __init__(self):
        self.message = ''
        self.status_code = 400
        self.code = 50000

    def __call__(self, message=None, code=None):
        if message:
            self.message = message
        if code:
            self.code = code
        return {'message': self.message, 'code': self.code}, self.status_code


class NotFound(Error):
    """返回404错误，表示资源未找到。

    :param message: 错误信息, defaults to 'not found.'
    :type message: str
    """

    def __init__(self):
        super(NotFound, self).__init__()
        self.message = 'not found.'
        self.status_code = 404


class BadRequest(Error):
    """返回400错误，表示请求错误，例如缺少某些field。

    :param message: 错误信息
    :type message: str
    """

    def __init__(self):
        super(BadRequest, self).__init__()
        self.status_code = 400


class Conflict(Error):
    """返回409错误，表示请求冲突，例如用户已存在。

    :param message: 错误信息
    :type message: str
    """

    def __init__(self):
        super(Conflict, self).__init__()
        self.status_code = 409


class Unauthorized(Error):
    """返回401错误，表示请求未授权，登陆或者更换账号或许可以解决问题。

    :param message: 错误信息
    :type message: str
    """

    def __init__(self):
        super(Unauthorized, self).__init__()
        self.status_code = 401


class Forbidden(Error):
    """返回403错误，表示禁止请求，登陆或者更换账号不能解决问题。

    :param message: 错误信息
    :type message: str
    """

    def __init__(self):
        super(Forbidden, self).__init__()
        self.status_code = 403


not_found = NotFound()
bad_request = BadRequest()
conflict = Conflict()
unauthorized = Unauthorized()
forbidden = Forbidden()
