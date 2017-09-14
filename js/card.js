'use strict';

window.card = (function () {
  var TYPE_RUS = {'flat': 'Квартира', 'house': 'Дом', 'bungalo': 'Бунгало', 'palace': 'Дворец'};
  var dialogWindow = document.querySelector('.dialog');

  function onCloseDialogEsc(event) {
    if (window.util.isEscapePressed(event)) {
      dialogWindow.style.display = 'none';
    }
  }

  function createOfferCard(advtItem) {
    var lodgeTemplate = document.querySelector('#lodge-template').content;
    var lodgeItem = lodgeTemplate.cloneNode(true);
    var lodgeTitle = lodgeItem.querySelector('.lodge__title');
    var lodgeAddress = lodgeItem.querySelector('.lodge__address');
    var lodgePrice = lodgeItem.querySelector('.lodge__price');
    var lodgeType = lodgeItem.querySelector('.lodge__type');
    var lodgeRooms = lodgeItem.querySelector('.lodge__rooms-and-guests');
    var lodgeCheck = lodgeItem.querySelector('.lodge__checkin-time');
    var dialog = document.querySelector('.dialog');
    var dialogPanel = dialog.querySelector('.dialog__panel');

    lodgeTitle.textContent = advtItem.offer.title;
    lodgeAddress.textContent = advtItem.offer.address;
    lodgePrice.textContent = advtItem.offer.price + '\u20BD/ночь';
    lodgeType.textContent = TYPE_RUS[advtItem.offer.type];
    lodgeRooms.textContent = 'Для ' + advtItem.offer.guests + ' гостей в ' + advtItem.offer.rooms + ' комнатах';
    lodgeCheck.textContent = 'Заезд после ' + advtItem.offer.checkin + ', выезд до ' + advtItem.offer.checkout;

    var advtItemFeatures = advtItem.offer.features;
    advtItemFeatures.forEach(function (value) {
      var span = document.createElement('span');
      span.className = 'feature__image feature__image--' + value;
      lodgeItem.querySelector('.lodge__features').appendChild(span);
    });

    lodgeItem.querySelector('.lodge__description').textContent = advtItem.offer.description;
    document.querySelector('.dialog__title img').src = advtItem.author.avatar;

    dialog.replaceChild(lodgeItem, dialogPanel);
    document.addEventListener('keydown', onCloseDialogEsc);
  }

  return {
    createOfferCard: createOfferCard
  };
})();
