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
    function onTypeChange(fieldFirst, valueSecond) {
      switch (valueSecond) {
        case 'bungalo':
          fieldFirst.min = PRICE_BUNGALO_MIN;
          fieldFirst.max = PRICE_MAX;
          fieldFirst.value = price.min;
          break;
        case 'flat':
          fieldFirst.min = PRICE_FLAT_MIN;
          fieldFirst.max = PRICE_MAX;
          fieldFirst.value = price.min;
          break;
        case 'house':
          fieldFirst.min = PRICE_HOUSE_MIN;
          fieldFirst.max = PRICE_MAX;
          fieldFirst.value = price.min;
          break;
        case 'palace':
          fieldFirst.min = PRICE_PALACE_MIN;
          fieldFirst.max = PRICE_MAX;
          fieldFirst.value = price.min;
          break;
      }
    }

    /**
    * Предложение жилья по стоимости
    * @param {integer} fieldFirst - изменяемое поле
    * @param {integer} valueSecond - значение
    */
    function onPriceChange(fieldFirst, valueSecond) {
      if (valueSecond < PRICE_FLAT_MIN) {
        fieldFirst.value = 'bungalo';
      } else if (valueSecond < PRICE_HOUSE_MIN) {
        fieldFirst.value = 'flat';
      } else if (valueSecond < PRICE_PALACE_MIN) {
        fieldFirst.value = 'house';
      } else {
        fieldFirst.value = 'palace';
      }
    }

    /**
    * Связь количества гостей и количеством комнат
    * @param {integer} fieldFirst - изменяемое поле
    * @param {integer} valueSecond - значение
    */
    function onCapacityChange(fieldFirst, valueSecond) {
      var optionsArray = Array.prototype.slice.call(fieldFirst.options);
      if (valueSecond === '1') {
        fieldFirst.value = '1';
        optionsArray.forEach(function (val) {
          if (val.value !== '1') {
            val.disabled = true;
          } else {
            val.disabled = false;
            val.selected = true;
          }
        });
      } else if (valueSecond === '2') {
        optionsArray.forEach(function (val) {
          if (val.value !== '1' && val.value !== '2') {
            val.disabled = true;
          } else {
            val.disabled = false;
            val.selected = true;
          }
        });
      } else if (valueSecond === '3') {
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

    window.synchronizeFields(timeOut, timeIn, onTimeChange);
    window.synchronizeFields(timeIn, timeOut, onTimeChange);
    window.synchronizeFields(type, price, onTypeChange);
    window.synchronizeFields(price, type, onPriceChange);
    window.synchronizeFields(roomNumber, capacity, onCapacityChange);
    // window.synchronizeFields(capacity, roomNumber, onCapacityChange); Этого не должно быть?


    buttonForm.addEventListener('click', onButtonForm);
  }

  checkForm();
})();
