import unittest

from wa_judge import create_app, db
from wa_judge.models import User


def auth_json(username='wawawa', password='wawawa'):
    return {
        'username': username,
        'password': password
    }


def auth_headers(token):
    return {
        'Authorization': 'Bearer ' + token,
        'Accept': 'application/json',
    }


class AuthTestCase(unittest.TestCase):

    def setUp(self):
        self.app = create_app('testing')
        self.app_context = self.app.app_context()
        self.app_context.push()
        db.create_all()
        u = User(username='wawawa', password='wawawa')
        db.session.add(u)
        db.session.commit()
        self.token = u.generate_auth_token(3600)

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_auth(self):
        with self.app.test_client() as c:
            res = c.post('/apiv1/token', json=auth_json())
            json_data = res.get_json()
            self.assertIsNotNone(json_data)
            token = json_data['token']
            self.assertIsNotNone(token)

            res = c.post('/apiv1/token', headers=auth_headers(token))
            self.assertEqual(res.status_code, 400)

            res = c.get('/apiv1/users/1', headers=auth_headers(token))
            json_data = res.get_json()
            self.assertEqual(json_data.get('username'), 'wawawa')

    def test_user(self):
        with self.app.test_client() as c:
            res = c.get('/apiv1/users/114514',
                        headers=auth_headers(self.token))
            self.assertEqual(res.status_code, 404)

    def test_create_user(self):
        with self.app.test_client() as c:
            res = c.post('/apiv1/users/',
                         json={'username': 'wawa', 'password': 'wawa'})
            json_data = res.get_json()
            self.assertEqual(json_data['data'][0]['username'], 'wawa')

            res = c.post('/apiv1/token', json=auth_json('wawa', 'wawa'))
            json_data = res.get_json()
            self.assertIsNotNone(json_data)
            token2 = json_data['token']
            self.assertEqual(res.status_code, 200)

            res = c.get('/apiv1/users/2', headers=auth_headers(token2))
            json_data = res.get_json()
            self.assertEqual(res.status_code, 200)
            self.assertEqual(json_data.get('username'), 'wawa')

    def test_create_many_users(self):
        with self.app.test_client() as c:
            res = c.post('/apiv1/users/',
                         json=[{'username': 'wawa1', 'password': 'wawa'}, {'username': 'wawawa', 'password': 'wawa'}])
            json_data = res.get_json()
            self.assertEqual(len(json_data['errors']), 1)
            self.assertEqual(json_data['errors'][0], 'User wawawa have been created')
            self.assertEqual(json_data['data'][0]['username'], 'wawa1')


    def test_update_user(self):
        with self.app.test_client() as c:
            res = c.put('/apiv1/users/', headers=auth_headers(self.token),
                        json={'password': 'wawa'})
            json_data = res.get_json()
            self.assertEqual(json_data.get('username'), 'wawawa')

            res = c.post('/apiv1/token', json=auth_json())
            self.assertEqual(res.status_code, 401)
            res = c.post('/apiv1/token', json=auth_json('wawawa', 'wawa'))
            self.assertEqual(res.status_code, 200)
