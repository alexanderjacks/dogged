// GOAL OF THIS SOFTWARE: print image name & etc info in Terminal, then download each image object as a png
// please, b4 use: ```npm i -S axios cheerio puppeteer```
// reuse & recycle & have a nice day

// headless browser
const axios = require(`axios`)
const url1 = `https://finalfantasy.fandom.com/wiki/Final_Fantasy_Tactics_A2:_Grimoire_of_the_Rift_weapons/Edged_weapons`
const url2 = `https://finalfantasy.fandom.com/wiki/Final_Fantasy_Tactics_A2:_Grimoire_of_the_Rift_weapons/Bludgeoning_weapons`
const url3 = `https://finalfantasy.fandom.com/wiki/Final_Fantasy_Tactics_A2:_Grimoire_of_the_Rift_weapons/Ranged_weapons`

// grab 1st url content, display in console; axios knows '.data()'
// is 'response' built in to node? wherein?
axios(url1)
  .then(response => {
    const content = response.data
    console.log(content)
  })
  .catch(console.error)
