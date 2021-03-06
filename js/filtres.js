'use strict';

(function () {
  var LOW_PRICE = 1000;
  var HIGH_PRICE = 50000;
  var filterBlock = document.querySelector('.tokyo__filters');
  var typeFilter = filterBlock.querySelector('#housing_type');
  var priceFilter = filterBlock.querySelector('#housing_price');
  var roomFilter = filterBlock.querySelector('#housing_room-number');
  var guestsFilter = filterBlock.querySelector('#housing_guests-number');
  var featuresFilter = filterBlock.querySelectorAll('input[name="feature"]');

  function setFilterTypes(filterValue, itemValue) {
    return filterValue === 'any' || itemValue === filterValue;
  }

  function setFilterPrice(price) {
    var currentValue = priceFilter.value;
    switch (currentValue) {
      case 'middle':
        return price >= LOW_PRICE && price < HIGH_PRICE;
      case 'low':
        return price < LOW_PRICE;
      case 'high':
        return price >= HIGH_PRICE;
      default:
        return true;
    }
  }

  function setFilterByHousesFeautures(filterFeatures, itemFeatures) {
    for (var i = 0; i < filterFeatures.length; i++) {
      if (itemFeatures.indexOf(filterFeatures[i]) === -1) {
        return false;
      }
    }
    return true;
  }

  function setFilters() {
    var hausesFeautures = [].filter.call(featuresFilter, function (item) {
      return item.checked;
    }).map(function (item) {
      return item.value;
    });

    return window.map.allOffers.filter(function (item) {
      if (!setFilterTypes(typeFilter.value, item.offer.type)) {
        return false;
      }
      if (!setFilterPrice(item.offer.price)) {
        return false;
      }
      if (!setFilterTypes(roomFilter.value, item.offer.rooms + '')) {
        return false;
      }
      if (!setFilterTypes(guestsFilter.value, item.offer.guests + '')) {
        return false;
      }
      if (!setFilterByHousesFeautures(hausesFeautures, item.offer.features)) {
        return false;
      }
      return true;
    });
  }

  window.filters = {
    setFilters: setFilters,
    setFilterTypes: setFilterTypes,
    setFilterPrice: setFilterPrice,
    setFilterByHousesFeautures: setFilterByHousesFeautures
  };
})();
