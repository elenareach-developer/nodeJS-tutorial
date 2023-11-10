const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeWebPage(url) {
  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      const $ = cheerio.load(response.data);

      // Извлекаем заголовок страницы
      const pageTitle = $('title').text();

      // Извлекаем все ссылки на странице
      const links = [];
      $('a').each((index, element) => {
        const linkText = $(element).text();
        const linkHref = $(element).attr('href');
        links.push({ text: linkText, href: linkHref });
      });

      return { title: pageTitle, links };
    } else {
      return { error: 'HTTP Error' };
    }
  } catch (error) {
    return { error: error.message };
  }
}

module.exports = { scrapeWebPage };
