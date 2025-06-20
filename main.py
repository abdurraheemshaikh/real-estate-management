from fastapi import FastAPI,Path, HTTPException,Query
import json
from pydantic import BaseModel,EmailStr
from typing import List, Annotated
from Database import Tables as search_models
from Auth_service import models as auth_models

from sqlalchemy.orm import Session
from Search import search as search
from Auth_service import auth as auth_service


app = FastAPI()
app.include_router(auth_service.router)
app.include_router(search.router)



def load_data():
    with open("data.json", "r") as file:
        return json.load(file)

@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/data/{item_id}")
def get_data(item_id: str = Path(..., description="The ID of the item to retrieve")):
    data = load_data()
    if item_id in data:
        return data[item_id]
    else:
        return {"error": "Item not found"}, 404
    


@app.get("/sort")
def get_sorted_data(sort_by: str = Query(..., description="Field to sort by"),order:str = Query("asc", description="Order of sorting, 'asc' for ascending and 'desc' for descending")):
    vali_fields = ["height", "weight", "bmi", "asc","desc"]
    if sort_by not in vali_fields:
        raise HTTPException(status_code=400, detail="Invalid sort field")
    if order not in ["asc", "desc"]:
        raise HTTPException(status_code=400, detail="Invalid order, must be 'asc' or 'desc'")
    
    data = load_data()
    sort_order=True if order == "asc" else False
    
    sorted_data = sorted(data.values(), key=lambda x: x.get(sort_by,0), reverse=not sort_order)
    return sorted_data