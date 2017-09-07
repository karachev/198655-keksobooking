'use strict';

window.util = (function () {

  var ESCAPE_KEY_CODE = 27;
  var ENTER_KEY_CODE = 13;

  return {
    /**
    * Получение уникального номера
    * @param {string} array - массив объектов
    * @return {string} newArray - уникальный элемент из массива
    */
    getRandomUniqueItem: function (array) {
      var newArray = window.util.getRefreshArray(array);
      return newArray.splice(window.util.getRandomNumber(0, newArray.length - 1), 1);
    },
    /**
    * Перемешивание массива объектов
    * @param {string} array - массив объектов
    * @return {string} array - перемешанный массив
    */
    getRefreshArray: function (array) {
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
    },
    /**
    * Получение случайного номера
    * @param {string} array - массив объектов
    * @return {string} array - случайный элемент из массива
    */
    getRandomNumber: function (array) {
      return array[Math.floor(Math.random() * array.length)];
    },
    /**
    * Получение случайного значения в отрезке
    * @param {number} minValue - минимальное значение из отрезка
    * @param {number} maxValue - максимальное значение из отрезка
    * @return {number} случайное значение из данного отрезка
    */
    getRandomOfSet: function (minValue, maxValue) {
      return Math.floor(Math.random() * (maxValue - minValue)) + minValue;
    },
    /**
    * Событие по нажатию на ESC
    * @param {Objects} event - событие
    * @return {boolean} event - было ли именно такое событие
    */
    isEscapePressed: function (event) {
      return event && event.keyCode === ESCAPE_KEY_CODE;
    },
    /**
    * Событие по нажатию на ENTER
    * @param {Objects} event - событие
    * @return {boolean} event - было ли именно такое событие
    */
    isEnterPressed: function (event) {
      return event && event.keyCode === ENTER_KEY_CODE;
    },
    /**
    * Событие по нажатию мыши
    * @param {Objects} event - событие
    * @return {boolean} event - было ли именно такое событие
    */
    isClicked: function (event) {
      return event.type === 'click';
    }
  };
})();
