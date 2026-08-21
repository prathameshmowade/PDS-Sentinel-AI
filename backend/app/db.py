import json
import os
import copy
from datetime import datetime

DB_DIR = os.path.join(os.path.dirname(__file__), "database")
DB_FILE = os.path.join(DB_DIR, "pds_store.json")

class JSONDatabase:
    _data = {}

    @classmethod
    def initialize(cls, initial_data_store):
        os.makedirs(DB_DIR, exist_ok=True)
        if os.path.exists(DB_FILE):
            try:
                with open(DB_FILE, "r", encoding="utf-8") as f:
                    cls._data = json.load(f)
                    print(f"Loaded persistent database from {DB_FILE}")
                    return
            except Exception as e:
                print(f"Error loading database file, re-initializing: {e}")
        
        # Initialize with pre-seeded data store
        cls._data = copy.deepcopy(initial_data_store)
        cls.save()

    @classmethod
    def get(cls, collection_name, default=None):
        return cls._data.get(collection_name, default if default is not None else [])

    @classmethod
    def set(cls, collection_name, value):
        cls._data[collection_name] = value
        cls.save()

    @classmethod
    def save(cls):
        try:
            os.makedirs(DB_DIR, exist_ok=True)
            with open(DB_FILE, "w", encoding="utf-8") as f:
                json.dump(cls._data, f, indent=2, ensure_ascii=False)
        except Exception as e:
            print(f"Error saving database: {e}")

    @classmethod
    def add_complaint(cls, complaint_dict):
        complaints = cls._data.get("complaints", [])
        complaints.insert(0, complaint_dict)
        cls._data["complaints"] = complaints
        cls.save()
        return complaint_dict

    @classmethod
    def update_complaint(cls, complaint_id, updates):
        complaints = cls._data.get("complaints", [])
        for c in complaints:
            if c.get("id") == complaint_id:
                c.update(updates)
                cls.save()
                return c
        return None

    @classmethod
    def get_complaint_by_id(cls, complaint_id):
        complaints = cls._data.get("complaints", [])
        return next((c for c in complaints if c.get("id") == complaint_id), None)
