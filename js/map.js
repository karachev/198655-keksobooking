'use strict';

/** Переменные */
var ADVT_COUNT = 8;
var USER_ID = ['01', '02', '03', '04', '05', '06', '07', '08'];
var TITLES = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var TYPE = ['flat', 'house', 'bungalo'];
var TYPE_RUS = {'flat': 'Квартира', 'house': 'Дом', 'bungalo': 'Бунгало'};
var CHECKIN = [
  '12:00',
  '13:00',
  '14:00'
];
var FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
/**
* Получение уникального номера
* @param {string} array - массив объектов
* @return {string} newArray - уникальный элемент из массива
*/
function getRandomUniqueItem(array) {
  var newArray = getRefreshArray(array);
  return newArray.splice(getRandomNumber(0, newArray.length - 1), 1);
}
/**
* Перемешивание массива объектов
* @param {string} array - массив объектов
* @return {string} array - перемешанный массив
*/
function getRefreshArray(array) {
  var m = array.length;
  var t;
  var i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}
/**
* Получение случайного номера
* @param {string} array - массив объектов
* @return {string} array - случайный элемент из массива
*/
function getRandomNumber(array) {
  return array[Math.floor(Math.random() * array.length)];
}
/**
* Получение случайного значения в отрезке
* @param {number} minValue - минимальное значение из отрезка
* @param {number} maxValue - максимальное значение из отрезка
* @return {number} случайное значение из данного отрезка
*/
function getRandomOfSet(minValue, maxValue) {
  return Math.floor(Math.random() * (maxValue - minValue)) + minValue;
}
/**
*Создание и присваивание уникального преимущества
* @return {string} positions - уникальное преимущество
*/
function createFeatures() {
  var someFeatures = FEATURES.slice(0);
  var positions = [];
  var rand = getRandomOfSet(0, FEATURES.length - 1);
  for (var i = 0; i <= rand; i++) {
    positions[i] = getRandomUniqueItem(someFeatures)[0];
  }
  return positions;
}
/**
* Запись price с учетом разрядов
* @param {number} minValue - минимальное значение из отрезка
* @param {number} maxValue - максимальное значение из отрезка
* @return {string} priceByLevel - цена с учетом разрядов
*/
function getPriceByLevel(minValue, maxValue) {
  var priceByLevel = getRandomOfSet(minValue, maxValue);
  return priceByLevel.toLocaleString('ru');
}
/**
* Создание объявления
* @return {string} advt - созданный объект объявление
*/
function createAdv() {
  var locationX = getRandomOfSet(300, 600);
  var locationY = getRandomOfSet(100, 400);
  var advt = {
    'author': {
      'avatar': 'img/avatars/user' + getRandomUniqueItem(USER_ID) + '.png'
    },

    'offer': {
      'title': getRandomUniqueItem(TITLES).toString(),
      'address': locationX + ', ' + locationY,
      'price': getPriceByLevel(1000, 1000000),
      'type': getRandomNumber(TYPE),
      'rooms': getRandomOfSet(1, 5),
      'guests': getRandomOfSet(1, 10),
      'checkin': getRandomNumber(CHECKIN),
      'checkout': getRandomNumber(CHECKIN),
      'features': createFeatures(),
      'description': '',
      'photos': []
    },
    'location': {
      'x': locationX,
      'y': locationY
    }
  };

  return advt;
}
/**
* Добавление созданных объектов в массив
* @return {string} advtList - массив объектов
*/
function createAdvtList() {
  var advtList = [];
  for (var i = 0; i < ADVT_COUNT; i++) {
    advtList.push(createAdv());
  }
  return advtList;
}
/**
* Создаем pin
* @param {string} advt - объект объявление
* @param {number} stage - номер объявления при нанесение
* @return {object} pin - блок на карте
*/
function createPin(advt, stage) {
  var pin = document.createElement('div');
  var img = document.createElement('img');

  if (stage === 0) {
    pin.className = 'pin pin--active';
    pinActive = pin;
  } else {
    pin.className = 'pin';
  }

  pin.style.left = advt.location.x + 'px';
  pin.style.top = advt.location.y + 'px';

  img.className = 'rounded';
  img.width = 40;
  img.height = 40;
  img.src = advt.author.avatar;

  pin.appendChild(img); /** Добавляю img в текущий div */
  pin.setAttribute('tabindex', 0);

  return pin;
}
/**
* Отрисовка в DOM-блок
* @param {string} advt - объект объявление
*/
function renderPin(advt) {
  var pin = document.querySelector('.tokyo__pin-map');
  var fragment = document.createDocumentFragment();

  advt.forEach(function (value, index) {
    fragment.appendChild(createPin(value, index));
  });

  pin.appendChild(fragment);
}
/**
* Добавление на карту
* @param {string} advtItem - один из элементов массива объектов
*/
function createOfferCard(advtItem) {
  var lodgeTemplate = document.querySelector('#lodge-template').content;
  var lodgeItem = lodgeTemplate.cloneNode(true);
  var lodgeTitle = lodgeItem.querySelector('.lodge__title');
  var lodgeAddress = lodgeItem.querySelector('.lodge__address');
  var lodgePrice = lodgeItem.querySelector('.lodge__price');
  var lodgeType = lodgeItem.querySelector('.lodge__type');
  var lodgeRooms = lodgeItem.querySelector('.lodge__rooms-and-guests');
  var lodgeCheck = lodgeItem.querySelector('.lodge__checkin-time');
  var dialog = document.querySelector('.dialog');
  var dialogPanel = dialog.querySelector('.dialog__panel');
  /** Задаем шаблону значения */
  lodgeTitle.textContent = advtItem.offer.title;
  lodgeAddress.textContent = advtItem.offer.address;
  lodgePrice.textContent = advtItem.offer.price + '\u20BD/ночь';
  lodgeType.textContent = TYPE_RUS[advtItem.offer.type];
  lodgeRooms.textContent = 'Для ' + advtItem.offer.guests + ' гостей в ' + advtItem.offer.rooms + ' комнатах';
  lodgeCheck.textContent = 'Заезд после ' + advtItem.offer.checkin + ', выезд до ' + advtItem.offer.checkout;

  var advtItemFeatures = advtItem.offer.features;
  advtItemFeatures.forEach(function (value) {
    var span = document.createElement('span');
    span.className = 'feature__image feature__image--' + value;
    lodgeItem.querySelector('.lodge__features').appendChild(span);
  });

  lodgeItem.querySelector('.lodge__description').textContent = advtItem.offer.description;
  document.querySelector('.dialog__title img').src = advtItem.author.avatar;

  dialog.replaceChild(lodgeItem, dialogPanel);
}

