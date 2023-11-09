const axios = require('axios');
const cheerio = require('cheerio');

// URL веб-страницы, которую вы хотите скрепить
const url = 'https://habr.com/ru/articles/460661/';

// Выполняем HTTP-запрос к указанной веб-странице
axios.get(url)
  .then((response) => {
    if (response.status === 200) {
      // Используем Cheerio для парсинга HTML-кода
      const $ = cheerio.load(response.data);

      // Пример: извлекаем заголовок страницы
      const pageTitle = $('title').text();
      console.log(`Заголовок страницы: ${pageTitle}`);

      // Пример: извлекаем все ссылки на странице
      $('a').each((index, element) => {
        const linkText = $(element).text();
        const linkHref = $(element).attr('href');
        console.log(`Ссылка ${index + 1}: ${linkText} (${linkHref})`);
      });
    } else {
      console.error('Ошибка при получении данных с веб-страницы');
    }
  })
  .catch((error) => {
    console.error(`Произошла ошибка: ${error.message}`);
  });
