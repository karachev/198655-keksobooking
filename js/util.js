'use strict';

(function () {
  var ESCAPE_KEY_CODE = 27;
  var ENTER_KEY_CODE = 13;
  var TYPE = ['flat', 'house', 'bungalo', 'palace'];
  var CHECKIN = [
    '12:00',
    '13:00',
    '14:00'
  ];
  var pinMap = document.querySelector('.tokyo__pin-map');
  var dialogWindow = document.querySelector('.dialog');
  function getRandomUniqueItem(array) {
    var newArray = window.util.getRefreshArray(array);
    return newArray.splice(window.util.getRandomNumber(0, newArray.length - 1), 1);
  }
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
  function getRandomNumber(array) {
    return array[Math.floor(Math.random() * array.length)];
  }
  function getRandomOfSet(minValue, maxValue) {
    return Math.floor(Math.random() * (maxValue - minValue)) + minValue;
  }
  function isEscapePressed(evt) {
    return evt && evt.keyCode === ESCAPE_KEY_CODE;
  }
  function isEnterPressed(evt) {
    return evt && evt.keyCode === ENTER_KEY_CODE;
  }
  function isClicked(evt) {
    return evt.type === 'click';
  }

  window.util = {
    ESCAPE_KEY_CODE: ESCAPE_KEY_CODE,
    ENTER_KEY_CODE: ENTER_KEY_CODE,
    TYPE: TYPE,
    CHECKIN: CHECKIN,
    pinMap: pinMap,
    dialogWindow: dialogWindow,
    getRandomUniqueItem: getRandomUniqueItem,
    getRefreshArray: getRefreshArray,
    getRandomNumber: getRandomNumber,
    getRandomOfSet: getRandomOfSet,
    isEscapePressed: isEscapePressed,
    isEnterPressed: isEnterPressed,
    isClicked: isClicked
  };
})();
