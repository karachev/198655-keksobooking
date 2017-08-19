'use strict';
// Переменные
var advtCount = 8;
var userID = ['01', '02, 03', '04', '05', '06', '07', '08'];
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
var type = ['flat', 'house', 'bungalo'];
var checkin = [
  '12:00',
  '13:00',
  '14:00'
];
var features = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

// получение уникального номера
function getRandomUniqueItem(array) {
  return array.splice(getRandomNumber(0, array.length - 1), 1);
}
// получение случайного номера
function getRandomNumber(array) {
  var randomNumber = array[Math.floor(Math.random() * array.length)];
  return randomNumber;
}
// получение случайного значения в отрезке
function getRandomOfSet(minValue, maxValue) {
  var randomNumber = Math.floor(Math.random() * (maxValue - minValue)) + minValue;
  return randomNumber;
}
// создание и присваивание уникального преимущества
function createFeatures() {
  var someFeatures = features.slice(0);
  var positions = [];
  var rand = getRandomOfSet(0, features.length - 1);
  for (var i = 0; i <= rand; i++) {
    positions[i] = getRandomUniqueItem(someFeatures)[0];
  }
  return positions;
}
// создание объявления
function createAdv() {
  var advt = { // объявление
    'author': {
      'avatar': 'img/avatars/user' + getRandomNumber(userID) + '.png',
    },

    'offer': {
      'title': getRandomUniqueItem(titles),
      'address': getRandomOfSet(300, 600) + ', ' + getRandomOfSet(100, 400),
      'price': getRandomOfSet(1000, 10000000),
      'type': getRandomNumber(type),
      'rooms': getRandomOfSet(1, 5),
      'guests': getRandomOfSet(1, 10),
      'checkin': getRandomNumber(checkin),
      'checkout': getRandomNumber(checkin),
      'features': createFeatures,
      'description': '',
      'photos': []
    },
    'location': {
      'x': getRandomOfSet(300, 600),
      'y': getRandomOfSet(100, 400)
    }
  };

  return advt;
}

// Добавление созданных объектов в массив
function createAdvtList(advtCount) {
  var advtList = [];
  for (var i = 0; i < advtCount; i++) {
    advtList.push(createAdv());
  }
  return advtList;
};

// Создаем pin
function createPin(advt) {
  var pin = document.createElement('div');
  var img = document.createElement('img');

  pin.className = 'pin';
  pin.style.left = advt.location.x + 'px';
  pin.style.top = advt.location.y + 'px';

  img.className = 'rounded';
  img.width = 40;
  img.height = 40;
  img.src = advt.author.avatar;

  pin.appendChild(img); //Добавляю img в текущий div

  return pin;
};

// отрисовка в DOM-блок
function renderPin(advt) {
  var pin = document.querySelector('.tokyo__pin-map');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < advt.length; i++) {
    fragment.appendChild(createPin(advt[i]));
  }
  pin.appendChild(fragment);
};

// Добавление на карту
function getOnMap (advtItem) {
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

  // Задаем шаблону значения
  lodgeTitle.textContent = advtItem.offer.title;
  lodgeAddress.textContent = advtItem.offer.address;
  lodgePrice.innerHTML = advtItem.offer.price + ' &#x20bd;/ночь';  //Использую inner для значка с рублем
  lodgeType.textContent = type[advtItem.offer.type];
  lodgeRooms.textContent = 'Для ' + advtItem.offer.guests + ' гостей в ' + advtItem.offer.rooms + ' комнатах';
  lodgeCheck.textContent = 'Заезд после ' + advtItem.offer.checkin + ', выезд до ' + advtItem.offer.checkout;

  for (var i = 0; i < advtItem.offer.features.length; i++) { // Почему-то не работает (?)
    var span = document.createElement('span');
    span.className = 'feature__image feature__image--' + advtItem.offer.features[i];
    lodgeItem.querySelector('.lodge__features').appendChild(span);
  }

  lodgeItem.querySelector('.lodge__description').textContent = advtItem.offer.description;
  document.querySelector('.dialog__title img').src = advtItem.author.avatar;

  dialog.replaceChild(lodgeItem, dialogPanel);

};

var listOfAdvt = createAdvtList(advtCount);
renderPin(listOfAdvt);
getOnMap(listOfAdvt[0]);
