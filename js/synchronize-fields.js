'use strict';

(function () {
  function synchronizeFields(field1, field2, fieldData1, fieldData2, cb) {
    var indexValue = fieldData1.indexOf(field1.value);
    cb(field2, fieldData2[indexValue]);
  }

  window.synchronizeFields = synchronizeFields;
})();
