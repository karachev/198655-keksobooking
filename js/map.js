'use strict';

(function() {

  window.map = {
    allOffers: []
  }

  var pinHandle = document.querySelector('.pin__main');
  var address = document.querySelector('#address');
  var pinsContainer = document.querySelector('.tokyo__pin-map');

  var tokyoFiltersForm = document.querySelector('.tokyo__filters');
  tokyoFiltersForm.addEventListener('change', onFilterChange);

  address.setAttribute('readonly', 'readonly');

  function onFilterChange(evt) {
    if (!evt.target.classList.contains('tokyo__filter') &&
      evt.target.name !== 'feature') {
      return;
    }
    window.debounce(renderPinsAfterSetFilters);
  }

  function renderPinsAfterSetFilters() {
    // TODO. Написать функцию которая будет закрывать карточку.
    // Функция должна быть объявлена в соответствующем модуле - pin.js
    // window.card.closeAdDetailsDialog();

    while (pinsContainer.children.length !== 1) {
      pinsContainer.removeChild(pinsContainer.children[1]);
    }
    fillPinsContainer(window.filters.setFilters());
  }

  var fillPinsContainer = function (pinsArray) {
    var pinsFragment = document.createDocumentFragment();
    for (var i = 0; i < pinsArray.length; i++) {
      var element = window.pin.createPin(pinsArray[i]);
      pinsFragment.appendChild(element);
    }
    pinsContainer.appendChild(pinsFragment);
  };

  var setPins = function (data) {
    window.map.allOffers = data;
    fillPinsContainer(window.map.allOffers);
  }

  window.backend.load(setPins, window.backend.showError);

  var pinLocation = {
    minX: 0,
    maxX: pinHandle.offsetParent.clientWidth - pinHandle.clientWidth,
    minY: 0,
    maxY: pinHandle.offsetParent.clientHeight - pinHandle.clientHeight
  };

  pinHandle.setAttribute('draggable', true);

  pinHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var addressY = pinHandle.offsetTop - shift.y;
      var addressX = pinHandle.offsetLeft - shift.x;

      if (addressX >= pinLocation.minX && addressX <= pinLocation.maxX && addressY >= pinLocation.minY && addressY <= pinLocation.maxY) {
        pinHandle.style.top = (pinHandle.offsetTop - shift.y) + 'px';
        pinHandle.style.left = (pinHandle.offsetLeft - shift.x) + 'px';
        address.value = 'x: ' + Math.floor(addressX) + 'px, y: ' + Math.floor(addressY) + 'px';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
}());

