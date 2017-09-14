'use strict';

(function () {

  // Адрес, с которого получаем данные
  var GET_URL = 'https://1510.dump.academy/keksobooking/data';

  // Адрес, на который отправляем данные
  var POST_URL = 'https://1510.dump.academy/keksobooking';

  var sendRequest = function (method, url, onLoad, onError, data) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.timeout = 2000;

    xhr.addEventListener('load', function () {
      var error;

      switch (xhr.status) {
        case 200:
          onLoad(xhr.response);
          break;
        case 400:
          error = 'Неверный запрос';
          break;
        case 401:
          error = 'Пользователь не авторизован';
          break;
        case 404:
          error = 'Ничего не найдено';
          break;
        default:
          error = 'Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText;
      }

      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.open(method, url);
    xhr.send(data);
  };

  // Для получения данных с сервера
  var load = function (onLoad, onError) {
    sendRequest('GET', GET_URL, onLoad, onError);
  };

  // Для отправки данных на сервер
  var save = function (onLoad, onError, data) {
    console.log(data);
    sendRequest('POST', POST_URL, onLoad, onError, data);
  };

  var showError = function (message) {
    var errorTooltip = document.createElement('div');
    var errorTooltipText = document.createElement('span');

    errorTooltip.appendChild(errorTooltipText);

    errorTooltip.classList.add('request-error');
    errorTooltipText.classList.add('request-error__text');
    errorTooltipText.textContent = message;

    document.body.insertAdjacentElement('afterbegin', errorTooltip);

    setTimeout(function () {
      errorTooltip.remove();
    }, 4000);
  };

  window.backend = {
    load: load,
    save: save,
    showError: showError
  };
})();
