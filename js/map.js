'use strict';

window.pinSet();

var pinHandle = document.querySelector('.pin__main');
var currentCoords = null;
var address = document.querySelector('#address');
address.setAttribute('readonly', 'readonly');

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

    pinHandle.style.top = (pinHandle.offsetTop - shift.y) + 'px';
    pinHandle.style.left = (pinHandle.offsetLeft - shift.x) + 'px';

    var addressY = pinHandle.offsetTop - shift.y + pinHandle.clientHeight;
    var addressX = pinHandle.offsetLeft - shift.x + pinHandle.clientWidth / 2;

    address.value = 'x: ' + Math.floor(addressX) + 'px, y: ' + Math.floor(addressY) + 'px';
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
