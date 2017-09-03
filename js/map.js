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
*Создание и присваивание уникального преимущества
* @return {string} positions - уникальное преимущество
*/
function createFeatures() {
  var someFeatures = FEATURES.slice(0);
  var positions = [];
  var rand = window.utilSet.getRandomOfSet(0, FEATURES.length - 1);
  for (var i = 0; i <= rand; i++) {
    positions[i] = window.utilSet.getRandomUniqueItem(someFeatures)[0];
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
  var priceByLevel = window.utilSet.getRandomOfSet(minValue, maxValue);
  return priceByLevel.toLocaleString('ru');
}
/**
* Создание объявления
* @return {string} advt - созданный объект объявление
*/
function createAdv() {
  var locationX = window.utilSet.getRandomOfSet(300, 600);
  var locationY = window.utilSet.getRandomOfSet(100, 400);
  var advt = {
    'author': {
      'avatar': 'img/avatars/user' + window.utilSet.getRandomUniqueItem(USER_ID) + '.png'
    },

    'offer': {
      'title': window.utilSet.getRandomUniqueItem(TITLES).toString(),
      'address': locationX + ', ' + locationY,
      'price': getPriceByLevel(1000, 1000000),
      'type': window.utilSet.getRandomNumber(TYPE),
      'rooms': window.utilSet.getRandomOfSet(1, 5),
      'guests': window.utilSet.getRandomOfSet(1, 10),
      'checkin': window.utilSet.getRandomNumber(CHECKIN),
      'checkout': window.utilSet.getRandomNumber(CHECKIN),
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

  advt.forEach(function (value) {
    fragment.appendChild(createPin(value));
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
  document.addEventListener('keydown', onCloseDialogEsc);
}

var listOfAdvt = createAdvtList(ADVT_COUNT);
renderPin(listOfAdvt);

// MODULE4-TASK1
var pinMap = document.querySelector('.tokyo__pin-map');
var selectedPin;
var dialogWindow = document.querySelector('.dialog');
var dialogClose = document.querySelector('.dialog__close');
var pinElements = pinMap.querySelectorAll('.pin');
var pinActive = document.querySelector('.pin--active');
dialogWindow.style.display = 'none';
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
* Вызываем объявление активного элемента
*/
function getActiveNumber() {
  pinElements.forEach(function (value, index) {
    if (value.classList.contains('pin--active')) {
      createOfferCard(listOfAdvt[index - 1]);
      dialogWindow.style.display = 'block';
    }
  });
}
/**
* Открываем объявление
* @param {Objects} event - событие
*/
function onOpenDialog() {
  if (window.utilSet.isEnterPressed(event) || window.utilSet.isClicked(event)) {
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
  }
}
/**
* Закрытие объявления
*/
function onCloseDialog() {
  if (window.utilSet.isEscapePressed(event) || window.utilSet.isClicked(event)) {
    dialogWindow.style.display = 'none';
    pinActive.classList.remove('pin--active');
    selectedPin.classList.remove('pin--active');
  }
}
/**
* Закрытие объявления в любой момент по ESC
* @param {Objects} event - событие
*/
function onCloseDialogEsc(event) {
  if (window.utilSet.isEscapePressed(event)) {
    dialogWindow.style.display = 'none';
    selectedPin.classList.remove('pin--active');
  }
}

dialogClose.addEventListener('click', onCloseDialog);
dialogClose.addEventListener('keydown', onCloseDialog);
pinMap.addEventListener('click', onOpenDialog);
pinMap.addEventListener('keydown', onOpenDialog);
