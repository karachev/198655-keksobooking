'use strict';

// pin.js — модуль для отрисовки пина и взаимодействия с ним

window.pinSet = (function () {
  var pinMap = document.querySelector('.tokyo__pin-map');
  // var pin = document.querySelector('.tokyo__pin-map');
  var selectedPin;
  var dialogWindow = document.querySelector('.dialog');
  var dialogClose = document.querySelector('.dialog__close');
  var pinElements = pinMap.querySelectorAll('.pin');
  var pinActive = document.querySelector('.pin--active');
  dialogWindow.style.display = 'none';
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


  // function renderPin(advt) {
  //   var pin = document.querySelector('.tokyo__pin-map');
  //   var fragment = document.createDocumentFragment();

  //   advt.forEach(function (value) {
  //     fragment.appendChild(createPin(value));
  //   });

  //   pin.appendChild(fragment);
  // }

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
        window.cardSet.createOfferCard(listOfAdvt[index - 1]);
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


  // renderPin(window.dataSet.listOfAdvt);
   /**
  * Отрисовка в DOM-блок
  * @param {string} advt - объект объявление
  */
  return function () {
    var fragment = document.createDocumentFragment();
    var listOfAdvt = window.dataSet();

    listOfAdvt.forEach(function (value) {
      fragment.appendChild(createPin(value));
    });

    pinMap.appendChild(fragment);
    pinMap.addEventListener('click', onOpenDialog);
    pinMap.addEventListener('keydown', onOpenDialog);
  };
})();
