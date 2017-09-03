'use strict';
// data.js — модуль, который создает данные

window.dataSet = (function () {
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

  return {
    /**
    * Добавление созданных объектов в массив
    * @return {string} advtList - массив объектов
    */
    createAdvtList: function () {
      var advtList = [];
      for (var i = 0; i < ADVT_COUNT; i++) {
        advtList.push(createAdv());
      }
      return advtList;
    }
  };
})();
