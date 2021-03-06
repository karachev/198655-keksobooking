'use strict';

(function () {
  window.map = {
    allOffers: [],
    onFilterChange: onFilterChange,
    renderPinsAfterSetFilters: renderPinsAfterSetFilters,
    fillPinsContainer: fillPinsContainer,
    setPins: setPins,
    filterArray: []
  };

  var pinHandle = document.querySelector('.pin__main');
  var address = document.querySelector('#address');
  address.value = 'x: 600, y: 300';
  var pinsContainer = document.querySelector('.tokyo__pin-map');
  var pinLocation = {
    minX: 0,
    maxX: pinHandle.offsetParent.clientWidth - pinHandle.clientWidth,
    minY: 0,
    maxY: pinHandle.offsetParent.clientHeight - pinHandle.clientHeight
  };
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
    while (pinsContainer.children.length !== 1) {
      pinsContainer.removeChild(pinsContainer.children[1]);
    }
    fillPinsContainer(window.filters.setFilters());
  }

  function fillPinsContainer(pinsArray) {
    var pinsFragment = document.createDocumentFragment();
    window.map.filterArray = [];
    for (var i = 0; i < pinsArray.length; i++) {
      var element = window.pin.create(pinsArray[i]);
      pinsFragment.appendChild(element);
      window.map.filterArray.push(pinsArray[i]);
    }
    pinsContainer.appendChild(pinsFragment);
  }

  function setPins(data) {
    window.map.allOffers = data;
    fillPinsContainer(window.map.allOffers.slice(0, 3));
  }

  window.backend.load(setPins, window.backend.showError);
  pinHandle.setAttribute('draggable', true);

  pinHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    function onMouseMove(moveEvt) {
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
        address.value = 'x: ' + Math.floor(addressX) + ', y: ' + Math.floor(addressY);
      }
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
}());

