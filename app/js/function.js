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

function setCookie(name, value, options) {
  options = options || {};

  var expires = options.expires;

  if (typeof expires == "number" && expires) {
    var d = new Date();
    d.setTime(d.getTime() + expires * 1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }

  value = encodeURIComponent(value);

  var updatedCookie = name + "=" + value;

  for (var propName in options) {
    updatedCookie += "; " + propName;
    var propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }

  document.cookie = updatedCookie;
}

// возвращает cookie с именем name, если есть, если нет, то undefined
function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function deleteCookie(name) {
  setCookie(name, "", {
    expires: -1
  })
}