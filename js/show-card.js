'use strict';

(function () {
  var dialogWindow = document.querySelector('.dialog');
  function getPinActive(node) {
    if (window.pin.selectedPin) {
      window.pin.selectedPin.classList.remove('pin--active');
    }
    if (window.pin.pinActive) {
      window.pin.pinActive.classList.remove('pin--active');
    }
    window.pin.selectedPin = node;
    window.pin.selectedPin.classList.add('pin--active');
    getActiveNumber();
  }

  function getActiveNumber() {
    var pinElementsList = window.util.pinMap.querySelectorAll('.pin');
    var pinElementsListArray = Array.prototype.slice.call(pinElementsList);
    pinElementsListArray.forEach(function (value, index) {
      if (value.classList.contains('pin--active')) {
        window.card.createOfferCard(window.map.filterArray[index - 1]);
        dialogWindow.classList.remove('hidden');
      }
    });
  }

  window.showCard = {
    getPinActive: getPinActive,
    getActiveNumber: getActiveNumber
  };
})();
