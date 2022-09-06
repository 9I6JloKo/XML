# import xml.etree.ElementTree as ET

# tree = ET.parse('CarSelling.xml')
# root = tree.getroot()
# sellers = {}
# for item in root.findall('./sellers'):
#     for item2 in root.findall('./seller'):
#         seller = {}
#         seller['fullName'] = item2[0].text
#         seller['car'] = item2[1].text
#         seller['phone'] = item2[2].text
#         seller['description'] = item2[3].text
#         seller['img'] = item2[4].text
#         sellers.append(seller) 
#         break
# for i in range(4):
#     print()
#     print(sellers[i])


import requests
from bs4 import BeautifulSoup
import xml.etree.ElementTree as ET
import webbrowser

# url = "https://rus.auto24.ee/vehicles/3741673"
# xml_data = requests.get(url).content


# xml_data = ET.parse('CarSelling.xml')  
# soup = BeautifulSoup(xml_data, 'xml')


tree = ET.parse('CarSelling.xml')
root = tree.getroot()
table_file = open('index.html', 'w', encoding='utf-8')
table_file.write('<!DOCTYPE html><head><meta charset="UTF-8" /></head><body style="font-family:Tahoma; font-size:24px"><h1>Welcome to CarSelling</h1><p>')

for i in root.findall("./sellers"):
    for a in i.findall("./seller"):
        item = {}
        item['fullName'] ="<b>" + a.find("fullName").attrib['name'] + "</b>"
        table_file.write(f"{item['fullName']}<br>")

        item['car'] = "<b> Car: </b>" + a.find("car").attrib['name'] + "<br><b> Primary_reg: </b>" + a.find("car").attrib['Primary_reg'] + "<br><b> Color: </b>" + a.find("car").attrib['collor']
        table_file.write(f"{item['car']}<br>")

        item['phone'] ="<b>Phone number:</b> " +  a.find("phone").attrib['number']
        table_file.write(f"{item['phone']}<br>")

        item['engine'] = "<b>Mileage:</b> " + a.find("engine").attrib['mileage'] + "<br><b>Fuel:</b> " + a.find("engine").attrib['fuel']
        table_file.write(f"{item['engine']}<br>")

        item['transmission'] = "<b>Transmission:</b> " + a.find("transmission").attrib['type']
        table_file.write(f"{item['transmission']}<br>")

        item['price'] ="<b>Price:</b> " +  a.find("price").attrib['price'] + " " + a.find("price").attrib['type'] + "<br><br>"
        table_file.write(f"{item['price']}<br>")

        item['img'] = a.find("img").attrib['url']
        table_file.write(f"<img src=\'{item['img']}\'<br><br><br>")

table_file.write('<p></body><html>')
table_file.close()

url = 'index.html'
webbrowser.open(url, new=2)  # open in new tab




# table_file = open('index.html', 'w', encoding='utf-8')
# table_file.write('<!DOCTYPE html><head><meta charset="UTF-8" /></head><body><h1>Welcome to CarSelling</h1><p>')
# # table_file.write(f"<img src=\'{}\'><br>")
# table_file.write('</p></body><html>')
# table_file.close()

# url = 'C:\Users\pupil\Documents\DenisMkasim\index.html'
# webbrowser.open(url, new=2)  # open in new tab
# f = open('CarSelling.xml', 'r')
 
# # returns JSON object as
# # a dictionary
# data = json.load(f)

# # the result is a Python dictionary:
# print(data["age"])

# f.close()