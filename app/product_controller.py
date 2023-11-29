# pylint: disable=wrong-import-position,pointless-string-statement,undefined-variable,line-too-long

from flask import jsonify
from flask import request,render_template,session,redirect,url_for
from app import app
from products import Product
from users import Users
from company import Company
from popularity import Popularity
from bson import json_util
import json
from pprint import pprint
import pdb

companydb=Company()
userdb=Users()
productdb = Product()
popularitydb = Popularity()

@app.route("/addproduct", methods=['POST'])
def add_product():
    """
    This post request is used to gather all the information from
    the product form and send it to the database to be stored
    """
    if request.method == 'POST':
        print("\n\nDebugging Add product")
        request_data = json_util.loads(request.data)
        product_name = request_data["name"]
        product_description = request_data["description"]
        tags = request_data["tags"].split(',')
        image_link = request_data["image_link"]
        company_name = request_data["company"]

        get_company=companydb.get_company_by_name(company_name)
        company_id = str(get_company['_id'])

        product_input = {
            'name': product_name,
            'description': product_description,
            'tags': tags,
            'features': [],
            'votes':0,
            'views':0,
            'image_link': image_link,
            'company_id' : company_id,
            'company_name' : company_name
        }

        res=productdb.add_product(product_input)
        companydb.add_product_to_company(company_id,res['ProductID'])

        return jsonify({'message': res['message']}), 201

@app.route("/getproducts", methods=['GET'])
def get_products():
    res = productdb.get_products()
    json_res = json_util.dumps(res)
    return json_res

@app.route("/getProduct/<product_id>", methods=['GET'])
def get_product(product_id):
    res=productdb.get_product(product_id)
    json_res = json_util.dumps(res)
    return json_res

@app.route("/deleteProduct/<product_name>", methods=['DELETE'])
def delete_product(product_name):
    res = productdb.delete_product(product_name)
    json_res = json_util.dumps(res)
    return json_res

@app.route("/getSortedProducts/<sort_by>", methods=['GET'])
def get_sorted_products(sort_by):
    res = productdb.get_sorted_products(sort_by)
    json_res = json_util.dumps(res)
    return json_res

@app.route("/addView/<product_id>", methods=['GET'])
def add_view(product_id):
    res = productdb.add_view(product_id)
    json_res = json_util.dumps(res)
    return json_res

@app.route("/like", methods=['POST'])
def like_product():
    """
    Post request to send to the popularity database.
    Increases the likes
    """
    if request.method == 'POST':
        request_data = json_util.loads(request.data)
        product_name = request_data["product_name"]
        user_email = request_data["user_email"]
        user_id = userdb.get_user_by_email()
        res = popularitydb.like_product(product_name, user_id)
        return jsonify(res), 201

@app.route("/dislike", methods=['POST'])
def dislike_product():
    """
    Post request to send to the popularity database.
    Increases the dislikes
    """
    if request.method == 'POST':
        request_data = json_util.loads(request.data)
        product_name = request_data["product_name"]
        user_email = request_data["user_email"]
        user_id = userdb.get_user_by_email()
        res = popularitydb.dislike_product(product_name, user_id)
        return jsonify(res), 201

@app.route("/unlike", methods=['POST'])
def unlike_product():
    """
    Post request to send to the popularity database.
    Increases the likes
    """
    if request.method == 'POST':
        request_data = json_util.loads(request.data)
        product_name = request_data["product_name"]
        user_email = request_data["user_email"]
        user_id = userdb.get_user_by_email()
        res = popularitydb.unlike_product(product_name, user_id)
        return jsonify(res), 201

@app.route('/feed', methods=['GET'])
def product_feed():
    # if 'email' not in session:
    #    return redirect(url_for('/'))

    products=productdb.get_products()
    pprint(products)
    for product in products:
        # request_data = json_util.loads(request.data)
        # user_email = request_data['user_email']
        # user_id = userdb.get_user_by_email()
        # Remove this hardcoding below and uncomment the above part
        user_id = '6563a4c18c7bf61beb6fcf7a'
        popularity = popularitydb.get_product_popularity(product['name'], user_id)
        product['popularity'] = popularity
    return jsonify({'products': products}), 200

@app.route('/viewproduct/<product_id>', methods=['GET'])
def view_product(product_id):
    # if 'userid' not in session:
    #    return redirect(url_for('login'))

    productdb.add_view(product_id)
    product = productdb.get_product(product_id)
    return json.loads(json.dumps({'product':product}))

@app.route("/suggestfeature/<product_id>", methods=['POST'])
def suggest_feature(product_id):
    #if 'userid' not in session:
     #   return redirect(url_for('login'))
    if request.method == 'POST':
        request_data = json_util.loads(request.data)
        feature_name = request_data["name"]
        feature_description = request_data["description"]
        feature_input = {
            'name': feature_name,
            'description': feature_description,
            'votes':0
        }
        res = productdb.add_feature(product_id,feature_input)
        return jsonify({'message': res['message']}), 201
