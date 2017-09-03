'use strict';



var TYPE_RUS = {'flat': 'Квартира', 'house': 'Дом', 'bungalo': 'Бунгало'};


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

var listOfAdvt = window.utilData.createAdvtList(window.utilData.ADVT_COUNT);
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
