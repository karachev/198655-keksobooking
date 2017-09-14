'use strict';

window.util = (function () {
  var ESCAPE_KEY_CODE = 27;
  var ENTER_KEY_CODE = 13;
  var TYPE = ['flat', 'house', 'bungalo', 'palace'];
  var CHECKIN = [
    '12:00',
    '13:00',
    '14:00'
  ];
  var pinMap = document.querySelector('.tokyo__pin-map');

  return {
    pinMap: pinMap,
    TYPE: TYPE,
    CHECKIN: CHECKIN,

    getRandomUniqueItem: function (array) {
      var newArray = window.util.getRefreshArray(array);
      return newArray.splice(window.util.getRandomNumber(0, newArray.length - 1), 1);
    },
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
    getRandomNumber: function (array) {
      return array[Math.floor(Math.random() * array.length)];
    },
    getRandomOfSet: function (minValue, maxValue) {
      return Math.floor(Math.random() * (maxValue - minValue)) + minValue;
    },
    isEscapePressed: function (event) {
      return event && event.keyCode === ESCAPE_KEY_CODE;
    },
    isEnterPressed: function (event) {
      return event && event.keyCode === ENTER_KEY_CODE;
    },
    isClicked: function (event) {
      return event.type === 'click';
    }
  };
})();
