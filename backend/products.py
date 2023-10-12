
from flask import request, jsonify, Response
from flask import json
from app import app
import pandas as pd
from bson.json_util import dumps
from bson.objectid import ObjectId
from db_init import product_records


'''
Function: products
Description: Get/ Add/ Update/ Delete the products from the database
Inputs:
  - NA
Outputs:
  - NA
'''

class Product:
    def __init__(self) -> None:
        self.db=product_records
    
    def get_products(self):
        data = self.db.find()
        return dumps(data)
    
    def get_product(self,product_id):
        data = self.db.find_one({'_id': ObjectId(product_id)})
        return dumps(data)
    
    def add_product(self,product_input):
        x=self.db.insert_one(product_input)
        return jsonify({'ProductID': str(x.inserted_id), 'message': 'Product added successfully'}), 200
    
    def delete_product(self,product_name):
        db_response = self.db.delete_one({'name': product_name})
        if db_response.deleted_count == 1:
            response = {'ok': True, 'message': 'record deleted'}
        else:
            response = {'ok': True, 'message': 'no record found'}
        return jsonify(response), 200
    
    def get_sorted_products(self,sort_by):
        data = self.db.find().sort(sort_by, -1)
        return dumps(data)

        
    def add_view(self,product_id):
        db_response = self.db.update_one({'_id': ObjectId(product_id)},{'$inc': {'views': 1}})
        if db_response.modified_count == 1:
            response = {'ok': True, 'message': 'record updated'}
        else:
            response = {'ok': True, 'message': 'no record found'}
        return jsonify(response), 200

    def add_vote(self,product_id):
        db_response = self.db.update_one({'_id': ObjectId(product_id)},{'$inc': {'votes': 1}})
        if db_response.modified_count == 1:
            response = {'ok': True, 'message': 'record updated'}
        else:
            response = {'ok': True, 'message': 'no record found'}
        return jsonify(response), 200
    
    def remove_vote(self,product_id):
        db_response = self.db.update_one({'_id': ObjectId(product_id)},{'$inc': {'votes': -1}})
        if db_response.modified_count == 1:
            response = {'ok': True, 'message': 'record updated'}
        else:
            response = {'ok': True, 'message': 'no record found'}
        return jsonify(response), 200