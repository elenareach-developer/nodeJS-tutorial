const { scrapeWebPage } = require('./web-scraper');
const axios = require('axios');
const cheerio = require('cheerio');

jest.mock('axios');

describe("Web scraper",()=>{
    it('should scrape webpage correctly', async () => {
        const mockHtml = `
          <html>
            <head>
              <title>Тестовая страница</title>
            </head>
            <body>
              <a href="https://example.com">Ссылка 1</a>
              <a href="https://example.org">Ссылка 2</a>
            </body>
          </html>
        `;
    
        axios.get.mockResolvedValue({ data: mockHtml, status: 200 });
        const $ = cheerio.load(mockHtml);
        const expectedTitle = 'Тестовая страница';
        const expectedLinks = [
        { text: 'Ссылка 1', href: 'https://example.com' },
        { text: 'Ссылка 2', href: 'https://example.org' },
        ];

        const result = await scrapeWebPage('https://example.com');

        expect(result.title).toBe(expectedTitle);
        expect(result.links).toEqual(expectedLinks);
    });
    it('should handle networ error', async()=>{
        axios.get.mockRejectedValue(new Error('HTTP Error'));
        const result = await scrapeWebPage('https://example.co');
        expect(result.error).toBeTruthy();
    })

})