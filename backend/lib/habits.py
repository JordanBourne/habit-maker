import jwt
import os
import boto3
import datetime
import uuid
from flask import jsonify
from lib.authorization import authorize_user
from lib.util import clean_dynamo_object

HABIT_TABLE = os.environ['HABIT_TABLE']


def create_habit(request):
    print('Got request for new habit')
    headers = request.headers

    if not headers.get('Authentication'):
        print('User not authenticated')
        return jsonify({'error': 'Not authenticated'}), 400

    encoded_token = headers.get('Authentication')
    user = authorize_user(encoded_token)
    if not user:
        print('User was not authorized')
        return jsonify({'error': 'Not authorized'}), 400

    habit_details = request.json
    if not habit_details.get('name') or not habit_details.get('frequency'):
        return jsonify({'error': 'Please provide habit name and frequency'}), 400

    new_habit = {
        'habitId': { 'S': str(uuid.uuid4()) },
        'userId': { 'S': user },
        'name': { 'S': habit_details.get('name') },
        'frequency': { 'S': habit_details.get('frequency') },
        'scheduleType': { 'S': habit_details.get('scheduleType') }
    }

    # Only add necessary fields for the schedule/frequency type
    if habit_details.get('scheduleType') == 'onDays':
      if habit_details.get('frequency') == 'weekly':
        new_habit['onDaysWeekly'] = { 'SS': habit_details.get('onDaysWeekly') }

      if habit_details.get('frequency') == 'monthly':
        new_habit['onDaysMonthly'] = { 'SS': list(map(str, habit_details.get('onDaysMonthly'))) }
    
    if habit_details.get('scheduleType') == 'numDays':
      new_habit['numDays'] = { 'S': str(habit_details.get('numDays')) }

    print('Creating new habit: ', new_habit)
    client = boto3.client('dynamodb')

    resp = client.put_item(
        TableName=HABIT_TABLE,
        Item=new_habit
    )

    print('Response: ', resp)
    return jsonify({
        'success': True
    })


def get_habits(request):
    print('Got request for habit list')
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
        TableName=HABIT_TABLE,
        IndexName='userIdIndexAll',
        KeyConditionExpression='userId = :userId',
        ExpressionAttributeValues={
            ':userId': { 'S': user }
        }
    )

    print('Query finished, found ' + str(resp.get('Count')) + ' results')

    return jsonify(clean_dynamo_object(resp)), 200