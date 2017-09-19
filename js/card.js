'use strict';

(function () {
  var TYPE_RUS = {'flat': 'Квартира', 'house': 'Дом', 'bungalo': 'Бунгало', 'palace': 'Дворец'};
  var ADVT_PIC_SIZE = {
    width: 52,
    height: 42
  };
  var dialogWindow = document.querySelector('.dialog');
  var lodgeTemplate = document.querySelector('#lodge-template').content;

  function onCloseDialogEsc(evt) {
    if (window.util.isEscapePressed(evt)) {
      dialogWindow.classList.add('hidden');
    }
    document.removeEventListener('keydown', onCloseDialogEsc);
  }

  function createOfferCard(advtItem) {
    var lodgeItem = lodgeTemplate.cloneNode(true);
    var lodgeTitle = lodgeItem.querySelector('.lodge__title');
    var lodgeAddress = lodgeItem.querySelector('.lodge__address');
    var lodgePrice = lodgeItem.querySelector('.lodge__price');
    var lodgeType = lodgeItem.querySelector('.lodge__type');
    var lodgeRooms = lodgeItem.querySelector('.lodge__rooms-and-guests');
    var lodgeCheck = lodgeItem.querySelector('.lodge__checkin-time');
    var lodgePhotos = lodgeItem.querySelector('.lodge__photos');
    var dialog = document.querySelector('.dialog');
    var dialogPanel = dialog.querySelector('.dialog__panel');
    var information = advtItem.offer;
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

    var picAdvt = getPicAdvt(information.photos);
    lodgePhotos.appendChild(picAdvt);
    function getPicAdvt(photos) {
      picAdvt = document.createDocumentFragment();
      photos.forEach(function (item) {
        var img = document.createElement('img');
        img.width = ADVT_PIC_SIZE.width;
        img.height = ADVT_PIC_SIZE.height;
        img.src = item;

        picAdvt.appendChild(img);
      });
      return picAdvt;
    }

    dialog.replaceChild(lodgeItem, dialogPanel);
    document.addEventListener('keydown', onCloseDialogEsc);
  }

  window.card = {
    onCloseDialogEsc: onCloseDialogEsc,
    createOfferCard: createOfferCard
  };
})();
