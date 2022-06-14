from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime
# элемент jsona 
class Category(BaseModel):
    id: Optional[int]
    name: str
    class Config:
        orm_mode = True 
        # связывание с базой true
class Author(BaseModel):
    id: Optional[int]
    name: str
    class Config:
        orm_mode = True 
        # связывание с базой true
class Book(BaseModel):
    id: Optional[int]
    title: str
    isbn: str
    pageCount: int
    shortDescription: str
    longDescription: str
    publishedDate: datetime
    class Config:
        orm_mode = True 
        # связывание с базой true
