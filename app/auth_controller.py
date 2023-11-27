# pylint: disable=wrong-import-position,pointless-string-statement,undefined-variable,line-too-long
import json
from flask import request, session, redirect, url_for,render_template
from flask import Response
import bcrypt
from app import app
from users import Users

userdb=Users()

@app.route("/signup", methods=['POST'])
def signup():
    """
    Post request to register a new user, will give error if user is already
    """
    print("Signup debugging")
    if request.method == "POST":
        user = request.form.get("name")
        email = request.form.get("email")
        password = request.form.get("password")
        email_found = userdb.get_user_by_email(email)
        print(email_found)

        if email_found:
            error_dict = {
                "code": 409,
                "message": "This email already is already registered.",
            }
            message = json.dumps(error_dict)
            return message

        hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        user_input = {'name': user, 'email': email, 'password': hashed}
        res, code = userdb.add_user(user_input)
        if code == 200:
            session["email"] = email
            session["name"] = user
            session['userid'] = res['UserID']

            return Response(200)
        else:
            error_dict = {
                "code": 409,
                "message": "Something went wrong. Please try again",
            }
            message = json.dumps(error_dict)
            return message

@app.route("/login", methods=["POST"])
def login():
    """
    Checks if user and email is in database to login
    """
    if request.method == "POST":
        email = request.form.get("email", None)
        password = request.form.get("password", None)

        if password is None or email is None:

            return Response(status=403)

        email_found = userdb.get_user_by_email(email)
        
        if email_found!="null":
            email_val = email_found['email']
            password_check = email_found['password']
            name = email_found['name']

            if bcrypt.checkpw(password.encode('utf-8'), password_check):
                session["email"] = email_val
                session["name"] = name
                session['userid']=email_found['_id']
                print("Logged in successfully!")
                return redirect(url_for('product_feed'))
            else:
                error_dict = {
                    "code": 409,
                    "message": "Incorrect Email or Password!. Try again"
                }
                message = json.dumps(error_dict)
                return message
        else:
            error_dict = {
                "code": 409,
                "message": "Incorrect Email or Password!. Try again"
            }
            message = json.dumps(error_dict)
            return message
    
@app.route("/logout", methods=["POST", "GET"])
def logout():
    """
    Checks if user is in session and removes them from it
    """
    if "email" in session:
        # delete the entire session
        session.clear()
        return redirect(url_for('login'))
    else:
        return redirect(url_for('login'))