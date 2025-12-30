from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from controllers.user_controller import auth_bp
from controllers.sentence_controller import sentence_bp

load_dotenv()  # load .env file

app = Flask(__name__)
CORS(app)

# Register Blueprints
app.register_blueprint(auth_bp)
app.register_blueprint(sentence_bp)

if __name__ == "__main__":
    app.run(port=5001, debug=True)
