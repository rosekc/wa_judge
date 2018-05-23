import unittest
from base64 import b64encode

from wa_judge import create_app, db
from wa_judge.models import User


def auth_headers(username='wawawa', password='wawawa'):
    return {
        'Authorization': 'Basic ' + b64encode(
            (username + ':' + password).encode('utf-8')).decode('utf-8'),
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }


class AuthTestCase(unittest.TestCase):

    def setUp(self):
        self.app = create_app('testing')
        self.app_context = self.app.app_context()
        self.app_context.push()
        db.create_all()
        db.session.add(User(username='wawawa', password='wawawa'))
        db.session.commit()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_auth(self):
        with self.app.test_client() as c:
            res = c.get('/apiv1/token')
            self.assertEqual(res.status_code, 401)

            res = c.get('/apiv1/token', headers=auth_headers())
            json_data = res.get_json()
            self.assertIsNotNone(json_data)
            token = json_data['token']
            self.assertIsNotNone(token)

            res = c.get('/apiv1/token', headers=auth_headers(token, ''))
            self.assertEqual(res.status_code, 200)

    def test_user(self):
        with self.app.test_client() as c:
            res = c.get('/apiv1/users/')
            self.assertEqual(res.status_code, 422)

            res = c.get('/apiv1/users/1')
            json_data = res.get_json()
            self.assertEqual(json_data.get('username'), 'wawawa')

            res = c.get('/apiv1/users/114514')
            json_data = res.get_json()
            self.assertEqual(res.status_code, 404)

    def test_create_user(self):
        with self.app.test_client() as c:
            res = c.get('/apiv1/users/1')
            json_data = res.get_json()
            self.assertEqual(json_data.get('username'), 'wawawa')

            res = c.get('/apiv1/users/2')
            json_data = res.get_json()
            self.assertEqual(res.status_code, 404)

            res = c.post('/apiv1/users/',
                         json={'username': 'wawa', 'password': 'wawa'})
            json_data = res.get_json()
            self.assertEqual(json_data.get('username'), 'wawa')

            res = c.get('/apiv1/token', headers=auth_headers('wawa', 'wawa'))
            self.assertEqual(res.status_code, 200)

            res = c.get('/apiv1/users/2')
            json_data = res.get_json()
            self.assertEqual(res.status_code, 200)
            self.assertEqual(json_data.get('username'), 'wawa')

    def test_anonymous_login(self):
        # TODO: 因为目前没有用到这种匿名登陆有区别的api，待有的时候补充
        pass

    def test_update_user(self):
        with self.app.test_client() as c:
            res = c.put('/apiv1/users/', headers=auth_headers(),
                        json={'password': 'wawa'})
            json_data = res.get_json()
            self.assertEqual(json_data.get('username'), 'wawawa')

            res = c.get('/apiv1/token', headers=auth_headers())
            self.assertEqual(res.status_code, 401)
            res = c.get('/apiv1/token', headers=auth_headers('wawawa', 'wawa'))
            self.assertEqual(res.status_code, 200)
