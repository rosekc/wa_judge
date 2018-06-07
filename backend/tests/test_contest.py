import io
import time
import unittest
from base64 import b64encode
from datetime import datetime, timedelta

from wa_judge import create_app, db
from wa_judge.models import Contest, ContestPermission, User


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
        db.session.commit()
        self.token1 = u1.generate_auth_token(3600)
        self.token2 = u2.generate_auth_token(3600)
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
            res = c.get('/apiv1/contests/114514',
                        headers=auth_headers(self.token1))
            self.assertEqual(res.status_code, 404)

            res = c.get('/apiv1/contests/', headers=auth_headers(self.token1))
            json_data = res.get_json()
            self.assertEqual(json_data['count'], 2)

            res = c.get('/apiv1/contests/1', headers=auth_headers(self.token1))
            json_data = res.get_json()
            self.assertEqual(json_data['name'], 'WA Judge Contest Round 1')

    def test_post_contest(self):
        with self.app.test_client() as c:
            datas = {
                'aaa': 'aaa'
            }
            res = c.post('/apiv1/contests/',
                         headers=auth_headers(self.token1), json=datas)
            self.assertEqual(res.status_code, 422)
            datas = {
                'name': 'WA Judge Contest Round 3',
                'start_time': '2018-05-17T16:45:41.237169+00:00',
                'permission': 'PRIVATE', 'length': '3600'
            }
            res = c.post('/apiv1/contests/',
                         headers=auth_headers(self.token1), json=datas)
            self.assertEqual(res.status_code, 200)
            json_data = res.get_json()
            self.assertEqual(json_data['name'], 'WA Judge Contest Round 3')

    def test_put_contest(self):
        with self.app.test_client() as c:
            res = c.put('/apiv1/contests/', headers=auth_headers(self.token1))
            self.assertEqual(res.status_code, 422)

            res = c.put('/apiv1/contests/1', headers=auth_headers(self.token2),
                        json={'name': 'WA Judge Contest Round 114'})
            self.assertEqual(res.status_code, 401)

            res = c.put('/apiv1/contests/1', headers=auth_headers(self.token1),
                        json={'name': 'WA Judge Contest Round 114'})
            self.assertEqual(res.status_code, 200)
            json_data = res.get_json()
            self.assertEqual(json_data['name'], 'WA Judge Contest Round 114')

    def test_problem_set(self):
        with self.app.test_client() as c:
            test_msg = b'I love megumi kato forever'
            res = c.put('/apiv1/contests/1/problem_set', headers=auth_headers(self.token2), data={
                'problem_set': (io.BytesIO(test_msg), 'test.txt')
            })
            self.assertEqual(res.status_code, 401)

            res = c.put('/apiv1/contests/1/problem_set', headers=auth_headers(self.token1), data={
                'problem_set': (io.BytesIO(test_msg), 'test.txt')
            })
            self.assertEqual(res.status_code, 200)

            res = c.put('/apiv1/contests/1/problem_set', headers=auth_headers(self.token1), data={
                'problem_set': (io.BytesIO(test_msg), 'test.txt')
            })
            self.assertEqual(res.status_code, 200)

            res = c.get('/apiv1/contests/1/problem_set',
                        headers=auth_headers(self.token1))
            self.assertEqual(res.status_code, 200)
            self.assertIsNotNone(res.headers.get('Content-Disposition', None))
            self.assertEqual(res.data, test_msg)

            res = c.put('/apiv1/contests/1', headers=auth_headers(self.token1),
                        json={'start_time': (datetime.utcnow() + timedelta(seconds=2)).isoformat()})

            res = c.get('/apiv1/contests/1', headers=auth_headers(self.token2))
            json_data = res.get_json()
            self.assertIsNone(json_data.get('have_problem_set'))

            res = c.get('/apiv1/contests/1/problem_set',
                        headers=auth_headers(self.token2))
            self.assertEqual(res.status_code, 403)

            time.sleep(2)

            res = c.get('/apiv1/contests/1', headers=auth_headers(self.token2))
            json_data = res.get_json()
            self.assertIsNotNone(json_data.get('have_problem_set'), True)

            res = c.get('/apiv1/contests/1/problem_set',
                        headers=auth_headers(self.token2))
            self.assertEqual(res.status_code, 200)
            self.assertIsNotNone(res.headers.get('Content-Disposition', None))
            self.assertEqual(res.data, test_msg)

            res = c.delete('/apiv1/contests/1/problem_set',
                           headers=auth_headers(self.token2))
            self.assertEqual(res.status_code, 401)

            res = c.delete('/apiv1/contests/1/problem_set',
                           headers=auth_headers(self.token1))
            self.assertEqual(res.status_code, 200)

    def test_submission(self):
        with self.app.test_client() as c:
            test_msg = b'abababaababa(;o;_;o;)'
            test_msg2 = b'abababa(;o;_;o;)'
            res = c.get('/apiv1/submissions/1',
                        headers=auth_headers(self.token1))
            self.assertEqual(res.status_code, 404)
            datas = {
                'author_id': 1,
                'contest_id': 1,
            }

            res = c.post('/apiv1/submissions/',
                         headers=auth_headers(self.token1), json=datas)
            self.assertEqual(res.status_code, 200)

            res = c.get('/apiv1/submissions/1', headers=auth_headers(self.token1))
            self.assertEqual(res.status_code, 200)

            res = c.get('/apiv1/submissions/1/submission_file',
                        headers=auth_headers(self.token1))
            self.assertEqual(res.status_code, 404)

            res = c.put('/apiv1/submissions/1/submission_file', headers=auth_headers(self.token1), data={
                'submission_file': (io.BytesIO(test_msg), 'test.txt')
            })
            self.assertEqual(res.status_code, 200)

            res = c.get('/apiv1/submissions/1/submission_file',
                        headers=auth_headers(self.token2))
            self.assertEqual(res.status_code, 401)

            res = c.get('/apiv1/submissions/1/submission_file',
                        headers=auth_headers(self.token1))
            self.assertEqual(res.status_code, 200)
            self.assertIsNotNone(res.headers.get('Content-Disposition', None))
            self.assertEqual(res.data, test_msg)

            res = c.put('/apiv1/submissions/1/submission_file', headers=auth_headers(self.token1), data={
                'submission_file': (io.BytesIO(test_msg2), 'test.txt')
            })
            self.assertEqual(res.status_code, 200)

            res = c.get('/apiv1/submissions/1/submission_file',
                        headers=auth_headers(self.token1))
            self.assertEqual(res.status_code, 200)
            self.assertIsNotNone(res.headers.get('Content-Disposition', None))
            self.assertEqual(res.data, test_msg2)
