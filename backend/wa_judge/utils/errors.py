def not_found(message='not found.'):
    return {'error': message}, 404


def unprocessable_entity(message):
    return {'error': message}, 422


def conflict(message):
    return {'error': message}, 409
