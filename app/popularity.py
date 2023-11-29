from flask import request, jsonify, Response
from flask import json
from app import app
from bson.json_util import dumps
from bson.objectid import ObjectId
from db_init import popularity_records
import pdb

class Popularity:
    def __init__(self) -> None:
        self.db=popularity_records
    
    def get_product_popularity(self, product_name, user_id):
        #get timestamp sorted products
        likes_count = self.db.find({'product_name' : product_name, 'is_liked' : 1}).count()
        dislikes_count = self.db.find({'product_name' : product_name, 'is_liked' : 0}).count()
        user_liked = self.db.find({'product_name' : product_name, 'user_id' : user_id})
        print(user_liked)

        # Modify this so that it is either 1 (liked), 0 disliked or -1 (none)
        # if user_liked ...
            # user_liked = something

        return {
            'likes_count': likes_count,
            'dislikes_count': dislikes_count,
            'user_liked': user_liked
        }
        
    def like_product(self, product_name, user_id):
        popularity_obj = {
            'product_name' : product_name,
            'user_id' : user_id,
            'is_liked' : 1
        }
        x = self.db.insert_one(popularity_obj)
        return x

    def dislike_product(self, product_name, user_id):
        popularity_obj = {
            'product_name' : product_name,
            'user_id' : user_id,
            'is_liked' : 0
        }
        x = self.db.insert_one(popularity_obj)
        return x

    def unlike_product(self, product_name, user_id):
        db_response = self.db.delete_one({'product_name' : product_name, 'user_id' : user_id,})
        return db_response
