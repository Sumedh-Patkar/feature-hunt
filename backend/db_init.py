import pymongo
import ssl
uri = "mongodb+srv://nrpancho:Nidhay2110@cluster0.wwokmcs.mongodb.net/?retryWrites=true&w=majority"
client = pymongo.MongoClient(uri,ssl_cert_reqs=ssl.CERT_NONE)
db = client.get_database('feature-hunt')
records = db.users
product_records = db.products