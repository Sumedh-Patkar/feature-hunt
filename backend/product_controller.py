# pylint: disable=wrong-import-position,pointless-string-statement,undefined-variable,line-too-long

from flask import jsonify
from flask import request,render_template
from app import app
from db_init import product_records


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
        last_date = request.form.get("lastDate")
        tags = request.form.get("tags").split(' ')

        # feature_dict = [{'id': 2, 'text': 'feature-1', 'votes': 1, 'timestamp': '1234567', 'tags': ['tag1']}]
        feature_dict = []
        product_input = {'name': product_name, 'description': product_description,
                            'image_url': image_url, 'users': [email], 'tags': tags, 'features': feature_dict,
                            'last_date': last_date,'votes':0}


        product_records.insert_one(product_input)

        return jsonify(success=True)
    else:
        return render_template("productform.html")
# @app.route("/<productName>/addFeature", method=['Post'])
# def addFeature(productName):
#     if request.method == 'POST':
#         data = request.json
#         data['_id'] = ObjectId()
#         print(data)
#         if data is None or data == {}:
#             return Response(response=json.dumps({"Error":
#                             "Please provide connection information"}),
#                             status=400,
#                             mimetype='application/json')
#         result = product_records.find_one_and_update(
#             {"project_name": productName}, {"$push": {"features": data}}
#         )

#         return jsonify(success=True)

#     elif request.method == 'GET':
#         result = mongo.db.products.find({"name": productname}, {"features": 1})
#     return dumps(result)
