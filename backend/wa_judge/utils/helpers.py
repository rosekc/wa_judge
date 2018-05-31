import os
import random
from datetime import datetime

from flask_uploads import UploadSet as _UploadSet
from flask_uploads import UploadNotAllowed, send_from_directory
from marshmallow_enum import EnumField
from marshmallow_sqlalchemy import ModelConverter
from sqlalchemy import Enum

from .. import db
from .errors import unprocessable_entity


def gen_random_str(length=50):
    seed = '1234567890abcdefghijklmnopqrstuvwxyz'
    return ''.join([random.choice(seed) for _ in range(length)])


class UploadSet(_UploadSet):

    def url(self, filename):
        raise NotImplementedError('this function is deprecated')

    def send_file(self, filename, **options):
        return send_from_directory(self.config.destination, filename, **options)


def get_and_save_file(file, filename, row, filename_field_name, upload_set):
    """保存文件的快捷方法，针对不同情况返回相应的响应

    Arguments:
        file {[type]} -- [request中的文件]
        filename {str} -- [文件名]
        row {[type]} -- [模型当前行]
        filename_field_name {str} -- [模型中存放文件名的路径]
        upload_set {UploadSet} -- [flask-uploads中的UploadSet]
    """
    if file is None:
        return unprocessable_entity('file is required.')
    try:
        filename = get_formatted_filename(filename, file.filename)
        filename = upload_set.save(
            file, name=filename)
    except UploadNotAllowed:
        return unprocessable_entity('this type of file is not allow')
    # old_filename = getattr(row, filename_field_name)
    # if old_filename:
    #     path = upload_set.path(old_filename)
    #     if path and os.path.exists(path):
    #         os.remove(path)
    setattr(row, filename_field_name, filename)
    db.session.add(row)
    db.session.commit()
    return {'message': 'OK'}, 200


def get_formatted_filename(prefix, filename):
    """根据相应前缀返回格式化后的文件名

    例如：
    ```
    >>> get_formatted_filename('Wa wa wa', 'test.txt')
        'wa_wa_wa_180526153000.txt'
    ```


    Arguments:
        prefix {str} -- [文件名前缀]
        filename {str} -- [要格式化的文件名]

    Returns:
        [str] -- [格式化后的文件名]
    """
    return '.'.join(
        ['_'.join([prefix.lower().replace(' ', '_'), datetime.utcnow().strftime('%y%m%d%H%M%S')]),
         filename.split('.')[-1]])


class ExtendModelConverter(ModelConverter):
    """魔改 `marshmallow_sqlalchemy` 的 `ModelConverter` 使其支持 `marshmallow_enum`
    """
    ModelConverter.SQLA_TYPE_MAPPING[Enum] = EnumField

    def property2field(self, prop, instance=True, field_class=None, **kwargs):
        if not hasattr(prop, 'direction'):
            column = prop.columns[0]
            if isinstance(column.type, Enum):
                assert instance
                field_kwargs = self._get_field_kwargs_for_property(prop)
                field_kwargs.update(kwargs)
                field_kwargs['validate'].clear()
                return EnumField(column.type.enum_class, **field_kwargs)
        return super(ExtendModelConverter, self).property2field(prop, instance, field_class, **kwargs)
