from werkzeug.security import generate_password_hash, check_password_hash
from config import supabase

class UserModel:
    @staticmethod
    def create_user(username: str, email: str, password: str):
        hashed_password = generate_password_hash(password)
        res = supabase.from_("users").insert({
            "username": username,
            "email": email,
            "password": hashed_password
        }).execute()
        return res

    @staticmethod
    def get_by_email(email: str):
        res = supabase.from_("users").select("*").eq("email", email).execute()
        return res.data[0] if res.data else None

    @staticmethod
    def get_by_username(username: str):
        res = supabase.from_("users").select("*").eq("username", username).execute()
        return res.data[0] if res.data else None

    @staticmethod
    def verify_password(stored_password, provided_password):
        return check_password_hash(stored_password, provided_password)
