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
    class: this.basketPrice
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
  this.tableHtml.appendTo($basket);
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