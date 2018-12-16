const puppeteer = require('puppeteer');
const fs = require('fs');

class Product {
    constructor(title) {
        this.title = title;
    }
}

(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('https://www.nandos.co.uk/food/menu', {waitUntil: 'networkidle2'});

    var $$rmitems = await page.$$(".rm-item");

    var result = [];

    for (i in $$rmitems)
    {
        const $title = await $$rmitems[i].$(".rm-item__title");
        const title = await page.evaluate(el => el.innerText, $title);

        result.push(new Product(title))

        var $showInformation = await $$rmitems[i].$(".show-information");
        await $showInformation.click();
    }

    await browser.close();

    fs.writeFileSync("products.json", JSON.stringify(result, null, 4));
})();

