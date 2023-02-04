from .base import *

DATABASES = {
    'default': {
        'ENGINE':'django.db.backends.postgresql_psycopg2',
        'NAME':'batwara_db',
        'USER':'postgres',
        'PASSWORD':'3112',
        'HOST':'localhost',
        'PORT':'5432'
    }
}
