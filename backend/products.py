"""
Copyright (C) 2021 Feature Hunt - All Rights Reserved
You may use, distribute and modify this code under the terms of the MIT license.
You should have received a copy of the XYZ license with
this file. If not, please write to: featurehuntteam@gmail.com
"""

import os, io
from flask import request, jsonify, Response
from flask import json
from app import app
import pandas as pd
from bson.json_util import dumps
from bson.objectid import ObjectId
from db_init import product_records
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import smtplib
from datetime import date

'''
Function: products
Description: Get/ Add/ Update/ Delete the products from the database
Inputs:
  - NA
Outputs:
  - NA
'''


@app.route('/products', methods=['GET', 'POST', 'DELETE', 'PATCH'])
def products():
    if request.method == 'GET':
        data = product_records.find()
        return dumps(data)

    data = request.get_json()

    if request.method == 'POST':
        if data is None or data == {}:
            return Response(response=json.dumps({"Error": "Please provide all necessary input"}),
                            status=400,
                            mimetype='application/json')
        try:
            product_name = request.form.get("productName")
            product_description = request.form.get("productDescription")
            image_url = request.form.get("imageUrl")
            email = request.form.get("email")
            last_date = request.form.get("lastDate")
            tags = request.form.get("tags").split(' ')

            feature_dict = {'id': 2, 'text': 'feature-1', 'votes': 1, 'timestamp': '1234567', 'tags': ['tag1']}

            product_input = {'name': product_name, 'description': product_description, 'votes': 1,
                             'image_url': image_url, 'users': [email], 'tags': tags, 'features': feature_dict,
                             'last_date': last_date}


            product_records.insert_one(product_input)

            return jsonify({'ok': True, 'message': 'Product added successfully'}), 200
        except:
            return jsonify(success=False)

    if request.method == 'DELETE':
        if data is None or data == {}:
            return Response(response=json.dumps({"Error": "Please provide all necessary input"}),
                            status=400,
                            mimetype='application/json')

        db_response = product_records.delete_one({'id': data[id]})
        if db_response.deleted_count == 1:
            response = {'ok': True, 'message': 'record deleted'}
        else:
            response = {'ok': True, 'message': 'no record found'}
        return jsonify(response), 200

    if request.method == 'PATCH':
        if data.get('query', {}) != {}:
            product_records.update_one(
                data['query'], {'$set': data.get('payload', {})})
            return jsonify({'ok': True, 'message': 'record updated'}), 200
        else:
            return jsonify({'ok': False, 'message': 'Bad request parameters!'}), 400

@app.route('/<productname>', methods=['GET', 'POST'])
def get_feature(productname):
    ''' see above '''
    if request.method == 'GET':
        data = product_records.find({"name": productname})
    if request.method == 'POST':
            data = request.json
            data['_id'] = ObjectId()
            print(data)
            if data is None or data == {}:
                return Response(response=json.dumps({"Error":
                                "Please provide connection information"}),
                                status=400,
                                mimetype='application/json')
            result = product_records.find_one_and_update(
                {"project_name": productname}, {"$push": {"features": data}}
            )

            return jsonify(success=True)
    return dumps(data)

'''
Function: features
Description: You can add/get features of a product
Inputs:
  - productName: Name of the product
Outputs:
  - results: Add features to that product or return feature list
'''


@app.route('/<productname>/features', methods=['GET', 'POST'])
def features(productname):
    result = ''
    if request.method == 'POST':
        data = request.form.get('features')
        data = json.loads(data)
        print(data, flush=True)
        if data is None or data == {}:
            return Response(response=json.dumps({"Error": "Please provide connection information"}),
                            status=400,
                            mimetype='application/json')
        result = product_records.find_one_and_update({"name": productname}, {"$set": {"features": data}},
                                                     {'$upsert': 'true'})

    elif request.method == 'GET':
        result = product_records.find({"name": productname}, {"features": 1})
    return dumps(result)


@app.route('/<productname>/email', methods=['GET'])
def email():
    productname = request.args.get('productname')
    today = date.today()
    recipients = ['svaradhe@ncsu.edu', 'hgupta6@ncsu.edu', 'ashwininayak1212@gmail.com', 'surajdm123@gmail.com', 'saprajap@ncsu.edu']
    today = today.strftime("%d-%b-%Y")
    print("Checking for Internet Connection\n")
    username = os.getenv('USERNAME')
    password = os.getenv('PASSWORD')
    server = smtplib.SMTP_SSL("smtp.gmail.com")
    server.login(username,password)
    emailfrom = username
    emailto =", ".join(recipients)

    msg = MIMEMultipart('alternative')
    msg["From"] = emailfrom
    msg["To"] = emailto
    msg["Subject"] = "Product analysis "+today

    result = product_records.find({"name": productname}, {"features": 1})
    result = pd.json_normalize(list(result))
    result = result.explode('features').reset_index(drop=True)
    features = pd.DataFrame(result['features'].tolist())
    features.rename(columns={'text': 'FeatureName', 'votes': 'Votes'}, inplace=True)
    result = features[['FeatureName', 'Votes']].sort_values(by='Votes', ascending=False)[:5]
    import io
    str_io = io.StringIO()
    result.to_html(buf=str_io, classes='table table-striped', index=False)
    html_str1 = str_io.getvalue()
    email_content = "Testing email function"
    HTML_BODY = MIMEText(email_content, 'text')
    msg.attach(HTML_BODY)
    server = smtplib.SMTP_SSL("smtp.gmail.com", 465)
    server.login(username, password)
    print("Sending...")
    server.sendmail(emailfrom, recipients, msg.as_string())
    server.quit()
    print("Sent")
    return 'Email Sent!'
