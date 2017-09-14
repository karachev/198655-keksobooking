'use strict';

window.pin = (function () {
  var PIN_WIDTH = 56;
  var PIN_HEIGHT = 75;
  var selectedPin;
  var dialogWindow = document.querySelector('.dialog');
  var dialogClose = document.querySelector('.dialog__close');
  var pinActive = document.querySelector('.pin--active');
  var pinsContainer = document.querySelector('.tokyo__pin-map');
  dialogWindow.style.display = 'none';

  function createPin(advt) {
    var pin = document.createElement('div');
    pin.className = 'pin';
    pin.style.left = advt.location.x - PIN_WIDTH / 2 + 'px';
    pin.style.top = advt.location.y - PIN_HEIGHT + 'px';

    var img = document.createElement('img');
    img.className = 'rounded';
    img.width = 40;
    img.height = 40;
    img.src = advt.author.avatar;

    pin.appendChild(img);
    pin.setAttribute('tabindex', 0);

    return pin;
  }
  function getPinActive(node) {
    if (selectedPin) {
      selectedPin.classList.remove('pin--active');
    }
    if (pinActive) {
      pinActive.classList.remove('pin--active');
    }
    selectedPin = node;
    selectedPin.classList.add('pin--active');
    getActiveNumber();
  }

  function getActiveNumber() {
    var pinElements = window.util.pinMap.querySelectorAll('.pin');
    pinElements.forEach(function (value, index) {
      if (value.classList.contains('pin--active')) {
        window.card.createOfferCard(window.map.allOffers[index - 1]);
        dialogWindow.style.display = 'block';
      }
    });
  }

  function onOpenDialog(evt) {
    if (window.util.isEnterPressed(evt) || window.util.isClicked(evt)) {
      var target = evt.target;
      while (target !== window.util.pinMap) {
        if (target.className === 'pin') {
          getPinActive(target);
          return;
        }
        target = target.parentNode;
      }
    }
  }

  function onCloseDialog(evt) {
    if (window.util.isEscapePressed(evt) || window.util.isClicked(evt)) {
      dialogWindow.style.display = 'none';
      selectedPin.classList.remove('pin--active');
    }
  }

  dialogClose.addEventListener('click', onCloseDialog);
  dialogClose.addEventListener('keydown', onCloseDialog);

  pinsContainer.addEventListener('click', onOpenDialog);

  window.pin = {
    createPin: createPin,
    getPinActive: getPinActive,
    getActiveNumber: getActiveNumber,
    onOpenDialog: onOpenDialog,
    onCloseDialog: onCloseDialog
  };

  return {
    createPin: createPin,
    onOpenDialog: onOpenDialog
  };
})();
