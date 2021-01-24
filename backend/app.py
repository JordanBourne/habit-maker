import os
import boto3
from flask import Flask, jsonify, request
from flask_cors import CORS
from lib import tasks, habits


app = Flask(__name__)
CORS(app)
client = boto3.client('dynamodb')


@app.route('/')
def hello():
    print('Headers')
    print(request.headers)
    return 'Hello World!'


@app.route('/tasks/new-task', methods=['POST'])
def create_task():
    return tasks.create_task(request)


@app.route('/tasks/get', methods=['GET'])
def get_tasks():
    return tasks.get_tasks(request)


@app.route('/tasks/new-habit', methods=['POST'])
def create_habit():
    return habits.create_habit(request)


@app.route('/habits/get', methods=['GET'])
def get_habits():
    return habits.get_habits(request)


# @app.route('/users/<string:user_id>')
# def get_user(user_id):
#     resp = client.get_item(
#         TableName=USERS_TABLE,
#         Key={
#             'userId': { 'S': user_id }
#         }
#     )
#     item = resp.get('Item')
#     if not item:
#         return jsonify({'error': 'User does not exist'}), 404

#     return jsonify({
#         'userId': item.get('userId').get('S'),
#         'name': item.get('name').get('S')
#     })


# @app.route('/users', methods=['POST'])
# def create_user():
#     user_id = request.json.get('userId')
#     name = request.json.get('name')
#     if not user_id or not name:
#         return jsonify({'error': 'Please provide userId and name'}), 400

#     resp = client.put_item(
#         TableName=USERS_TABLE,
#         Item={
#             'userId': {'S': user_id },
#             'name': {'S': name }
#         }
#     )

#     return jsonify({
#         'userId': user_id,
#         'name': name
#     })