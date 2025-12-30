from flask import Blueprint, request, jsonify
from models.sentence_model import SentenceModel

sentence_bp = Blueprint("sentence", __name__)

@sentence_bp.route("/sentences", methods=["GET"])
def get_sentences():
    sentences = SentenceModel.get_all_sentences()
    return jsonify(sentences), 200

@sentence_bp.route("/sentences", methods=["POST"])
def add_sentence():
    data = request.get_json()
    text = data.get("sentence", "").strip()
    if not text:
        return jsonify({"error": "Sentence cannot be empty"}), 400

    res = SentenceModel.create_sentence(text)
    return jsonify({"message": "Sentence added", "sentence": text}), 201
