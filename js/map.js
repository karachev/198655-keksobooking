'use strict';

window.pin();

var pinHandle = document.querySelector('.pin__main');
var address = document.querySelector('#address');
address.setAttribute('readonly', 'readonly');

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
