/** Генерируем элемент корзины на основе того, что пользователь передвигал **/
function insertItemBasket(ui) {
  /** ui - то, что пользователь хочет добавить **/
  var drag = ui;
  var dragId = drag.attr('data-product-id');
  var basketItems = getBasketItems();
  var compare = false;

  for(var i in basketItems) {
    if(basketItems[i] === dragId) {
      compare = true;
    }
  }

  /** Если в корзине уже присутствует добавляемый товар, то ничего не делаем **/
  if(compare) {
    /** Пока без увеличения количества товара **/
  } else {

    var imgBlk = drag.find('.photo');
    var img = $('<img>', {
      src: imgBlk.attr('src'),
      alt: imgBlk.attr('alt'),
      height: 69
    });
    var cost = drag.find('.price_featured').text();
    var name = drag.find('h2').text();

    var tr = $('<tr />', {'data-product-id': dragId});
    var td1 = $('<td />', {
      class: 'card_image'
    });
    var td2 = $('<td />');
    var td3 = $('<td />');
    var h4 = $('<h4 />', {
      text: name
    });
    var div = $('<div />', {
      class: 'curr_card_price',
      text: '1 x ' + cost
    });
    var closeIcon = $('<i class="fa fa-times-circle delete_item" aria-hidden="true"></i>');

    refreshTotalPrice(cost, 'plus');

    img.appendTo(td1);
    h4.appendTo(td2);
    div.appendTo(td2);
    closeIcon.appendTo(td3);
    td1.appendTo(tr);
    td2.appendTo(tr);
    td3.appendTo(tr);

    return tr;
  }
}

/** Возвращает массив текущих элементов корзины **/
function getBasketItems() {
  var basketItems = $('.curr_card tr');

  if(basketItems.length != 0) {
    var arr = [];

    for(var i=0; i<basketItems.length; i++) {
      arr.push(basketItems[i].getAttribute('data-product-id'));
      console.log(arr);
    }
  }

  return arr;

}

/** Метод для обновления текущей общей стоимости товаров в корзине **/
function refreshTotalPrice(cost, operation) {
  var result = parseFloat(cost.replace('$','')).toFixed(2);
  var price = parseFloat($('.card_total_price').text().replace('$','')).toFixed(2);

  if(operation === 'plus') {

    var totalPrice = (price * 100 + result * 100) / 100;
    $('.card_total_price').text(parseFloat(totalPrice).toFixed(2));

  } else if(operation === 'minus') {

    var totalPrice = (price * 100 - result * 100) / 100;
    $('.card_total_price').text(parseFloat(totalPrice).toFixed(2));

  }
}