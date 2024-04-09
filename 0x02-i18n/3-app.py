#!/usr/bin/env python3

"""
Basic Flask app with Babel extension, locale selector and gettext function
"""

from flask import Flask, render_template, request
from flask_babel import Babel, _ as babel

app = Flask(__name__)
babel = Babel(app)


class Config:
    """
    Config class for setting Babel configuration
    """
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = 'en'
    BABEL_DEFAULT_TIMEZONE = 'UTC'


@babel.localeselector
def get_locale():
    """
    Determine the best matching language for the user
    """

    return request.accept_languages.best_match(Config.LANGUAGES)


@app.route('/')
def index():
    """
    Renders 3-index.html template
    """

    return render_template('3-index.html',
            home_title=babel('Welcome to Holberton'),
            home_header=babel('Hello World'))


if __name__ == "__main__":
    app.run(host="0.0.0.0", port="5000")
