from flask import Flask, redirect, url_for
from flask_login import LoginManager
from flask_migrate import Migrate

from flask_cors import CORS
from flask_jwt_extended import JWTManager

from app.api.socketio import socketio
from .settings import get_settings
from app.models import db

login_manager = LoginManager()


def create_app():
    app = Flask(__name__, instance_relative_config=False)

    # Application Configuration
    settings = get_settings()
    app.config.from_object(settings)
    # Initialize Plugins
    db.init_app(app)
    login_manager.init_app(app)
    socketio.init_app(app)

    cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
    jwt = JWTManager(app)

    with app.app_context():
        from .models.users import User
        from .api.api import router

        # Register Blueprints
        app.register_blueprint(router, url_prefix="/api")

        # Create Database Models
        migrate = Migrate(app, db)

        @login_manager.user_loader
        def load_user(identifier):
            return User.query.get(int(identifier))

        # Error Management
        @app.errorhandler(404)
        def page_not_found(error):
            return redirect(url_for('quiz.all_quiz'))

        db.create_all()

        # quest = User.query.filter_by(id=0).first()
        # if not quest:
        #     new_user = User(id=0, username="Guest")
        #     new_user.set_password("password")
        #     db.session.add(new_user)
        #     db.session.commit()
        #     print("Quest user created")

        return app, settings


app, settings = create_app()
