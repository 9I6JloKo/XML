import xml.etree.ElementTree as ET

tree = ET.parse('xml_2.xml')  
root = tree.getroot()
compartments = []

for item in root.findall('./compartment'):
    for item2 in item.findall('./profession'):
        for item3 in item2.findall('./group'):
            for item4 in item3.findall('./student'):
                compartment = {}
                compartment['compartment'] = item.attrib['name']
                compartment['profession'] = item2.attrib['name']
                compartment['group'] = item3.attrib['name']
                compartment['students'] = [g.attrib['name'] for g in item3.findall('./student')]
                compartments.append(compartment) 
                break
for i in range(10):
    print()
    print(compartments[i])
# если не создавать новый объект при добавлении в массив, то он перезаписывается