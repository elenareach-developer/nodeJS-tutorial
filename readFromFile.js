const fs = require('fs');

function readFileAndDisplay(filePath) {
  // Используем асинхронное чтение файла
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Ошибка при чтении файла:', err);
      return;
    }
    console.log('Содержимое файла:');
    console.log(data);
  });
}

// Пример использования функции
const filePath = 'test.txt';
readFileAndDisplay(filePath);