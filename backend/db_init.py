import pymongo
import ssl
#added my own id and password
uri = "mongodb+srv://nrpancho:Nidhay2110@cluster0.wwokmcs.mongodb.net/?retryWrites=true&w=majority"
client = pymongo.MongoClient(uri,ssl_cert_reqs=ssl.CERT_NONE)
db = client.get_database('feature-hunt')
records = db.users
product_records = db.products