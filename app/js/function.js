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