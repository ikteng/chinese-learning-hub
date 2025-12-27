from flask import Flask, request, jsonify
from flask_cors import CORS
from supabase import create_client, Client
from dotenv import load_dotenv
from werkzeug.security import generate_password_hash, check_password_hash
import os
from controllers.user_controller import auth_bp

load_dotenv()  # load .env file

app = Flask(__name__)
CORS(app)

# Register Blueprints
app.register_blueprint(auth_bp)

if __name__ == "__main__":
    app.run(port=5001, debug=True)
