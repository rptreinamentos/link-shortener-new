import string
import random
from datetime import datetime
import os
from supabase import create_client

# Configuração do Supabase
supabase_url = os.environ.get("SUPABASE_URL")
supabase_key = os.environ.get("SUPABASE_KEY")
supabase = create_client(supabase_url, supabase_key)

class Link:
    def __init__(self, id=None, short_code=None, original_url=None, created_at=None, description=None):
        self.id = id
        self.short_code = short_code
        self.original_url = original_url
        self.target_url = target_url
        self.created_at = created_at
        self.description = description

    @staticmethod
    def generate_short_code(length=6):
        """Gera um código curto aleatório"""
        characters = string.ascii_letters + string.digits
        return ''.join(random.choice(characters) for _ in range(length))

    @staticmethod
    def create_link(original_url, description):
        """Cria um novo link encurtado"""
        # Gerar código curto único
        while True:
            short_code = Link.generate_short_code()
            existing = Link.get_by_short_code(short_code)
            if not existing:
                break
        
        # Inserir na base de dados
        data = {
            "short_code": short_code,
            "original_url": original_url,
            "target_url": original_url,
            "description": description
        }
        
        result = supabase.table("links").insert(data).execute()
        
        if result.data:
            return Link(**result.data[0])
        return None

    @staticmethod
    def get_by_short_code(short_code):
        """Busca um link pelo código curto"""
        result = supabase.table("links").select("*").eq("short_code", short_code).execute()
        
        if result.data:
            return Link(**result.data[0])
        return None

    @staticmethod
    def get_by_id(link_id):
        """Busca um link pelo ID"""
        result = supabase.table("links").select("*").eq("id", link_id).execute()
        
        if result.data:
            return Link(**result.data[0])
        return None

    @staticmethod
    def get_all_links():
        """Busca todos os links"""
        result = supabase.table("links").select("*").order("created_at", desc=True).execute()
        
        if result.data:
            return [Link(**link) for link in result.data]
        return []

    def delete(self):
        """Elimina o link"""
        result = supabase.table("links").delete().eq("id", self.id).execute()
        return len(result.data) > 0

    def to_dict(self):
        """Converte o objeto para dicionário"""
        return {
            "id": self.id,
            "short_code": self.short_code,
            "original_url": self.original_url,
            "target_url": self.target_url,
            "created_at": self.created_at,
            "description": self.description
        }

