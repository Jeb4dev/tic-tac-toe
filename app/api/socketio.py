from flask import request
from flask_socketio import emit, join_room, leave_room, close_room, SocketIO
from flask_jwt_extended import jwt_required
from datetime import datetime, timezone

from app.api.jwt import get_current_user
from app.models import User
from app.models.db import db

"""
This file contains all server sockets.
"""

socketio = SocketIO(logger=True, cors_allowed_origins="*", async_mode='eventlet')

active_rooms = {}
users = {}


# Redirect users to landing page
# Close / remove room
def remove_room(room_name):
    # will users disconnect automatically when room is closed or do we need to use "leave_room()" ?

    # Should users in room be redirected somewhere before close?? ↓ ↓
    emit('cl_on_room_close', to=room_name)  # This will redirect users to landing page etc...

    # Close room
    close_room(room_name)
    # Is this same than removing room, will it behave like it never existed??


# Handle saving statistics to the database
def handle_statistics(user, data):
    # Update statistics object with new averages etc.
    if data["win"]:
        user.statistics.win_streak += 1
        user.statistics.wins += 1
    elif data["loss"]:
        user.statistics.losses += 1
    elif data["draws"]:
        user.statistics.draws += 1

    user.statistics.total_games += 1

    db.session.commit()


# Error handling
@socketio.on_error()
@jwt_required()
def handle_error(e):
    print(f"An error occurred: {e}")


# When user connected
@socketio.on('connect')
@jwt_required()
def on_connect():
    user = get_current_user()
    print("User connected!", user)
    users[request.sid] = user.id


# When user disconnects
@socketio.on('disconnect')
def on_disconnect():
    user_id = users[request.sid]

    # Check if user was race leader, if -> remove lobby
    if active_rooms[user_id]:
        remove_room(user_id)
        del active_rooms[user_id]  # Does this work?
    # Iterate trough dict, check if user id in roomname.usernames, if -> leave room
    for owner_id, room in active_rooms.items():
        if user_id in room["username"]:
            # announce room that user left, if this is even needed
            emit('cl_user_left_race', user_id, to=owner_id)
            # Leave room
            leave_room(owner_id)
    print(f"{user_id} disconnected!")


# Create room
@socketio.on('sv_create_race')
@jwt_required()
def create_race():
    user = get_current_user()
    user_id = user.id

    room_title = f"{user.username}'s room"

    room_name = user_id

    # Check if room exist
    if room_name not in active_rooms:
        # Add room to dict of rooms
        active_rooms[user_id] = {
            "users": [],
            "room_title": room_title,
            "started": False,
            "password": "passwd",
            "time_start": 0
        }
    else:
        # Add user to room users list
        active_rooms[room_name]["users"].append(user_id)
    # Add room to dict of rooms

    emit('cl_create_race', active_rooms)  # must call sv_join_race
    emit('cl_user_should_update_rooms', broadcast=True)
    print(f"{user.username} created {room_title} with id {user_id}!")


# Join room
@socketio.on('sv_join_race')
@jwt_required()
def join_race(data):
    user = get_current_user()

    room_name = data["room"]

    if user.id not in active_rooms[room_name]["users"]:
        active_rooms[room_name]["users"].append(user.id)

    # Join room
    join_room(room_name)
    emit('cl_join_race')
    emit('cl_user_should_update_rooms', broadcast=True)
    print(f"{user.username} joined {room_name}!")


# Leave room
@socketio.on('sv_leave_race')
@jwt_required()
def leave_race(data):
    user = get_current_user()
    user_id = user.id

    room_name = data["room"]

    # announce room that user left, if this is even needed
    emit('cl_user_left_race', user_id, to=room_name)
    emit('cl_user_should_update_rooms', broadcast=True)

    # Leave room
    leave_room(room_name)

    # Remove user from room dict
    active_rooms[room_name]["users"].remove(user.id)

    # if user was creator of room, -> delete room
    if active_rooms[user.id]:
        remove_room(user.id)
        del active_rooms[user.id]

    print(f"{user.username} left from {room_name}!")


# Get list of active rooms
@socketio.on('sv_get_active_rooms')
@jwt_required()
def list_active_races():
    user = get_current_user()

    # return active_rooms dictionary, that contains active_room_id, user_id's, room_title
    emit('sv_get_active_rooms', active_rooms)
    print(f"{user.username} asked list of active rooms! return {str(active_rooms)}")


# Start race
@socketio.on('sv_start_race')
@jwt_required()
def start_race():
    user = get_current_user()
    print("start")

    # Tell clients to start race
    active_rooms[user.id]["started"] = True
    active_rooms[user.id]["time_start"] = int(datetime.now(timezone.utc).timestamp() * 1000)
    emit('cl_start_race', to=user.id)
    emit('cl_user_should_update_rooms', broadcast=True)
    print(f"{user.username} started race!")


# Clients send server race progress, that value is redirected all clients in the same race
@socketio.on('sv_get_move')
@jwt_required()
def get_progress(data):  # data should at least contain room name, user whose data it is and what is the progress level
    user = get_current_user()
    move = data["move"]

    room_name = data["room"]

    # Tell clients to start race
    emit('cl_get_progress', data, to=room_name)

    print(f"{user.username} updated progress: {data['progress']}!")


# Get statistics when race is finished and save them to db, show user statistics
@socketio.on('sv_get_race_statistics')
@jwt_required()
def get_race_statistics(data):
    # data should at least contain: room name, wpm, epm, ranking,
    # total participants, accuracy, race time, words title, errors

    user = get_current_user()

    # save statistics to db
    handle_statistics(user, data)

    # call event when statistics are updated
    # on this event client can show all statistics of recent race and updated statistics of all time
    # at the same graph or what ever you decide to show statistics...
    emit('show statistics')
