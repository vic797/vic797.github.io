from bs4 import BeautifulSoup
import requests
import json
import base64
from PIL import Image
from io import BytesIO

response = requests.get("https://www.digminecraft.com/lists/item_id_list_pc.php")
if response.status_code != 200:
	print("Error fetching page")
	exit()
else:
	content = response.content

soup = BeautifulSoup(response.content, 'html.parser')

table = soup.find_all("table", id = "minecraft_items")
rows = table[0].find_all("tr")

result = {
}

for row in rows[1:]:
    cells = row.find_all("td")
    temp = cells[0].find("img")
    image = "https://www.digminecraft.com"
    if temp.get("data-src") is None:
        image = image + temp.get("src")
    else:
        image = image + temp.get("data-src")
    name = cells[1].text if cells[1].find("a") is None else cells[1].find("a").text
    id = cells[1].find("em").text
    img = Image.open(requests.get(image, stream=True).raw)
    buffered = BytesIO()
    img.save(buffered, format="PNG")
    result[id] = {
        "image": base64.b64encode(buffered.getvalue()).decode("utf-8"),
        "name": name
    }

out = open("ids.json", "w")
out.write(json.dumps(result, indent=4))
out.close()