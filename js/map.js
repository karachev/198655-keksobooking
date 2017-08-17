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
// var description = "";
// var photos = [];

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
      "avatar": "img/avatars/user" + getRandomNumber(userID, 8) + ".png",
    },
    "offer": {
      "title": title[i],
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

// Создаем pin
function createPin(advertisement) {
  var pin = document.createElement('div');
  var img = document.createElement('img');

  pin.className = 'pin';
  pin.style.left = advertisement.location.x;
  pin.style.top = advertisement.location.y;

  img.className = 'rounded';
  img.width = 40;
  img.height = 40;
  img.src = advertisement.author.avatar;

  return pin;
};

// отрисовка в DOM-блок
function renderPin(advertisement) {
  var pin = document.querySelector('.tokyo__pin-map');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < advertisement; i++) {
    fragment.appendChild(createPin(advertisement[i]));
  }
  pin.appendChild(fragment);
};


function getOnMap (advertisementItem) {
  var lodgeTemplate = document.querySelector('#lodge-template').content;
  var lodgeItem = lodgeTemplate.cloneNode(true);
  var lodgeTitle = lodgeItem.querySelector('.lodge__title');
  var lodgeAddress = lodgeItem.querySelector('.lodge__address');
  var lodgePrice = lodgeItem.querySelector('.lodge__price');
  var lodgeType = lodgeItem.querySelector('.lodge__type');
  var lodgeRooms = lodgeItem.querySelector('.lodge__rooms-and-guests');
  var lodgeCheck = lodgeItem.querySelector('.lodge__checkin-time');
  var dialog = document.querySelector('.dialog');
  var dialogPanel = document.querySelector('.dialog__panel');

  lodgeTitle.textContent = advertisementItem.offer.title;
  lodgeAddress.textContent = advertisementItem.offer.address;
  lodgePrice.innerHTML = advertisementItem.offer.price + ' &#x20bd;/ночь';
  lodgeType.textContent = type[advertisementItem.offer.type];
  lodgeRooms.textContent = 'Для ' + advertisementItem.offer.guests + ' гостей в ' + advertisementItem.offer.rooms + ' комнатах';
  lodgeCheck.textContent = 'Заезд после ' + advertisementItem.offer.checkin + ', выезд до ' + advertisementItem.offer.checkout;

  for (var i = 0; i < advertisementItem.offer.features.length; i++) {
    var span = document.createElement('span');
    span.className = 'feature__image feature__image--' + advertisementItem.offer.features[i];
    lodgeItem.querySelector('.lodge__features').appendChild(span);
  }

  lodgeItem.querySelector('.lodge__description').textContent = advertisementItem.offer.description;
  document.querySelector('.dialog__title img').src = advertisementItem.author.avatar;

  dialog.replaceChild(lodgeItem, dialogPanel);

};

renderPin(listOfAdvertisement);
getOnMap(listOfAdvertisement[0]);
