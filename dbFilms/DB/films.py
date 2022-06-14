from typing import Union
from fastapi import FastAPI
import mysql.connector
import json

conn = mysql.connector.connect(
    host = "localhost",
    user = "root",
    password = "",
    database = "movies"
)

app = FastAPI()

if conn:
    print("OK")
else :
    print("Error")

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/films")
def get_films():
    cursorObject = conn.cursor()
    query = "SELECT * FROM film"
    # conn.reconnect()
    # cursor = conn.cursor()
    # cursor.execute(sql)
    # result = cursor.fetchall()
    # movies = []
    # for row in result:
    #     movies.append(dict(zip(cursor.column_names, row)))
    # return movies
    cursorObject.execute(query)
    rawResult = cursorObject.fetchall()

    jsonResult = []
    
    for i in rawResult:
        print(i)
        r = ({"id":i[0], "title":i[1], "year":i[2], "plot":i[3], "runtime":i[4], "poster":i[5]})
        jsonResult.append(r)
    
    return jsonResult