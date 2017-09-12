'use strict';
// form.js — модуль, который работает с формой объявления

window.form = (function () {
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

    var MIN_PRICES = [
      PRICE_FLAT_MIN,
      PRICE_HOUSE_MIN,
      PRICE_BUNGALO_MIN,
      PRICE_PALACE_MIN
    ];

    var ROOMS_NUMBERS = [
      '1',
      '2',
      '3',
      '100'
    ];

    var CAPACITY_LIST = [
      [0],
      [1],
      [1, 2],
      [1, 2, 3]
    ];

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
    * @param {integer} fieldFirst - изменяемое поле
    * @param {integer} valueSecond - значение
    */
    function onTimeChange(fieldFirst, valueSecond) {
      fieldFirst.value = valueSecond;
    }

    /**
    * Валидация типов жилья и интервала стоимости
    * @param {integer} fieldFirst - изменяемое поле
    * @param {integer} valueSecond - значение
    */
    function onPriceChange(fieldFirst, valueSecond) {
      fieldFirst.min = valueSecond;
      onTimeChange(fieldFirst, valueSecond);
    }

    /**
    * Связь количества гостей и количеством комнат
    * @param {integer} fieldFirst - изменяемое поле
    * @param {integer} valueSecond - значение
    */
    function onCapacityChange(fieldFirst, valueSecond) {
      var optionsArray = Array.prototype.slice.call(fieldFirst.options);
      if (valueSecond[0] === 0) {
        fieldFirst.value = '1';
        optionsArray.forEach(function (val) {
          if (val.value !== '1') {
            val.disabled = true;
          } else {
            val.disabled = false;
            val.selected = true;
          }
        });
      } else if (valueSecond.length === 1) {
        optionsArray.forEach(function (val) {
          if (val.value !== '1' && val.value !== '2') {
            val.disabled = true;
          } else {
            val.disabled = false;
            val.selected = true;
          }
        });
      } else if (valueSecond.length === 2) {
        optionsArray.forEach(function (val) {
          if (val.value !== '1' && val.value !== '2' && val.value !== '3') {
            val.disabled = true;
          } else {
            val.disabled = false;
            val.selected = true;
          }
        });
      } else {
        fieldFirst.value = '0';
        optionsArray.forEach(function (val) {
          if (val.value === '0') {
            val.disabled = false;
            val.selected = true;
          } else {
            val.disabled = true;
          }
        });
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
        HTMLFormElement.prototype.submit.call(noticeForm);
        clearForm();
      }
    }

    var timeInChangeHandler = function (event) {
      window.synchronizeFields(event.target, timeOut, window.util.CHECKIN, window.util.CHECKIN, onTimeChange);
    };

    var timeOutChangeHandler = function (event) {
      window.synchronizeFields(event.target, timeIn, window.util.CHECKIN, window.util.CHECKIN, onTimeChange);
    };

    var typeChangeHandler = function (evt) {
      window.synchronizeFields(evt.target, price, window.util.TYPE, MIN_PRICES, onPriceChange);
    };

    var roomNumberChangeHandler = function (evt) {
      window.synchronizeFields(evt.target, capacity, ROOMS_NUMBERS, CAPACITY_LIST, onCapacityChange);
    };

    timeIn.addEventListener('change', timeInChangeHandler);
    timeOut.addEventListener('change', timeOutChangeHandler);
    type.addEventListener('change', typeChangeHandler);
    roomNumber.addEventListener('change', roomNumberChangeHandler);
    buttonForm.addEventListener('click', onButtonForm);
  }

  checkForm();
})();
