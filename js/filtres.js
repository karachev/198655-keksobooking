'use strict';

(function () {
  var filtersContainer = document.querySelector('.tokyo__filters');
  var housesTypeElement = filtersContainer.querySelector('#housing_type');
  var housesPriceElement = filtersContainer.querySelector('#housing_price');
  var housesRoomCountElement = filtersContainer.querySelector('#housing_room-number');
  var housesGuestCountElement = filtersContainer.querySelector('#housing_guests-number');
  var featuresElements = filtersContainer.querySelectorAll('input[name="feature"]');

  function setFilterByHousesTypes(filterValue, itemValue) {
    return filterValue === 'any' || itemValue === filterValue;
  }

  function setFilterByHousesPrice(price) {
    var currentValue = housesPriceElement.value;
    switch (currentValue) {
      case 'middle':
        return price >= 10000 && price < 50000;
      case 'low':
        return price < 10000;
      case 'high':
        return price >= 50000;
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
    var hausesFeautures = [].filter.call(featuresElements, function (item) {
      return item.checked;
    }).map(function (item) {
      return item.value;
    });

    return window.map.allOffers.filter(function (item) {
      if (!setFilterByHousesTypes(housesTypeElement.value, item.offer.type)) {
        return false;
      }
      if (!setFilterByHousesPrice(item.offer.price)) {
        return false;
      }
      if (!setFilterByHousesTypes(housesRoomCountElement.value, item.offer.rooms + '')) {
        return false;
      }
      if (!setFilterByHousesTypes(housesGuestCountElement.value, item.offer.guests + '')) {
        return false;
      }
      if (!setFilterByHousesFeautures(hausesFeautures, item.offer.features)) {
        return false;
      }
      return true;
    });
  }

  window.filters = {
    setFilters: setFilters
  };
})();
