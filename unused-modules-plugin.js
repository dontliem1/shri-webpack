// TODO
// Совершаем обход по файловой системе, ищем модули и добавляем относительные пути в Массив
// https://stackoverflow.com/questions/33218753/how-to-see-which-files-are-included-in-a-webpack-build
// Запускаем webpack --json > unused.json
// Совершаем по нему обход
// Удаляем каждый перечисленный модуль из Массива
// Заменяем содержимое unused.json на Массив