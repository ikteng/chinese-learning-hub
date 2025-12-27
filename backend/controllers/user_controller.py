from flask import Blueprint, request, jsonify
from models.user_model import UserModel

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/api/signup", methods=["POST"])
def signup():
    body = request.json
    username = body.get("username")
    email = body.get("email")
    password = body.get("password")

    if not username or not email or not password:
        return jsonify({"ok": False, "error": "Username, email and password required"}), 400

    if UserModel.get_by_email(email):
        return jsonify({"ok": False, "error": "Email already registered"}), 400

    if UserModel.get_by_username(username):
        return jsonify({"ok": False, "error": "Username already taken"}), 400

    res = UserModel.create_user(username, email, password)
    return jsonify({"ok": True, "data": res.data})

@auth_bp.route("/api/login", methods=["POST"])
def login():
    body = request.json
    email = body.get("email")
    password = body.get("password")

    if not email or not password:
        return jsonify({"ok": False, "error": "Email and password required"}), 400

    user = UserModel.get_by_email(email)
    if not user:
        return jsonify({"ok": False, "error": "User not found"}), 404

    if UserModel.verify_password(user["password"], password):
        return jsonify({
            "ok": True,
            "message": "Login successful",
            "user": {
                "id": user["id"],
                "name": user["username"],
                "email": user["email"]
            }
        })
    return jsonify({"ok": False, "error": "Incorrect password"}), 401
