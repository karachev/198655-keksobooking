'use strict';

window.pinSet();

var pinHandle = document.querySelector('.pin__main');
var address = document.querySelector('#address');
address.setAttribute('readonly', 'readonly');
pinHandle.setAttribute('draggable', true);


  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

