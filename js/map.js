'use strict';

// Переменные
var advertisementCount = 8;
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

var titles = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
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

// уникальный номер
var getRandomUniqueItem = function (array) {
  return array.splice(getRandomNumber(0, array.length - 1), 1);
};

function getRandomNumber(array) {
  var randomNumber = array[Math.floor(Math.random() * array.length)];
  return randomNumber;
}

function getRandomOfSet(minValue, maxValue) {
  var randomNumber = Math.floor(Math.random() * (maxValue - minValue)) + minValue;
  return randomNumber;
}

var createFeatures = function () {
  var someFeatures = features.slice(0);
  var positions = [];
  var rand = getRandomOfSet(0, features.length - 1);
  for (var i = 0; i <= rand; i++) {
    positions[i] = getRandomUniqueItem(someFeatures)[0];
  }
  return positions;
};


function createAdvertesement() {
  var advertisement = { // объявление
    "author": {
      "avatar": "img/avatars/user" + getRandomNumber(userID) + ".png",
    },

    "offer": {
      "title": getRandomUniqueItem(titles),
      "address": getRandomOfSet(300, 600) + ", " + getRandomOfSet(100, 400),
      "price": getRandomOfSet(1000, 10000000),
      "type": getRandomNumber(type),
      "rooms": getRandomOfSet(1, 5),
      "guests": getRandomOfSet(1, 10),
      "checkin": getRandomNumber(checkin, 3),
      "checkout": getRandomNumber(checkout),
      "features": createFeatures,
      "description": '',
      "photos": []
    },
    "location": {
      "x": getRandomOfSet(300, 600),
      "y": getRandomOfSet(100, 400)
    }
  }

  return advertisement;
};

var createAdvertsList = function (avdertsCount) {
  var advertsList = [];
  for (var i = 0; i < avdertsCount; i++) {
    advertsList.push(createAdvertesement());
  }
  return advertsList;
};

// Создаем pin
function createPin(advertisement) {
  var pin = document.createElement('div');
  var img = document.createElement('img');

  pin.className = 'pin';
  pin.style.left = advertisement.location.x + 'px';
  pin.style.top = advertisement.location.y + 'px';

  img.className = 'rounded';
  img.width = 40;
  img.height = 40;
  img.src = advertisement.author.avatar;
  pin.appendChild(img);

  return pin;
};

// отрисовка в DOM-блок
function renderPin(advertisement) {
  var pin = document.querySelector('.tokyo__pin-map');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < advertisement.length; i++) {
    fragment.appendChild(createPin(advertisement[i]));
  }
  pin.appendChild(fragment);
};

// Добавление на карту
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

var listOfAdvertisement = createAdvertsList(advertisementCount);
renderPin(listOfAdvertisement);
getOnMap(listOfAdvertisement[0]);
