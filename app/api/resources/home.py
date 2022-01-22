from flask import Blueprint, redirect, url_for, render_template

home = Blueprint('index', __name__)


@home.get('/')
def index():
    return render_template('main.html')
