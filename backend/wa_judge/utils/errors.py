def not_found(message='not found.'):
    return {'error': message}, 404


def bad_request(message):
    return {'error': message}, 400


def conflict(message):
    return {'error': message}, 409


def unauthorized(message):
    return {'error': message}, 401


def forbidden(message):
    return {'error': message}, 403
