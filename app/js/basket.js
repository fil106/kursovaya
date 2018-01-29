function Basket(cls) {
  /** Определяемся с классами элемонтов **/
  this.basketCls = cls;
  this.closeBtn = 'close_curr_card';
  this.basketPrice = 'card_total';
  this.totalPrice = 'card_total_price';
  this.checkoutBtn = 'btn_add_tocard btn_hover';
  this.sendBtn = 'custom_btn';

  /** Таблица с товарами **/
  this.tableHtml = ''; this.generateTableHtml();

  /** Текущее кол-во товаров в корзине **/
  this.countGoods = 0;
}

Basket.prototype.render = function (place) {
  /** Создаем необходимые элементы **/
  var $basket = $('<div />', {
    class: this.basketCls
  });
  var $basketCloseBtn = $('<div />', {
    class: this.closeBtn,
    text: 'Close'
  });
  $basketCloseBtn.append('<i class="fa fa-times-circle close_basket" aria-hidden="true"></i>');
  var $arrowUp = $('<div />', {
    class: 'arrow_up'
  });
  var $basketTotal = $('<div />', {
    class: this.basketPrice,
    text: 'Total'
  });
  var $basketTotalPrice = $('<div />', {
    class: this.totalPrice
  });
  var $clearfix = $('<div />', {
    class: 'clearfix'
  });
  var $basketCheckoutBtn = $('<div />', {
    class: this.checkoutBtn,
    text: 'Checkout'
  });
  var $basketSendBtn = $('<div />', {
    class: this.sendBtn,
    text: 'Go to card'
  });

  /** Создаем структуру **/
  $basketCloseBtn.appendTo($basket);
  $arrowUp.appendTo($basket);
  $basketTotal.appendTo($basket);
  $basketTotalPrice.appendTo($basket);
  $clearfix.appendTo($basket);
  $basketCheckoutBtn.appendTo($basket);
  $basketSendBtn.appendTo($basket);

  /** Отрисовываем в нужном place **/
  $basket.appendTo($(place));
};

Basket.prototype.generateTableHtml = function () {
  var $table = $('<table />');
  var $tbody = $('<tbody />');

  $tbody.appendTo($table);

  this.tableHtml = $table;
};

/** Генерируем элемент корзины на основе того, что пользователь передвигал и добавляем в корзину**/
Basket.prototype.insertItemBasket = function (ui) {
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
    /** Увеличиваем переменную countGoods **/
    this.countGoods++;
    this.renderCountGoods();

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
    tr.appendTo(this.tableHtml);

    if($('.curr_card table tr').length > 3) {
      $('.curr_card table').css({
        'display': 'block',
        'height': '296px',
        'overflow': 'auto'
      });
    }

    $(this.tableHtml).insertBefore('.'+this.basketCls+' .'+this.basketPrice);
  }
};

/** Удаляем товар из корзины **/
Basket.prototype.deleteItemBasket = function (item) {
  this.countGoods--;
  this.renderCountGoods();

  var cost = $('.curr_card_price').text().replace('1 x ', '');

  refreshTotalPrice(cost, 'minus');

  item.parent().parent().remove();

  if($('.curr_card table tr').length <= '3') {
    $('.curr_card table').css({
      'display': 'table',
      'height': 'auto',
      'overflow': 'auto'
    });
  }
};

Basket.prototype.renderCountGoods = function () {

  if(this.countGoods > 0) {

    $('.basket_count').text(this.countGoods).show('bounce');

  } else if(this.countGoods === 0) {

    $('.basket_count').hide();

  }

};