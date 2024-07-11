from rest_framework.serializers import ValidationError
from django.contrib.auth import get_user_model
import json

UserModel = get_user_model()

"""
{
"email": "tesy@gmail.com",
"username": "Pashok",
"password": "lololoww"
}

{
"email": "hello@mail.com",
"username": "2",
"password": "12345678"
}

{
"email": "tessy@gmail.com",
"password": "lololoww"
}
"""


def custom_validation(data):
    try:
        email = data['email'].strip()
    except KeyError:
        raise ValidationError('Please enter email')
    try:
        username = data['username'].strip()
    except KeyError:
        raise ValidationError('Please enter username')
    try:
        password = data['password'].strip()
    except KeyError:
        raise ValidationError('Please enter password')

    ##
    if not email or UserModel.objects.filter(email=email).exists():
        raise ValidationError('choose another email')
    ##
    if not password or len(password) < 8:
        raise ValidationError('choose another password, min 8 characters')
    ##
    if not username:
        raise ValidationError('choose another username')

    return data


def validate_email(data):
    # data = data['_content']
    email = data['email'].strip()
    if not email:
        raise ValidationError('an email is needed')
    return True


def validate_username(data):
    username = data['username'].strip()
    if not username:
        raise ValidationError('choose another username')
    return True


def validate_password(data):
    password = data['password'].strip()
    if not password:
        raise ValidationError('a password is needed')
    return True
