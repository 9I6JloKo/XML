import requests
from bs4 import BeautifulSoup
import xml.etree.ElementTree as ET
import webbrowser

url = "https://www.postimees.ee/rss"
xml_data = requests.get(url).content
soup = BeautifulSoup(xml_data, 'xml')
items = []
table_file = open('index.html', 'w', encoding='utf-8')
table_file.write('<!DOCTYPE html><head><meta charset="UTF-8" /></head><body><h1>Welcome to Postimees</h1><p>')

for i in soup.find_all("item"):
    item = {}
    item['title'] = i.find("title")
    table_file.write(f"{item['title']}<br>")

    item['description'] = i.find("description")
    table_file.write(f"{item['description']}<br>")

    item['link'] = i.find("link")
    table_file.write(f"{item['link']}<br>")

    item['pubDate'] = i.find("pubDate")
    table_file.write(f"{item['pubDate']}<br>")

    item['author'] = i.find_all("author")
    table_file.write(f"{item['author']}<br>")

    item['category'] = i.find_all("category")
    table_file.write(f"{item['category']}<br>")

    item['enclosure'] = i.find("enclosure")["url"]
    table_file.write(f"<img src=\'{item['enclosure']}\'><br>")

    items.append(item)

table_file.write('<p></body><html>')
table_file.close()

url = 'D:\JPTV20\XML GRISH\index.html'
webbrowser.open(url, new=2)  # open in new tab

