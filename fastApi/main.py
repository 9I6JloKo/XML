from fastapi import FastAPI
from fastapi import Depends, FastAPI, HTTPException, status
from sqlalchemy.orm import Session

import crud
import models 
import schemas
from database import SessionLocal, engine
# экземпляр новый
app = FastAPI()
# корневая папка
@app.get("/")
# базовый маршрут, который возвращает простой ответ JSON
def root():
    return {"message": "Hello World"}

# создать сеанс базы данных и закрыть его после завершения.
def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()
# папка категории
@app.get("/categories/")
# возвращаем json категории
def read_categories(db: Session = Depends(get_db)):
    return crud.get_categories(db)
@app.get("/categories/{category_id}")    #посмотреть категорию по номеру
def read_authors_by_id(category_id: int, db: Session = Depends(get_db)):
    return crud.get_category_by_id(db, category_id)
# запихиваем json в папку категории
@app.post("/categories/", response_model=schemas.Category)
def add_category(category: schemas.Category, db: Session = Depends(get_db)):
    return crud.create_category(db, category)

@app.get("/authors/")
# возвращаем json авторы
def read_authors(db: Session = Depends(get_db)):
    return crud.get_authors(db)
@app.post("/authors/", response_model=schemas.Author)
def add_author(author: schemas.Author, db: Session = Depends(get_db)):
    return crud.create_author(db, author)
@app.get("/authors/{author_id}")    #посмотреть автора по номеру
def read_authors_by_id(author_id: int, db: Session = Depends(get_db)):
    return crud.get_authors_by_id(db, author_id)
# запихиваем json в папку авторы
@app.get("/books/")
# возвращаем json авторы
def read_books(db: Session = Depends(get_db)):
    return crud.get_books(db)
@app.get("/books/{book_id}")     #посмотреть книгу по ид
def read_books_by_id(book_id: str, db: Session = Depends(get_db)):
    return crud.get_book_by_id(db, book_id)
@app.get("/books/{book_title}")     #посмотреть книгу по названию
def read_books_by_title(book_title: str, db: Session = Depends(get_db)):
    return crud.get_book_by_title(db, book_title)
# запихиваем json в папку авторы
@app.post("/books/", response_model=schemas.Book)
def add_book(book: schemas.Book, db: Session = Depends(get_db)):
    return crud.create_book(db, book)

@app.delete("/categories/{category_id}")
def delete_categories_by_id(category_id: str, db: Session = Depends(get_db)):
    return crud.delete_category_by_id(db, category_id)

@app.delete("/authors/{author_id}")
def delete_authors_by_id(author_id: str, db: Session = Depends(get_db)):
    return crud.delete_author_by_id(db, author_id)

@app.delete("/books/{book_id}")
def delete_books_by_id(book_id: str, db: Session = Depends(get_db)):
    return crud.delete_books_by_id(db, book_id)