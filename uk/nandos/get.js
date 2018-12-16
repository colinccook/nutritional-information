const puppeteer = require('puppeteer');
const fs = require('fs');

class Product {
    constructor(title) {
        this.title = title;
    }
    addChildProduct(product) {
        if (!this.products)
            this.products = [];

        this.products.push(product);
    }
    setKcal(kcal) {
        this.kcal = kcal;
    }
}

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://www.nandos.co.uk/food/menu', { waitUntil: 'networkidle2' });

    var $$rmitems = await page.$$(".rm-item");

    var result = [];

    for (i in $$rmitems) {
        const $title = await $$rmitems[i].$(".rm-item__title");
        const title = await page.evaluate(el => el.innerText, $title);

        const product = new Product(title);

        const $showInformation = await $$rmitems[i].$(".show-information");
        await $showInformation.click();

        const $$sauces = await $$rmitems[i].$$(".dietary-info__sauce");
        for (s in $$sauces) {
            const sauceTitle = await page.evaluate(el => el.innerText, $$sauces[s])
            const subproduct = new Product(sauceTitle);

            $$sauces[s].click();

            //const $kcal = await page.$('.info-listing__value+.info-listing__copy[attribute^="Energy (kcal)"]');
            const $kcal = await page.$('.info-listing__value');
            const kcal = await page.evaluate(el => el.innerText, $kcal)

            subproduct.setKcal(kcal);

            product.addChildProduct(subproduct);


        }

        result.push(product);
    }

    await browser.close();

    fs.writeFileSync("products.json", JSON.stringify(result, null, 4));
})();