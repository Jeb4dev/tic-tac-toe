from flask import Flask, redirect, url_for, render_template
from app.websockets.sockets import socketio

from app import settings

# login_manager = LoginManager()


def create_app():
    _app = Flask(__name__)

    _app.config.from_object(settings.get_settings())

    # init plugins
    # db.init_app(_app)
    # login_manager.init_app(_app)
    socketio.init_app(_app)

    from app.api.resources.home import home

    # register blueprints
    _app.register_blueprint(home, url_prefix='/')

    # migrate = Migrate(_app, db)

    # from models.user import User

    # @login_manager.user_loader
    # def load_user(identifier):
    #     return User.query.get(int(identifier))

    # Error Management
    @_app.errorhandler(404)
    def page_not_found(error):
        return render_template('404.html', error=error)

    # db.create_all(app=_app)

    return _app


app = create_app()

if __name__ == '__main__':
    socketio.run(app, port=8000, debug=True)
