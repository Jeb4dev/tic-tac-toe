from sqlalchemy_serializer import SerializerMixin
from .db import db


class Statistics(db.Model, SerializerMixin):
    """
    Object that contains user statistics.
    """

    __tablename__ = 'statistics'

    id = db.Column(db.Integer, primary_key=True)
    win_streak = db.Column(db.Integer, default=0)
    wins = db.Column(db.Integer, default=0)
    losses = db.Column(db.Integer, default=0)
    draws = db.Column(db.Integer, default=0)
    total_games = db.Column(db.Integer, default=0)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    def __repr__(self):
        return f"Statistics(id={self.id})"
