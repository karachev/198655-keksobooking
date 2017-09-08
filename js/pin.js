'use strict';

// pin.js — модуль для отрисовки пина и взаимодействия с ним

window.pin = (function () {
  var pinMap = document.querySelector('.tokyo__pin-map');
  var selectedPin;
  var dialogWindow = document.querySelector('.dialog');
  var dialogClose = document.querySelector('.dialog__close');
  var pinActive = document.querySelector('.pin--active');
  dialogWindow.style.display = 'none';
  var listOfAdvt = window.data();
  var PIN_WIDTH = 56;
  var PIN_HEIGHT = 75;
  /**
  * Создаем pin
  * @param {string} advt - объект объявление
  * @param {number} stage - номер объявления при нанесение
  * @return {object} pin - блок на карте
  */
  function createPin(advt) {
    var pin = document.createElement('div');
    pin.className = 'pin';
    pin.style.left = advt.location.x - PIN_WIDTH / 2 + 'px';
    pin.style.top = advt.location.y - PIN_HEIGHT + 'px';

    var img = document.createElement('img');
    img.className = 'rounded';
    img.width = 40;
    img.height = 40;
    img.src = advt.author.avatar;

    pin.appendChild(img);
    pin.setAttribute('tabindex', 0);

    return pin;
  }
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
    var pinElements = pinMap.querySelectorAll('.pin');
    pinElements.forEach(function (value, index) {
      if (value.classList.contains('pin--active')) {
        window.card.createOfferCard(listOfAdvt[index - 1]);
        dialogWindow.style.display = 'block';
      }
    });
  }
  /**
  * Открываем объявление
  * @param {Objects} event - событие
  */
  function onOpenDialog() {
    if (window.util.isEnterPressed(event) || window.util.isClicked(event)) {
      var target = event.target;
      while (target !== pinMap) {
        if (target.className === 'pin') {
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
    if (window.util.isEscapePressed(event) || window.util.isClicked(event)) {
      dialogWindow.style.display = 'none';
      pinActive.classList.remove('pin--active');
      selectedPin.classList.remove('pin--active');
    }
  }

  dialogClose.addEventListener('click', onCloseDialog);
  dialogClose.addEventListener('keydown', onCloseDialog);

  /**
  * Отрисовка в DOM-блок
  * @param {string} advt - объект объявление
  */
  return function () {
    var fragment = document.createDocumentFragment();
    listOfAdvt.forEach(function (value) {
      fragment.appendChild(createPin(value));
    });
    pinMap.appendChild(fragment);
    pinMap.addEventListener('click', onOpenDialog);
    pinMap.addEventListener('keydown', onOpenDialog);
  };
})();
