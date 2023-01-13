from selenium import webdriver

import json

with open('./config.json') as json_file:
  data = json.load(json_file)

options = webdriver.ChromeOptions()
options.binary_location='/Applications/Google Chrome.app' # Chrome path
chrome_driver_binary = data.index.chrome_driver_location # chromedriver path
driver = webdriver.Chrome(chrome_driver_binary,chrome_options=options)
driver.maximize_window()
driver.get("http://www.baidu.com")
