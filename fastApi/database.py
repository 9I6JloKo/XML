from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# параметры для поиска базы данных
user = 'root'
password = ''
host = 'localhost'
port = 3306
database = 'library_db'
#  создание ссылки
SQLALCHEMY_DATABASE_URL = f"mysql+mysqlconnector://{user}:{password}@{host}:{port}/{database}"
# Функция sqlalchemy.create_engine() создает новый экземпляр класса sqlalchemy.engine.Engine который предоставляет подключение к базе данных.
engine = create_engine(SQLALCHEMY_DATABASE_URL)
# указываем список аргументов у фабрики
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
# строит базовый класс для декларативных(торжеств.) определений классов 
Base = declarative_base()