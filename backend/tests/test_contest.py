import io
import time
import unittest
from base64 import b64encode
from datetime import datetime, timedelta

from wa_judge import create_app, db
from wa_judge.models import Contest, ContestPermission, User


def auth_headers(username='wawawa', password='wawawa'):
    return {
        'Authorization': 'Basic ' + b64encode(
            (username + ':' + password).encode('utf-8')).decode('utf-8'),
        'Accept': 'application/json',
    }


class ContestTestCase(unittest.TestCase):

    def setUp(self):
        self.app = create_app('testing')
        self.app_context = self.app.app_context()
        self.app_context.push()
        db.create_all()
        u1 = User(username='wawawa', password='wawawa')
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

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_get_contest(self):
        with self.app.test_client() as c:
            res = c.get('/apiv1/contests/114514')
            self.assertEqual(res.status_code, 404)

            res = c.get('/apiv1/contests/')
            json_data = res.get_json()
            self.assertEqual(json_data['count'], 2)

            res = c.get('/apiv1/contests/1')
            json_data = res.get_json()
            self.assertEqual(json_data['name'], 'WA Judge Contest Round 1')

    def test_post_contest(self):
        with self.app.test_client() as c:
            datas = {
                'aaa': 'aaa'
            }
            res = c.post('/apiv1/contests/',
                         headers=auth_headers(), json=datas)
            self.assertEqual(res.status_code, 422)
            datas = {
                'name': 'WA Judge Contest Round 3',
                'start_time': '2018-05-17T16:45:41.237169+00:00',
                'permission': 'PRIVATE', 'length': '3600'
            }
            res = c.post('/apiv1/contests/',
                         headers=auth_headers(), json=datas)
            self.assertEqual(res.status_code, 200)
            json_data = res.get_json()
            self.assertEqual(json_data['name'], 'WA Judge Contest Round 3')

    def test_put_contest(self):
        with self.app.test_client() as c:
            res = c.put('/apiv1/contests/', headers=auth_headers())
            self.assertEqual(res.status_code, 422)

            res = c.put('/apiv1/contests/1', headers=auth_headers('wawa', 'wawa'),
                        json={'name': 'WA Judge Contest Round 114'})
            self.assertEqual(res.status_code, 401)

            res = c.put('/apiv1/contests/1', headers=auth_headers(),
                        json={'name': 'WA Judge Contest Round 114'})
            self.assertEqual(res.status_code, 200)
            json_data = res.get_json()
            self.assertEqual(json_data['name'], 'WA Judge Contest Round 114')

    def test_problem_set(self):
        with self.app.test_client() as c:
            test_msg = b'I love megumi kato forever'
            res = c.put('/apiv1/contests/1/problem_set', headers=auth_headers('wawa', 'wawa'), data={
                'problem_set': (io.BytesIO(test_msg), 'test.txt')
            })
            self.assertEqual(res.status_code, 401)

            res = c.put('/apiv1/contests/1/problem_set', headers=auth_headers(), data={
                'problem_set': (io.BytesIO(test_msg), 'test.txt')
            })
            self.assertEqual(res.status_code, 200)

            res = c.get('/apiv1/contests/1/problem_set',
                        headers=auth_headers())
            self.assertEqual(res.status_code, 200)
            self.assertIsNotNone(res.headers.get('Content-Disposition', None))
            self.assertEqual(res.data, test_msg)

            res = c.put('/apiv1/contests/1', headers=auth_headers(),
                        json={'start_time': (datetime.utcnow() + timedelta(seconds=2)).isoformat()})

            res = c.get('/apiv1/contests/1',
                        headers=auth_headers('wawa', 'wawa'))
            json_data = res.get_json()
            self.assertIsNone(json_data.get('have_problem_set'))

            res = c.get('/apiv1/contests/1/problem_set',
                        headers=auth_headers('wawa', 'wawa'))
            self.assertEqual(res.status_code, 403)

            time.sleep(2)

            res = c.get('/apiv1/contests/1',
                        headers=auth_headers('wawa', 'wawa'))
            json_data = res.get_json()
            self.assertIsNotNone(json_data.get('have_problem_set'), True)

            res = c.get('/apiv1/contests/1/problem_set',
                        headers=auth_headers('wawa', 'wawa'))
            self.assertEqual(res.status_code, 200)
            self.assertIsNotNone(res.headers.get('Content-Disposition', None))
            self.assertEqual(res.data, test_msg)

            res = c.delete('/apiv1/contests/1/problem_set',
                           headers=auth_headers('wawa', 'wawa'))
            self.assertEqual(res.status_code, 401)

            res = c.delete('/apiv1/contests/1/problem_set',
                           headers=auth_headers())
            self.assertEqual(res.status_code, 200)
