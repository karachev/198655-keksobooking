// Переменные
var author = "";
var objects = 8;
var title = [
  "Большая уютная квартира",
  "Маленькая неуютная квартира",
  "Огромный прекрасный дворец",
  "Маленький ужасный дворец",
  "Красивый гостевой домик",
  "Некрасивый негостеприимный домик",
  "Уютное бунгало далеко от моря",
  "Неуютное бунгало по колено в воде"
];

//     "avatar": строка, адрес изображения вида img/avatars/user{{xx}}.png, где xx это число от 1 до 8 с ведущим нулем.
//     Например 01, 02 и т. д. Адреса изображений не повторяются

var type = [
  "flat",
  "house",
  "bungalo"
];

var checkin = [
  "12:00",
  "13:00",
  "14:00"
];

var checkout = [
  "12:00",
  "13:00",
  "14:00"
];

var price = Math.floor(Math.random() * (10000000 - 1000)) + 1000;
var rooms = Math.floor(Math.random() * 5) + 1;
var guests = Math.floor(Math.random() * 10) + 1;

var features = [
  "wifi",
  "dishwasher",
  "parking",
  "washer",
  "elevator",
  "conditioner"
];

var description = "";
var photos = [];

var location_x = Math.floor(Math.random() * 600) + 300;
var location_y = Math.floor(Math.random() * 400) + 100;

// {
//   "author": {
//     "avatar": строка, адрес изображения вида img/avatars/user{{xx}}.png, где xx это число от 1 до 8 с ведущим нулем.
//     Например 01, 02 и т. д. Адреса изображений не повторяются
//   },

//   "offer": {
//     "address": строка, адрес предложения, представляет собой запись вида "{{location.x}}, {{location.y}}"
//   },
// }
