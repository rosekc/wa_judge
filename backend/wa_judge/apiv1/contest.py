import os

from flask import g, request
from flask_restful import Resource
from flask_uploads import ARCHIVES, DOCUMENTS, TEXT
from marshmallow import ValidationError
from werkzeug.exceptions import BadRequestKeyError

from .. import db, ma
from ..models import Contest, Submission
from ..utils.decorators import get_args
from ..utils.errors import (forbidden, not_found, unauthorized,
                            bad_request)
from ..utils.helpers import ExtendModelConverter, UploadSet, get_and_save_file
from .auth import auth

problem_sets = UploadSet('problemsets', TEXT + DOCUMENTS + ARCHIVES)
submission_files = UploadSet(
    'submissionfiles', TEXT + DOCUMENTS + ARCHIVES)


class ContestSchema(ma.ModelSchema):
    class Meta:
        model = Contest
        model_converter = ExtendModelConverter
        strict = True
        fields = ('id', 'name', 'create_time', 'start_time',
                  'length', 'permission', 'owner_user', 'submissions')


class ContestApi(Resource):
    method_decorators = [auth.login_required]
    contest_schema = ContestSchema()
    can_modify = ('start_time', 'length', 'permission', 'name')

    @get_args('contest_id', 'page', required=False)
    def get(self, contest_id=None, page=None):
        if contest_id is None:
            if page is None:
                page = 1
            pagination = Contest.query.paginate(
                page, per_page=10,
                error_out=False)
            contests = pagination.items
            return {
                'contests': self.contest_schema.dump(contests, many=True).data,
                'has_prev': pagination.has_prev,
                'has_next': pagination.has_next,
                'count': pagination.total
            }
        contest = Contest.query.filter_by(id=contest_id).first()
        if contest is None:
            return not_found('contest not found.')
        data = self.contest_schema.dump(contest).data
        if g.current_user.id != contest.owner_user_id\
                or not contest.is_started():
            del data['submissions']
        if g.current_user.id == contest.owner_user_id or contest.is_started():
            data['have_problem_set'] = contest.problem_set_filename is not None
        return data

    def post(self):
        # json_data = request.get_json()
        try:
            json_data = request.get_json()
            if json_data is None:
                return bad_request('empty input')
            data = self.contest_schema.load(json_data).data
        except (ValidationError, AttributeError) as err:
            return bad_request(getattr(err, 'messages', 'AttributeError'))
        data.owner_user_id = g.current_user.id
        db.session.add(data)
        db.session.commit()
        return self.contest_schema.dump(data).data

    @get_args('contest_id')
    def put(self, contest_id):
        contest = Contest.query.filter_by(id=contest_id).first()
        if contest is None:
            return not_found('contest not found.')
        if contest.owner_user_id != g.current_user.id:
            return unauthorized('not owner of this contest')
        json_data = request.get_json()
        if json_data is None:
            return bad_request('empty input')
        contest_json = self.contest_schema.dump(contest).data
        for key, value in json_data.items():
            if key not in self.can_modify:
                return bad_request('key "%s" not existed or can not modify.' % key)
            contest_json[key] = value
        try:
            contest = self.contest_schema.load(contest_json).data
        except (ValidationError, AttributeError) as err:
            return bad_request(getattr(err, 'messages', 'AttributeError'))
        db.session.add(contest)
        db.session.commit()
        data = self.contest_schema.dump(contest).data
        data['have_problem_set'] = contest.problem_set_filename is not None
        return data


class ContestProblemSetApi(Resource):
    method_decorators = [auth.login_required]

    @get_args('contest_id')
    def get(self, contest_id):
        contest = Contest.query.filter_by(id=contest_id).first()
        if contest is None or contest.problem_set_filename is None:
            return not_found()
        if g.current_user.id != contest.owner_user_id and not contest.is_started():
            return forbidden('contest have not started.')
        return problem_sets.send_file(contest.problem_set_filename, as_attachment=True)

    @get_args('contest_id')
    def put(self, contest_id):
        contest = Contest.query.filter_by(id=contest_id).first()
        if contest is None:
            return not_found()
        if g.current_user.id != contest.owner_user_id:
            return unauthorized('not owner of this contest')
        return get_and_save_file(request.files['problem_set'], contest.name,
                                 contest, 'problem_set_filename', problem_sets)

    @get_args('contest_id')
    def delete(self, contest_id):
        contest = Contest.query.filter_by(id=contest_id).first()
        if contest is None or contest.problem_set_filename is None:
            return not_found()
        if g.current_user.id != contest.owner_user_id:
            return unauthorized('not owner of this contest')
        path = problem_sets.path(contest.problem_set_filename)
        if path and os.path.exists(path):
            os.remove(path)
        contest.problem_set_filename = None
        db.session.add(contest)
        db.session.commit()
        return {'message': 'OK'}, 200


class SubmissionSchema(ma.ModelSchema):
    class Meta:
        model = Submission
        strict = True
        fields = ('id', 'author', 'contest', 'submit_time')


class SubmissionApi(Resource):
    method_decorators = [auth.login_required]
    submission_schema = SubmissionSchema()

    @get_args('submission_id', 'page', required=False)
    def get(self, submission_id=None, page=None):
        if submission_id is None:
            if page is None:
                page = 1
            pagination = Submission.query.paginate(
                page, per_page=10,
                error_out=False)
            contests = pagination.items
            return {
                'submissions': self.submission_schema.dump(contests, many=True).data,
                'has_prev': pagination.has_prev,
                'has_next': pagination.has_next,
                'count': pagination.total
            }
        submission = Submission.query.filter_by(id=submission_id).first()
        if submission is None:
            return not_found()
        json_data = self.submission_schema.dump(submission)
        return json_data

    def post(self):
        try:
            json_data = request.get_json()
            if json_data is None:
                return bad_request('empty input')
            data = self.submission_schema.load(json_data).data
        except (ValidationError, AttributeError) as err:
            return bad_request(getattr(err, 'messages', 'AttributeError'))
        data.author = g.current_user
        db.session.add(data)
        db.session.commit()


class SubmissionFileApi(Resource):
    method_decorators = [auth.login_required]

    @get_args('submission_id', required=True)
    def get(self, submission_id):
        submission = Submission.query.filter_by(id=submission_id).first()
        if submission is None or submission.uploaded_filename is None:
            return not_found()
        if g.current_user.id != submission.author_id:
            return unauthorized('not owner of this submission')
        return submission_files.send_file(submission.uploaded_filename, as_attachment=True)

    @get_args('submission_id', required=True)
    def put(self, submission_id):
        submission = Submission.query.filter_by(id=submission_id).first()
        if submission is None:
            return not_found()
        if g.current_user.id != submission.author_id:
            return unauthorized('not owner of this submission')
        try:
            return get_and_save_file(request.files['submission_file'], '_'.join([str(submission.id), str(submission.author.id)]),
                                     submission, 'uploaded_filename', submission_files)
        except BadRequestKeyError:
            return bad_request('key error')
