# backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI()

# You might want to restrict origins in a production environment
origins = [
    "http://localhost",       # For local Docker Compose/Kubernetes if not using specific hostnames
    "http://localhost:3000",  # Default Next.js dev port
    # Add your frontend's Kubernetes service URL if known/needed,
    # though often internal K8s communication doesn't need explicit CORS for service-to-service.
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Data Model ---
class Item(BaseModel):
    id: int
    name: str
    description: str | None = None

fake_items_db = [
    {"id": 1, "name": "Foo", "description": "There comes Foo"},
    {"id": 2, "name": "Bar", "description": "The Bar fighters"},
    {"id": 3, "name": "Baz", "description": "Print Baz to screen"}
]

# --- API Endpoints ---
@app.get("/")
async def read_root():
    return {"message": "Hello from Python Backend!"}

@app.get("/api/items", response_model=List[Item])
async def read_items():
    return fake_items_db

@app.get("/api/items/{item_id}", response_model=Item)
async def read_item(item_id: int):
    for item in fake_items_db:
        if item["id"] == item_id:
            return item
    return {"error": "Item not found"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)