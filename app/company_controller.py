# pylint: disable=wrong-import-position,pointless-string-statement,undefined-variable,line-too-long

from flask import jsonify
from flask import request,render_template,session,redirect,url_for
from app import app
from company import Company
from users import Users
from products import Product
import pdb; 
from bson import json_util
from pprint import pprint
import json

productdb=Product()
userdb=Users()
companydb = Company()

@app.route("/addcompany", methods=['POST'])
def add_company():
    """
    This post request is used to add a company to the database
    by using the company data and description entered by the user
    """
    if request.method == 'POST':
        company_name = request.form.get("name")
        company_description = request.form.get("description")
        tags = request.form.get("tags").split(',')

        company_input = {
            'name': company_name,
            'description': company_description,
            'tags': tags,
            'views' : 0,
            'likes_count' : 0,
            'dislikes_count' : 0,
            'products':[]
        }

        res = companydb.add_company(company_input)

        return jsonify({'company_name', res['name']}), 201

@app.route("/getcompanies", methods=['GET'])
def get_companies():
    res = companydb.get_companies()
    json_res = json_util.dumps(res)
    return json_res

@app.route("/deletecompany/<company_name>", methods=['DELETE'])
def delete_company(company_name):
    res = companydb.delete_company(company_name)
    json_res = json_util.dumps(res)
    return json_res

@app.route('/company/<company_id>', methods=['GET'])
def view_company(company_id):
    data = companydb.get_company(company_id)
    product_list = []
    for product in data['products']:
        product_list.append(productdb.get_product(product))

    print("\nPrinting Product list")
    print(product_list)

    print("\nPrinting data")
    print(data)

    return json.loads(json_util.dumps({
        'data': data,
        'product_list': product_list
    }))
