import random

from flask_uploads import UploadSet as _UploadSet
from flask_uploads import send_from_directory
from marshmallow_enum import EnumField
from marshmallow_sqlalchemy import ModelConverter
from sqlalchemy import Enum


def gen_random_str(length=50):
    seed = '1234567890abcdefghijklmnopqrstuvwxyz'
    return ''.join([random.choice(seed) for _ in range(length)])


class UploadSet(_UploadSet):

    def url(self, filename):
        raise NotImplementedError('this function is deprecated')

    def send_file(self, filename, **options):
        return send_from_directory(self.config.destination, filename, **options)


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
