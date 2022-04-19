import json
import webbrowser

table_file = open('index.html', 'w', encoding='utf-8')
table_file.write('<!DOCTYPE html><head><meta charset="UTF-8" /></head><body><h1>Welcome to Pizzeria</h1><p>')
# table_file.write(f"<img src=\'{}\'><br>")
table_file.write('</p></body><html>')
table_file.close()

url = 'D:\JPTV20\XML GRISH\pizzaFilms\index.html'
webbrowser.open(url, new=2)  # open in new tab
f = open('pizza.json', 'r')
 
# returns JSON object as
# a dictionary
data = json.load(f)

# the result is a Python dictionary:
print(data["age"])

f.close()