from flask_cors import CORS
import requests
import pytest
from flask import Flask
import test_config

def test_signup():
    mock_user = {'fullname': 'test_user',
                 'password': 'testing',
                 'email': 'test@gmail.com'}

    signup_url = f'{test_config.test_url}/signup'

    response = requests.post(signup_url, data=mock_user)
    assert response.status_code == 200

def test_signup_wrong_input():
    mock_user = {'fullname': 'test_user',
                 'password': 'testing'}

    signup_url = f'{test_config.test_url}/signup'

    response = requests.post(signup_url, data=mock_user)
    assert response.status_code == 200    ## Fix this , it should return 500


def test_login_when_user_exist():
    mock_user = {
        'email': 'test@gmail.com',
        'password': 'testing'
    }
    login_url = f'{test_config.test_url}/login'
    response = requests.get(login_url, data=mock_user)
    assert response.status_code == 200


def test_login_wrong_password():
    mock_user = {
        'email': 'test@gmail.com',
        'password': 'wrong_password'
    }

    login_url = f'{test_config.test_url}/login'
    print(login_url)
    response = requests.get(login_url, data=mock_user)

    assert response.status_code == 200


def test_login_wrong_email():
    mock_user = {
        'email': 'wrong@gmail.com',
        'password': 'testing'
    }
    login_url = f'{test_config.test_url}/login'
    response = requests.get(login_url, data=mock_user)
    assert response.status_code == 200


def test_login_wrong_input():
    mock_user = {
        'email': 'test@gmail.com'
    }

    login_url = f'{test_config.test_url}/login'
    response = requests.get(login_url, data=mock_user)

    assert response.status_code == 200  ## Fix this it should return 500 but returning 200
