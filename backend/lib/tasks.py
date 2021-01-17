import jwt
import os
import boto3
import datetime
import uuid
from flask import jsonify
from lib.authorization import authorize_user
from lib.util import clean_dynamo_object

TASK_TABLE = os.environ['TASK_TABLE']


def create_task(request):
    print('Got request for new task')
    headers = request.headers

    if not headers.get('Authentication'):
        print('User not authenticated')
        return jsonify({'error': 'Not authenticated'}), 400

    encoded_token = headers.get('Authentication')
    user = authorize_user(encoded_token)
    if not user:
        print('User was not authorized')
        return jsonify({'error': 'Not authorized'}), 400

    task_details = request.json
    if not task_details.get('name') or not task_details.get('taskDate'):
        return jsonify({'error': 'Please provide task name and date'}), 400

    new_task = {
        'taskId': { 'S': str(uuid.uuid4()) },
        'userId': { 'S': user },
        'name': { 'S': task_details.get('name') },
        'type': { 'S': 'single' },
        'description': { 'S': task_details.get('description', '') },
        'dateDueISO': { 'S': task_details.get('taskDate') + 'T00:00:00Z' }
    }

    print('Creating new task: ', new_task)
    client = boto3.client('dynamodb')

    resp = client.put_item(
        TableName=TASK_TABLE,
        Item=new_task
    )

    print('Response: ', resp)
    return jsonify({
        'success': True
    })


def get_tasks(request):
    print('Got request for task list')
    headers = request.headers

    if not headers.get('Authentication'):
        print('User not authenticated')
        return jsonify({'error': 'Not authenticated'}), 400

    encoded_token = headers.get('Authentication')
    user = authorize_user(encoded_token)
    if not user:
        print('User was not authorized')
        return jsonify({'error': 'Not authorized'}), 400
    
    print('Querying database')
    client = boto3.client('dynamodb')
    resp = client.query(
        TableName=TASK_TABLE,
        IndexName='userIdIndexAll',
        KeyConditionExpression='userId = :userId',
        ExpressionAttributeValues={
            ':userId': { 'S': user }
        }
    )

    print('Query finished, found ' + str(resp.get('Count')) + ' results')

    return jsonify(clean_dynamo_object(resp)), 200