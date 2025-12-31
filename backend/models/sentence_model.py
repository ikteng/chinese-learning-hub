from datetime import datetime
from config import supabase

class SentenceModel:
    @staticmethod
    def create_sentence(text: str, user_id: str):
        """Insert a new sentence into the database."""
        res = supabase.from_("sentences").insert({
            "text": text,
            "user_id": user_id
        }).execute()
        return res

    @staticmethod
    def get_all_sentences():
        """Fetch all sentences from the database."""
        res = supabase.from_("sentences").select("*").execute()
        return res.data if res.data else []

    @staticmethod
    def get_sentence_by_id(sentence_id: int):
        """Fetch a single sentence by its ID."""
        res = supabase.from_("sentences").select("*").eq("id", sentence_id).execute()
        return res.data[0] if res.data else None

    @staticmethod
    def update_sentence(sentence_id: int, new_text: str):
        """Update a sentence by ID."""
        res = supabase.from_("sentences").update({
            "text": new_text,
            "updated_at": datetime.utcnow().isoformat()
        }).eq("id", sentence_id).execute()
        return res

    @staticmethod
    def delete_sentence(sentence_id: int):
        """Delete a sentence by ID."""
        res = supabase.from_("sentences").delete().eq("id", sentence_id).execute()
        return res
