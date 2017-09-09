'use strict';

(function () {

window.showCard = function () {
    var pinMap = document.querySelector('.tokyo__pin-map');
    var fragment = document.createDocumentFragment();
    var listOfAdvt = window.data();
    listOfAdvt.forEach(function (value) {
      fragment.appendChild(window.pin.createPin(value));
    });
    pinMap.appendChild(fragment);
    pinMap.addEventListener('click', window.pin.onOpenDialog);
    pinMap.addEventListener('keydown', window.pin.onOpenDialog);
  };
})();
