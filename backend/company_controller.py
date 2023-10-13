# pylint: disable=wrong-import-position,pointless-string-statement,undefined-variable,line-too-long

from flask import jsonify
from flask import request,render_template
from app import app
from company import Company

companydb = Company()

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


        res=companydb.add_company(company_input)
        return jsonify(success=res)
    else:
        return render_template("companyform.html")


@app.route("/getcompanies", methods=['GET'])
def get_companies():
    res=companydb.get_companies()
    return res


@app.route("/deletecompany/<company_name>", methods=['DELETE'])
def delete_company(company_name):
    res=companydb.delete_company(company_name)
    return res

@app.route('/companyfeed', methods=['GET'])
def company_feed():
    return render_template('companyfeed.html')

@app.route('/company/<company_id>', methods=['GET'])
def company(company_id):
    data= companydb.get_company(company_id)
    print(data)
    return render_template('CompanyPage.html',data=data)