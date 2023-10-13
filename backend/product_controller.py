# pylint: disable=wrong-import-position,pointless-string-statement,undefined-variable,line-too-long

from flask import jsonify
from flask import request,render_template,session,redirect,url_for
from app import app
from products import Product

productdb = Product()

#################################################################################
##       Function: add_product
##       Description: This post request is used to gather all the information from
##                    the project form and send it to the database to be stored
##       Inputs:
##           - NA
##       Outputs:
##           - Returns true or false if new project is able to be added
#################################################################################
@app.route("/addproduct", methods=['Post','GET'])
def add_product():
    if 'userid' not in session:
        return redirect(url_for('login'))
    if request.method == 'POST':
        product_name = request.form.get("productName")
        product_description = request.form.get("productDescription")
        tags = request.form.get("tags").split(',')

        product_input = {'name': product_name, 'description': product_description,
                            'tags': tags, 'features': [],'votes':0,'views':0,'created_by':session['userid']}


        res=productdb.add_product(product_input)
        return redirect(url_for('product_feed'))
    else:
        return render_template("productform.html")



@app.route("/getproducts", methods=['GET'])
def get_products():
    res=productdb.get_products()
    return res

@app.route("/getProduct/<product_id>", methods=['GET'])
def get_product(product_id):
    res=productdb.get_product(product_id)
    return res


@app.route("/deleteProduct/<product_name>", methods=['DELETE'])
def delete_product(product_name):
    res=productdb.delete_product(product_name)
    return res

@app.route("/getSortedProducts/<sort_by>", methods=['GET'])
def get_sorted_products(sort_by):
    res=productdb.get_sorted_products(sort_by)
    return res

@app.route("/addView/<product_id>", methods=['GET'])
def add_view(product_id):
    res=productdb.add_view(product_id)
    return res



@app.route('/feed', methods=['GET'])
def product_feed():
    if 'userid' not in session:
        return redirect(url_for('login'))
    
    products=productdb.get_products()
    return render_template('productfeed.html')


@app.route('/viewproduct/<product_id>', methods=['GET'])
def view_product(product_id):
    if 'userid' not in session:
        return redirect(url_for('login'))
    return render_template('productpage.html')