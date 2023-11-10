const { scrapeWebPage } = require('./web-scraper');

async function result(){
    const res =  await scrapeWebPage('https://example.com');
    console.log(res)
}

result()
