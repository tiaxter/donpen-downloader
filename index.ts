import puppeteer from 'puppeteer';

const URL = 'https://www.donki.com/en/';

const browser = await puppeteer.launch({
    headless: false,
});

const page = await browser.newPage();

await page.goto('https://www.donki.com/en/');

const countriesElements = await page.$$('.topMap__chip:has(.topMap__chip__gotochi)');

for (const countryElement of countriesElements) {
    // Retrieve mascotte country name and mascotte image url
    const countryNameElement = await countryElement.$('.topMap__chip__txt');
    const countryName = await (await countryNameElement.getProperty('textContent')).jsonValue();
    const imageElement = await countryElement.$('.topMap__chip__gotochi > img');
    const imageURL = await (await imageElement.getProperty('src')).jsonValue()
    // Download image
    const path = `./mascottes/${countryName.toLowerCase()}.png`;
    await Bun.write(path, await fetch(imageURL));
}

// Close browser
await browser.close();