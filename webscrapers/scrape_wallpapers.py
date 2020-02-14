# GOAL OF THIS SOFTWARE: print wallpaper name & image URL info in Terminal, then download each image item into a png
## please install PYTHON3, CHROMEDRIVER, SELENIUM, REQUESTS, then proceed
### then enter in Terminal ```pip install -r setup.py```
#### NOW, you can run this script in Terminal with ```python3 scrape_bundles.py```
##### reuse & recycle & have a nice day

# headless browser
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
# raw file data tool
import requests

# make sure you also add CHROMEDRIVER to system path (I enclosed the program in this folder so your device might find it ;)
driver = webdriver.Chrome('./chromedriver')
# read here if your device has problems w CHROMEDRIVER PATH stuff:
# https://github.com/SeleniumHQ/selenium/wiki/ChromeDriver

# surfs Incognito => scrapes better ^_^
option = webdriver.ChromeOptions()
option.add_argument("--incognito")

# launches Chrome
browser = webdriver.Chrome(executable_path='./chromedriver', options=option)

# surfs to this URL
browser.get("https://stardewvalleywiki.com/Wallpaper")


###
##
# internet lag timeout (error handling)
timeout = 30
try:
	# checking for element on page, to test connection (the only <li> with id='pt-createaccount' )
	WebDriverWait(browser, timeout).until(EC.visibility_of_element_located((By.XPATH, "//li[@id='pt-createaccount']")))
except TimeoutException:
	print("This page takes too long to load-- try again?")
	browser.quit()
#
##
###


### scraping Bundle info; 2 metadata elements: name & image alt

# scraping bundle images, they are the only element w width='136'
results = browser.find_elements_by_xpath("//img[@width='96']")
# parsing returned objects into desired items ('list comprehension')
wallpaper_name = [x.get_attribute('alt') for x in results]
image_URL = [x.get_attribute('src') for x in results]


### display scraping results in Terminal

print('Bundles of Pelican Town:')
## zip() matches the scraped elements to each other
for wallpaper_name, image_URL in zip(wallpaper_name, image_URL):
	png_name = 'tag-'+image_URL.split('/')[-1]
#	test of variables
	print(wallpaper_name + ": Let's use filename " + png_name + " when we save this resource ==> " + image_URL + '\n')
### next step is to save each image to a local file
#	download image
	rawImgData = requests.get(image_URL, stream=True)
#	create a file & save (write) the raw (binary) image data (ergo 'wb')
	with open(png_name, 'wb') as fd:
		for chunk in rawImgData.iter_content(chunk_size=1024):
			fd.write(chunk)
