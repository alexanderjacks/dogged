# GOAL OF THIS SOFTWARE: print Bundle name & image URL info in Terminal, then download each image item into a png
## please install PYTHON3, CHROMEDRIVER, SELENIUM, REQUESTS, then proceed
### then enter in Terminal ```pip3 install -r setup.py```
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

## begins the iteration thru NPCs
persons = [
"Alex",
"Elliott",
"Harvey",
"Sam",
"Sebastian",
"Shane",
"Abigail",
"Emily",
"Haley",
"Leah",
"Maru",
"Penny",
#"Caroline",
#"Clint",
#"Demetrius",
#"Evelyn",
#"George",
#"Gus",
#"Jas",
#"Jodi",
#"Kent",
#"Lewis",
#"Linus",
#"Marnie",
#"Pam",
#"Pierre",
#"Robin",
#"Vincent",
#"Willy"
]

for person in persons: # just one after another in Terminal
    # surfs to this URL
    browser.get(f"https://stardewvalleywiki.com/{person}")

    ###
    ##
    # internet lag timeout (error handling)
    timeout = 30
    try:
    	# checking for default element on page, to test connection (the only <li> with id='pt-createaccount' )
    	WebDriverWait(browser, timeout).until(EC.visibility_of_element_located((By.XPATH, "//li[@id='pt-createaccount']")))
    except TimeoutException:
    	print("This page takes too long to load-- try again?")
    	browser.quit()
    #
    ##
    ###

    ### scraping (mostly) Faves/Likes/Neutral/Dislikes/Hates info-- use faces as guides for table boundaries
    results = browser.find_elements_by_xpath("//a[@class='image']")
    result_s = [x.get_attribute('href') for x in results]
    for result_s in zip(result_s):
        print(result_s)
    print(f"\n = = E N D {person} D A T A = =\n")
