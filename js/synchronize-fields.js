'use strict';

(function () {
  window.synchronizeFields = function (browserEvt, firstItem, secondItem, callback) {
    firstItem.addEventListener(browserEvt, function (evt) {
      if (typeof callback === 'function') {
        var currentValue = evt.target.value;
        callback(secondItem, currentValue);
      }
    });
  };
})();
