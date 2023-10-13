
from flask import request, jsonify, Response
from flask import json
from app import app
import pandas as pd
from bson.json_util import dumps
from bson.objectid import ObjectId
from db_init import company_records


class Company:
    def __init__(self) -> None:
        self.db=company_records
    
    def get_companies(self):
        data = self.db.find()
        return dumps(data)
    
    def get_company(self,company_id):
        data = self.db.find_one({'_id': ObjectId(company_id)})
        return dumps(data)
    
    def add_company(self,company_input):
        x=self.db.insert_one(company_input)
        return jsonify({'CompanyID': str(x.inserted_id), 'message': 'Product added successfully'}), 200
    
    def delete_company(self,company_name):
        db_response = self.db.delete_one({'name': company_name})
        if db_response.deleted_count == 1:
            response = {'ok': True, 'message': 'record deleted'}
        else:
            response = {'ok': True, 'message': 'no record found'}
        return jsonify(response), 200
    