'use strict';

(function () {

  window.showCard = function () {
    var fragment = document.createDocumentFragment();
    window.map.allOffers.forEach(function (value) {
      fragment.appendChild(window.pin.createPin(value));
    });
    window.util.pinMap.appendChild(fragment);
    window.util.pinMap.addEventListener('click', window.pin.onOpenDialog);
    window.util.pinMap.addEventListener('keydown', window.pin.onOpenDialog);
  };
})();
