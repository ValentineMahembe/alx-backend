#!/usr/bin/env python3

"""
Basic Flask app with Babel extention and locale selector
"""

from flask import Flask, render_template, request
from flask_babel import Babel

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
    Determine the best-matching language for the user
    """

    return request.accept_languages.best_match(Config.LANGUAGE)


@app.route('/')
def index():
    """
    Renders 2-index.html template
    """

    return render_template('2-index.html')


if __name__ == "__main__":
    app.run(host="0.0.0.0", port="5000")
