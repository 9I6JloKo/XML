from database import SessionLocal, engine
from sqlalchemy.orm import Session
import models
import schemas

def get_category_by_id(db: Session, category_id: int):
    return db.query(models.Category).get(category_id)

def get_categories(db:Session):
    return db.query(models.Category).all()

def get_authors_by_id(db: Session, author_id: int):
    return db.query(models.Author).get(author_id)

def get_authors(db:Session):
    return db.query(models.Author).all()

def get_book_by_id(db: Session, book_id: int):
    return db.query(models.Book).get(book_id)

def get_book_by_title(db: Session, title: str):
    return db.query(models.Book).filter(models.Book.title == title).first()

def get_books(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Book).offset(skip).limit(limit).all()

def create_book(db: Session, book: schemas.Book):
    print(book.title)
    new_book = models.Book(title = book.title, isbn = book.isbn, pageCount = book.pageCount, shortDescription = book.shortDescription, longDescription = book.longDescription, publishedDate = book.publishedDate)
    db.add(new_book)
    db.commit()
    return new_book

def create_category(db: Session, category: schemas.Category):
    print(category.name)
    new_category = models.Category(name = category.name)
    db.add(new_category)
    db.commit()
    return new_category

def create_author(db: Session, author: schemas.Author):
    print(author.name)
    new_author = models.Author(name = author.name)
    db.add(new_author)
    db.commit()
    return new_author

def delete_category_by_id(db: Session, id):
    try:
        db.delete(get_category_by_id(db, id))
        db.commit()
        return True
    except:
        return "Не удалось удалить"

def delete_author_by_id(db: Session, id):
    try:
        db.delete(get_authors_by_id(db, id))
        db.commit()
        return True
    except:
        return "Не удалось удалить"

def delete_books_by_id(db: Session, id):
    try:
        db.delete(get_book_by_id(db, id))
        db.commit()
        return True
    except:
        return "Не удалось удалить"