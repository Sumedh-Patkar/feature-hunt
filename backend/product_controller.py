# pylint: disable=wrong-import-position,pointless-string-statement,undefined-variable,line-too-long

from flask import jsonify
from flask import request,render_template
from app import app
from products import Product

Product = Product()

#################################################################################
##       Function: add_product
##       Description: This post request is used to gather all the information from
##                    the project form and send it to the database to be stored
##       Inputs:
##           - NA
##       Outputs:
##           - Returns true or false if new project is able to be added
#################################################################################
@app.route("/addProduct", methods=['Post','GET'])
def add_product():
    if request.method == 'POST':
        product_name = request.form.get("productName")
        product_description = request.form.get("productDescription")
        image_url = request.form.get("imageUrl")
        email = request.form.get("email")
        tags = request.form.get("tags").split(',')

        product_input = {'name': product_name, 'description': product_description,
                            'tags': tags, 'features': [],'votes':0,'views':0}


        res=Product.add_product(product_input)
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

@app.route("/addView/<product_id>", methods=['GET'])
def add_view(product_id):
    res=Product.add_view(product_id)
    return res