from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import relationship

from database import Base
# создание таблиц 
class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), index=True)

    books = relationship('Book', secondary='bookcategories', back_populates='categories')
    # foreign key

class BookCategory(Base):
    __tablename__ = "bookcategories"
    id = Column(Integer, primary_key=True, index=True)
    BookId = Column(Integer, ForeignKey('books.id'))
    CategoryId = Column(Integer, ForeignKey('categories.id'))

class Book(Base):
    __tablename__ = "books"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), index=True)
    isbn = Column(String(20))
    pageCount = Column(Integer)
    shortDescription = Column(String(255))
    longDescription = Column(String(3000))
    publishedDate = Column(DateTime)
    
    categories = relationship('Category', secondary='bookcategories', back_populates='books')
    authors = relationship('Author', secondary='bookauthors', back_populates='books')
    
class BookAuthor(Base):
    __tablename__ = "bookauthors"
    id = Column(Integer, primary_key=True, index=True)
    BookId = Column(Integer, ForeignKey('books.id'))
    AuthorId = Column(Integer, ForeignKey('authors.id'))

class Author(Base):
    __tablename__ = "authors"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), index=True)

    books = relationship('Book', secondary='bookauthors', back_populates='authors')