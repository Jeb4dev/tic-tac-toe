from flask import request, session
from flask_socketio import SocketIO, emit

socketio = SocketIO(logger=True, cors_allowed_origins="*", async_mode="eventlet")

clicked = []


@socketio.on('connect')
def on_connect():
    print("user connected")
    emit('user_connected', clicked, broadcast=True)


@socketio.on('disconnect')
def on_disconnect():
    pass


@socketio.on('onClick')
def on_click(data):
    global clicked
    if data not in clicked:
        clicked.append(data)
        emit('onClick', data, broadcast=True, include_self=False)
    if len(clicked) > 8:
        clicked = []
        emit('reset', broadcast=True)