var listOfAdvt = createAdvtList(ADVT_COUNT);
renderPin(listOfAdvt);
createOfferCard(listOfAdvt[0]);

// MODULE4-TASK1
var pinMap = document.querySelector('.tokyo__pin-map');
var selectedPin;
var dialogWindow = document.querySelector('.dialog');
var dialogClose = document.querySelector('.dialog__close');
var pinElements = pinMap.querySelectorAll('.pin');
var pinActive = document.querySelector('.pin--active');
/**
* Ловим клик на элементе 'pin'
* @param {Objects} event - событие
*/
pinMap.onclick = function (event) {
  var target = event.target;
  // цикл двигается вверх от target к родителям до table
  while (target !== pinMap) {
    if (target.className === 'pin') {
      // нашли элемент, который нас интересует!
      getPinActive(target);
      return;
    }
    target = target.parentNode;
  }
};
/**
* Добавляем текущему элементу класс pin--active
* @param {DocumentFragment} node - узел
*/
function getPinActive(node) {
  if (selectedPin) {
    selectedPin.classList.remove('pin--active');
  }
  if (pinActive) {
    pinActive.classList.remove('pin--active');
  }
  selectedPin = node;
  selectedPin.classList.add('pin--active');
  getActiveNumber();
}

/**
* Вызываем карточку с описанием активного элемента
*/
function getActiveNumber() {
  for (var i = 0; i < pinElements.length; i++) {
    if (pinElements[i].className === 'pin pin--active') {
      createOfferCard(listOfAdvt[i - 1]);
      dialogWindow.style.display = 'block';
    }
  }
}

dialogClose.addEventListener('click', function () {
  dialogWindow.style.display = 'none';
});
