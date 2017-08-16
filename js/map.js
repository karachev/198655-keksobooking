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

function getRandomNumber(array, number) {
  var randomNumber = array[Math.floor(Math.random() * number)];
  return randomNumber;
}

function getRandomOfSet(minValue, maxValue) {
  var randomNumber = Math.floor(Math.random() * (maxValue - minValue)) + minValue;
  return randomNumber;
}


// Массив для 8 объявлений
var listOfAdvertisement = [];

for (var i = 0; i < 8; i++) {


  var advertisement = { // объявление
    "author": {
      "avatar": "img/avatars/user{{" + getRandomNumber(userID, 8) + "}}",
    },
    "offer": {
      "title": getRandomNumber(title, 8), //нужно придумать как его удалять
      "address": getRandomOfSet(300, 600) + ", " + getRandomOfSet(100, 400),
      "price": getRandomOfSet(1000, 10000000),
      "type": getRandomNumber(type, 3),
      "rooms": getRandomOfSet(1, 5),
      "guests": getRandomOfSet(1, 10),
      "checkin": getRandomNumber(checkin, 3),
      "checkout": getRandomNumber(checkout, 3),
      "features": getRandomNumber(features, 6),
      "description": '',
      "photos": []
    },
    "location": {
      "x": getRandomOfSet(300, 600),
      "y": getRandomOfSet(100, 400)
    }
  }


  listOfAdvertisement[i] = advertisement;
}
