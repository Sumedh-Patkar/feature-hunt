# pylint: disable=wrong-import-position,pointless-string-statement,undefined-variable,line-too-long

from flask import jsonify
from flask import request,render_template
from app import app
from company import Company

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
@app.route("/addcompany", methods=['Post','GET'])
def add_company():
    if request.method == 'POST':
        company_name = request.form.get("name")
        company_description = request.form.get("description")
        tags = request.form.get("tags").split(',')

        company_input = {'name': company_name, 'description': company_description,
                            'tags': tags,'views':0,'products':[]}


        res=Product.add_company(company_input)
        return jsonify(success=res)
    else:
        return render_template("productform.html")


@app.route("/getcompanies", methods=['GET'])
def get_companies():
    res=Company.get_companies()
    return res

@app.route("/getcompany/<company_id>", methods=['GET'])
def get_company(company_id):
    res=Company.get_company(company_id)
    return res

@app.route("/deletecompany/<company_name>", methods=['DELETE'])
def delete_company(company_name):
    res=Product.delete_company(company_name)
    return res
