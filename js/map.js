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
var ESCAPE_KEY_CODE = 27;
var ENTER_KEY_CODE = 13;
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
  if (isEnterPressed(event) || isClicked(event)) {
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
  if (isEscapePressed(event) || isClicked(event)) {
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
  if (isEscapePressed(event)) {
    dialogWindow.style.display = 'none';
    selectedPin.classList.remove('pin--active');
  }
}
/**
* Событие по нажатию на ESC
* @param {Objects} event - событие
* @return {boolean} event - было ли именно такое событие
*/
function isEscapePressed(event) {
  return event && event.keyCode === ESCAPE_KEY_CODE;
}
/**
* Событие по нажатию на ENTER
* @param {Objects} event - событие
* @return {boolean} event - было ли именно такое событие
*/
function isEnterPressed(event) {
  return event && event.keyCode === ENTER_KEY_CODE;
}
/**
* Событие по нажатию мыши
* @param {Objects} event - событие
* @return {boolean} event - было ли именно такое событие
*/
function isClicked(event) {
  return event.type === 'click';
}

dialogClose.addEventListener('click', onCloseDialog);
dialogClose.addEventListener('keydown', onCloseDialog);
pinMap.addEventListener('click', onOpenDialog);
pinMap.addEventListener('keydown', onOpenDialog);

/**
* Валидация формы
*/
function checkForm() {
  var noticeForm = document.querySelector('.notice__form');
  var title = noticeForm.querySelector('#title');
  var address = noticeForm.querySelector('#address');
  var type = noticeForm.querySelector('#type');
  var price = noticeForm.querySelector('#price');
  var timeIn = noticeForm.querySelector('#timein');
  var timeOut = noticeForm.querySelector('#timeout');
  var roomNumber = noticeForm.querySelector('#room_number');
  var capacity = noticeForm.querySelector('#capacity');
  var buttonForm = noticeForm.querySelector('.form__submit');

  var TITLE_MIN_LENGTH = 30;
  var TITLE_MAX_LENGTH = 100;
  var PRICE_MIN = 0;
  var PRICE_MAX = 1000000;
  var PRICE_BUNGALO_MIN = 0;
  var PRICE_FLAT_MIN = 1000;
  var PRICE_HOUSE_MIN = 5000;
  var PRICE_PALACE_MIN = 10000;

  address.setAttribute('required', 'required');
  title.setAttribute('required', 'required');
  title.setAttribute('min', TITLE_MIN_LENGTH);
  title.setAttribute('max', TITLE_MAX_LENGTH);
  price.setAttribute('required', 'required');
  price.setAttribute('min', PRICE_MIN);
  price.setAttribute('max', PRICE_MAX);

  /**
  * Очистка всех значений в форме
  */
  function clearForm() {
    var description = noticeForm.querySelector('#description');

    title.value = '';
    type.value = 'flat';
    price.value = '1000';
    price.max = PRICE_MAX;
    price.min = PRICE_MIN;
    roomNumber.value = 1;
    capacity.value = 1;
    description.value = '';
    address.value = '';
  }

  /**
  * Синхронизация времени въезда и времни отъезда
  * @param {Objects} event - событие
  */
  function onTimeChange(event) {
    if (event.target.id === 'timein') {
      timeOut.value = timeIn.value;
    } else if (event.target.id === 'timeout') {
      timeIn.value = timeOut.value;
    }
  }

  /**
  * Валидация типов жилья и интервала стоимости
  */
  function onTypeChange() {
    switch (type.value) {
      case 'bungalo':
        price.min = PRICE_BUNGALO_MIN;
        price.max = PRICE_MAX;
        price.value = price.min;
        break;
      case 'flat':
        price.min = PRICE_FLAT_MIN;
        price.max = PRICE_MAX;
        price.value = price.min;
        break;
      case 'house':
        price.min = PRICE_HOUSE_MIN;
        price.max = PRICE_MAX;
        price.value = price.min;
        break;
      case 'palace':
        price.min = PRICE_PALACE_MIN;
        price.max = PRICE_MAX;
        price.value = price.min;
        break;
    }
  }

  /**
  * Предложение жилья по стоимости
  */
  function onPriceChange() {
    if (price.value < PRICE_FLAT_MIN) {
      type.value = 'bungalo';
    } else if (price.value < PRICE_HOUSE_MIN) {
      type.value = 'flat';
    } else if (price.value < PRICE_PALACE_MIN) {
      type.value = 'house';
    } else {
      type.value = 'palace';
    }
  }

  /**
  * Связь количества гостей и количеством комнат
  * @param {Objects} event - событие
  */
  function onCapacityChange(event) {
    if (event.target.id === 'room_number') {
      if (roomNumber.value === '1') {
        capacity.value = '1';
        for (var i = 0; i < capacity.options.length; i++) {
          if (capacity.options[i].value !== '1') {
            capacity.options[i].disabled = true;
          } else {
            capacity.options[i].disabled = false;
          }
        }

        // Почему-то forEach  не работает
        // capacity.forEach(function (value, index) {
        //   if (value1.value !== '1') {
        //     value.options[index].disabled = true;
        //   } else {
        //     value.options[index].disabled = false;
        //   }
        // });

      } else if (roomNumber.value === '2') {
        for (i = 0; i < capacity.options.length; i++) {
          if (capacity.options[i].value !== '1' && capacity.options[i].value !== '2') {
            capacity.options[i].disabled = true;
          } else {
            capacity.options[i].disabled = false;
          }
        }
      } else if (roomNumber.value === '3') {
        for (i = 0; i < capacity.options.length; i++) {
          if (capacity.options[i].value !== '1' && capacity.options[i].value !== '2' && capacity.options[i].value !== '3') {
            capacity.options[i].disabled = true;
          } else {
            capacity.options[i].disabled = false;
          }
        }
      } else {
        capacity.value = '0';
        for (i = 0; i < capacity.options.length; i++) {
          if (capacity.options[i].value === '0') {
            capacity.options[i].disabled = false;
            capacity.options[i].selected = true;
          } else {
            capacity.options[i].disabled = true;
          }
        }
      }
    }
  }

  /**
  * Рисую рамку, если значение не валидно
  * @param {Objects} checkedField  - првоеряемое поле
  * @return {boolean} event - проходит ли валидацию
  */
  function checkValid(checkedField) {
    if (checkedField.validity.valid) {
      checkedField.style.border = '1px solid #d9d9d3';
      return true;
    } else {
      checkedField.style.boxShadow = 'none';
      checkedField.style.border = '2px solid red';
      return false;
    }
  }

  /**
  * Нажатие на кнопку и валидация полей
  * @param {Objects} event - событие
  */
  function onButtonForm(event) {
    var validTitle = checkValid(title);
    var validPrice = checkValid(price);
    var validAddress = checkValid(address);
    if (validTitle && validPrice && validAddress) {
      event.preventDefault();
      // noticeForm.action = get_action();
      HTMLFormElement.prototype.submit.call(noticeForm);
      clearForm();
    }
  }

  timeIn.addEventListener('change', onTimeChange);
  timeOut.addEventListener('change', onTimeChange);
  type.addEventListener('change', onTypeChange);
  price.addEventListener('change', onPriceChange);
  roomNumber.addEventListener('change', onCapacityChange);
  capacity.addEventListener('change', onCapacityChange);
  buttonForm.addEventListener('click', onButtonForm);
}

checkForm();
