# Unused Modules Plugin

_Плагин сделан в рамках домашней работы в ШРИ 2021._

Плагин [UnusedModulesPlugin](unused-modules-plugin.js) выводит в файл список путей к неиспользованным в сборке модулям относительно корня проекта.

Опции:
- `pattern`: string — Маска для поиска
- `ignore`: array — Массив с масками для исключений
- `modulesSearchPath`: string — Путь для поиска модулей  
- `filePath`: string — Имя файла для вывода 
- `root`: string — Путь к корню проекта
- `enableLogs`: boolean — Включить вывод в консоль