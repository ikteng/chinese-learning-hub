from flask import Flask, request, jsonify
from flask_cors import CORS
from supabase import create_client, Client
import psycopg2
from dotenv import load_dotenv
from werkzeug.security import generate_password_hash, check_password_hash
import os

load_dotenv()  # load .env file

app = Flask(__name__)
CORS(app)

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_PUBLISHABLE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# --------- USER SIGNUP ---------
@app.route("/api/signup", methods=["POST"])
def signup():
    body = request.json
    print("Body received:", body)
    username = body.get("username")
    email = body.get("email")
    password = body.get("password")

    if not username or not email or not password:
        return jsonify({"ok": False, "error": "Username, email and password required"}), 400

    # Check if email already exists
    existing_email = supabase.from_("users").select("*").eq("email", email).execute()
    if existing_email.data:
        return jsonify({"ok": False, "error": "Email already registered"}), 400

    # Check if username already exists
    existing_username = supabase.from_("users").select("*").eq("username", username).execute()
    if existing_username.data:
        return jsonify({"ok": False, "error": "Username already taken"}), 400

    # Hash the password
    hashed_password = generate_password_hash(password)

    # Insert user into Supabase
    res = supabase.from_("users").insert({
        "username": username,
        "email": email,
        "password": hashed_password
    }).execute()

    print("Insert result:", res)

    return jsonify({"ok": True, "data": res.data})

# --------- USER LOGIN ---------
@app.route("/api/login", methods=["POST"])
def login():
    body = request.json
    email = body.get("email")
    password = body.get("password")

    if not email or not password:
        return jsonify({"ok": False, "error": "Email and password required"}), 400

    # Find user
    res = supabase.from_("users").select("*").eq("email", email).execute()
    if not res.data:
        return jsonify({"ok": False, "error": "User not found"}), 404

    user = res.data[0]

    # Check password
    if check_password_hash(user["password"], password):
        return jsonify({
            "ok": True,
            "message": "Login successful",
            "user": {
                "id": user["id"],
                "name": user["username"],
                "email": user["email"]
            }
        })
    else:
        return jsonify({"ok": False, "error": "Incorrect password"}), 401

if __name__ == "__main__":
    app.run(port=5001, debug=True)
