# GOAL OF THIS SOFTWARE: print scraped data in Terminal
## please install PYTHON3, CHROMEDRIVER, SELENIUM, then proceed
### then enter in Terminal ```pip install -r setup.py```
#### NOW, you can run this script in Terminal with ```python3 scrape_bundles.py```
##### ♲ reuse & recycle & have a nice day ♲

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

# grab text of any <li> any level inside of className="mw-category-group"
# 'div[@className="mw-category-group"]//h3'
# // any h3 in a div with class 'mw-category-group'



# surfs to this URL
page_this_time = 'Farm_buildings'
url_this_time = f"https://stardewvalleywiki.com/Category:{page_this_time}"
print(f"Let's scrape this site: {url_this_time}")
browser.get(url_this_time)


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
# so we are scraping the URL above {url_this_time} for info...
# confirm the next bit yourself with Inspect in your browser, then modify this script as YOU need w this guide:
# https://gist.github.com/LeCoupa/8c305ec8c713aad07b14
# ENJOY CODING
#
# the URL target has info we need: this XPATH selector id's only the HTML we want
# it's always listed (are <ul><li>s) inside <div> elements w this ⬇️ class prop, and they are all ⬇️ <a> elements
results = browser.find_elements_by_xpath("//div[@className='mw-category-group']/ul/li/a")
# now let's collect the exact prop from these HTML elements
result_s = [x.get_attribute('title') for x in results]
# and print them all to Terminal
for result_s in result_s:
    print(result_s)
print(f"This concludes the scraping of: {url_this_time}")
# ENJOY CODING
##### ♲ reuse & recycle & have a nice day ♲
