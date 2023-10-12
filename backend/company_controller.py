# pylint: disable=wrong-import-position,pointless-string-statement,undefined-variable,line-too-long

from flask import jsonify
from flask import request,render_template
from app import app
from db_init import product_records
from product_controller import Company

Product = Company()

#################################################################################
##       Function: add_product
##       Description: This post request is used to gather all the information from
##                    the project form and send it to the database to be stored
##       Inputs:
##           - NA
##       Outputs:
##           - Returns true or false if new project is able to be added
#################################################################################
@app.route("/addCompany", methods=['Post','GET'])
def add_product():
    if request.method == 'POST':
        company_name = request.form.get("name")
        company_description = request.form.get("description")
        tags = request.form.get("tags").split(',')

        company_input = {'name': company_name, 'description': company_description,
                            'tags': tags, 'features': [],'views':0}


        res=Product.add_company(company)
        return jsonify(success=res)
    else:
        return render_template("productform.html")


@app.route("/getProducts", methods=['GET'])
def get_products():
    res=Product.get_products()
    return res

@app.route("/getProduct/<product_id>", methods=['GET'])
def get_product(product_id):
    res=Product.get_product(product_id)
    return res

@app.route("/deleteProduct/<product_name>", methods=['DELETE'])
def delete_product(product_name):
    res=Product.delete_product(product_name)
    return res

@app.route("/getSortedProducts/<sort_by>", methods=['GET'])
def get_sorted_products(sort_by):
    res=Product.get_sorted_products(sort_by)
    return res