import xml.etree.ElementTree as ET

tree = ET.parse('xml_1.xml')  
root = tree.getroot()

countries = []

for item in root.findall('./country'):
    country = {}
    country['name'] = item.attrib['name']
    for child in item:
        if child.tag == "language":
            country['language'] = child.text
        if child.tag == "ISO":
            country['ISO'] = child.text
    countries.append(country)
for i in range(10):
    print(countries[i])        



# from bs4 import BeautifulSoup
# with open('movies.xml', 'r') as f:
#     data = f.read()

# Bs_data = BeautifulSoup(data, "xml")
# films = Bs_data.find_all('Movie')
# print(films)