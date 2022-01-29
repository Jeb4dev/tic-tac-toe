from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

from . import db

# Many to Many Artwork to Users


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(32), nullable=False)
    password_hash = db.Column(db.String(200))

    def check_password(self, password: str):
        return check_password_hash(self.password_hash, password)

    @classmethod
    def create(cls, username: str, password: str) -> "User":
        hashed_password = generate_password_hash(password, method='sha256')
        user = cls(
            username=username,
            password_hash=hashed_password
        )
        db.session.add(user)
        db.session.commit()
        return user

    def __repr__(self):
        return f"User(id={self.id}, username={self.username})"
