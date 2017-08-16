'use strict';

// Переменные

var userID = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08"
];

var avatar = "img/avatars/user{{" + getRandomID(userID) + "}}";
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

var address = "{{" + location_x + "}}, {{" + location_y + "}}";

var price = getRandomOfSet(1000, 10000000);
var type = [
  "flat",
  "house",
  "bungalo"
];
var rooms = getRandomOfSet(1, 5);
var guests = getRandomOfSet(1, 10);
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
var location_x = getRandomOfSet(300, 600);
var location_y = getRandomOfSet(100, 400);

function getRandomID(userID) {
  var randomID = userID[Math.floor(Math.random() * 8)];
  return randomID;
}

function getRandomOfSet(minValue, maxValue) {
  var randomNumber = Math.floor(Math.random() * (maxValue - minValue)) + minValue;
  return randomNumber;
}


// ====================

var objects = 8;






