import json
import webbrowser

table_file = open('index.html', 'w', encoding='utf-8')
table_file.write('<!DOCTYPE html><head><meta charset="UTF-8" /></head><body><h1>Welcome to Pizzeria or Filmoteka</h1><br><br><br><br><p><hr>')

with open('Films.json', 'r') as films:
    dataFilms = json.load(films)
with open('pizza.json', 'r') as pizza:
    dataPizza = json.load(pizza)

filmsNumber = 0

for i in dataFilms:
    table_file.write(f"<h2>{dataFilms[filmsNumber]['Title']}</h2>")
    table_file.write(f"<b>Year:</b> {dataFilms[filmsNumber]['Year']}<br><br>")
    table_file.write(f"<b>Released:</b> {dataFilms[filmsNumber]['Released']}<br><br>")
    table_file.write(f"<b>Runtime:</b> {dataFilms[filmsNumber]['Runtime']}<br><br>")
    table_file.write(f"<b>Plot:</b> {dataFilms[filmsNumber]['Plot']}<br><br>")
    table_file.write(f"<img src=\'{dataFilms[filmsNumber]['Poster']}\'><br><br>")
    table_file.write("<hr>")
    filmsNumber += 1

pizzasNumber = 0
ingredientsNumber = 0
stepsNumber = 0

for i in dataPizza:
    table_file.write(f"<h2>{dataPizza[pizzasNumber]['Name']}</h2><br>")
    table_file.write(f"<b>pizza Mass:</b> {dataPizza[pizzasNumber]['pizzaMass']}<br><br>")
    table_file.write(f"<img src=\'{dataPizza[pizzasNumber]['photo']}\'; style='width:400px'><br>")
    table_file.write("<b>Ingredients:</b><br>")
    for i in dataPizza[pizzasNumber]['ingredients']:
        table_file.write(f"{dataPizza[pizzasNumber]['ingredients'][ingredientsNumber]['name']} |||||||")
        table_file.write(f"     mass: {dataPizza[pizzasNumber]['ingredients'][ingredientsNumber]['amount']}<br><br>")
        ingredientsNumber+=1
    ingredientsNumber = 0
    table_file.write("-------------------------------------------<br>")
    for i in dataPizza[pizzasNumber]['steps']:
        table_file.write(f"<b>STEP: {dataPizza[pizzasNumber]['steps'][stepsNumber]['stepNumb']}</b><br>")
        table_file.write(f"{dataPizza[pizzasNumber]['steps'][stepsNumber]['description']}<br><br>")
        stepsNumber+=1
    stepsNumber = 0

    table_file.write("<hr>")
    pizzasNumber += 1

table_file.write('</p></body><html>')
table_file.close()

url = 'index.html'
webbrowser.open(url, new=2)  # open in new tab
