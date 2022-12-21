const puppeteer = require('puppeteer');

async function scrapeBlumSanLeandro() {
    // Launch a new browser instance
    const browser = await puppeteer.launch({
        headless: false,
    });

    // Create a new page
    const page = await browser.newPage();

    // Navigate to the Blum dispensary page on Weedmaps
    await page.goto('https://weedmaps.com/dispensaries/blum-san-leandro?page=1&sortBy=max_price&sortOrder=desc');

    // Wait for the page to load
    await page.waitForSelector("#menu-tab-wrapper > ol > li:nth-child(1) > div:nth-child(2) > div > div > div");

    // Extract the data for each product
    const products = await page.evaluate(() => {
        // Find all of the menu items on the page
        const menuItems = Array.from(document.querySelectorAll('#menu-tab-wrapper > ol > li'));

        console.log('menu items', menuItems);
        // Extract the data for each product
        return menuItems.map((menuItem) => {

            // Extract the product brand
            const category = document.querySelector("#menu-tab-wrapper > ol > li:nth-child(1) > div:nth-child(2) > a > div > span:nth-child(1)").innerText;

            // Extract the product name
            const name = document.querySelector("#menu-tab-wrapper > ol > li:nth-child(1) > div:nth-child(2) > a > div > div").innerText;

            // Extract the product price
            const price = document.querySelector("#menu-tab-wrapper > ol > li:nth-child(1) > div:nth-child(2) > div > div > div").innerText;
            console.log("data",name,category,price);
            // Return the product data as an object
            return {
                name,
                category,
                price,

            };
        });
    });

    // Close the page and browser
    //await page.close();
    //await browser.close();

    // Return the extracted data
    return products;
}

scrapeBlumSanLeandro().then((products) => {
    console.log("products", products);
});
