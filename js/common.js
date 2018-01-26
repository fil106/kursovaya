
/** Смотрим текущую страницу и далее передаем её в класс, где она обработается
 ** и вернет нам либо корневой каталог, либо на каталог выше **/
var loc = document.location.href.split('/');
var currPage = loc[loc.length-1];
console.log('текущая страница:',loc,currPage);

$(document).ready(function(){

  var topMenu = new Menu(currPage);
  topMenu.render('.nav_header');

  if(currPage === 'product.html') {

    var products = new Products(currPage);
    products.render('catalog', '.items_catalog');

  } else if(currPage === 'index.html' || currPage === '') {

    var products = new Products(currPage);
    products.render('featured', '.featured');

  }

  $(".menu_aside_active").parent().find(".menu_aside_under").slideDown(400);


  /** выпадающее меню ***/
  $(".sort_by_select").click(function(){

  var sel = $(this);
  var selDown = $(this).find(".sort_by_select_down");

  /** показываем/скрываем выпадающее меню **/
  selDown.slideToggle(200);

  /** если курсор мыши вне выпадающего меню, то скрываем его **/
  $(".sort").mouseleave(function(){
      selDown.slideUp(200);
  });

  $(".sort_by_select_down ul li").click(function(){
      $(this).parent().parent().parent().find(".sort_by_select_current").text($(this).text());
  })
});

  /** выпадающее меню для боковой панели **/
  $(".menu_aside_click").click(function(){
      var active = $(this);

      active.parent().find(".menu_aside_under").slideToggle(200);
      active.find(".fa").toggleClass("fa-sort-asc fa-sort-desc");
      active.toggleClass("menu_aside_active");
  });

  /** выпадающее меnu для кнопки BROWSE **/
  $(".select_search").click(function(){
     $(this).find(".browsemenu").slideToggle();
  });

  /** выпадающее меnu для корзины **/
  if($(window).width() <= 1525) {
    $('.curr_card').css('right', '20px');
    $('.arrow_up').hide();
    $('.close_curr_card').show();
  }
  // при ресайзе окна делаем некоторые манипуляции
  $(window).resize(function () {
    if($(window).width() <= 1525) {
      $('.curr_card').css('right', '20px');
      $('.arrow_up').hide();
      $('.close_curr_card').show();
    }
    if($(window).width() > 1525) {
      $('.curr_card').css('right', '');
      $('.arrow_up').show();
      $('.close_curr_card').hide();
    }
  });

  // при скроле вниз фиксируем карзину
  $(document).scroll(function () {
    if($(document).scrollTop() > 70) {
      $('.arrow_up').hide();
      $('.close_curr_card').show();
      $('.curr_card').css('position', 'fixed');
    }
  });

  $('.close_curr_card').click(function () {
    $(this).parent().parent().find(".curr_card").slideUp();
  });

  $(".profile_card").click(function(){
      $(this).parent().find(".curr_card").slideToggle();
  });

  /** DRAG FEATURED GOODS **/
  $('.item').draggable({
    revert: true,
    scroll: false,
    start: function () {
      if($('.curr_card').css('display') === 'none') {
        $('.curr_card').show('bounce');
      }
      $(this).css('z-index', '999999');
    },
    stop: function(){
      $(this).css('z-index', '100');
    }
  });

  $('.curr_card').on('click', '.delete_item', function () {
    var cost = $('.curr_card_price').text().replace('1 x ', '');
    refreshTotalPrice(cost, 'minus');

    $(this).parent().parent().remove();

    if($('.curr_card table tr').length <= '3') {
      $('.curr_card table').css({
        'display': 'table',
        'height': 'auto',
        'overflow': 'auto'
      });
    }
  });

  /** DROP IN CURR CARD **/
  $('.curr_card').droppable({
    drop: function( event, ui ) {
      /** убираем надпись "MOVE HERE GOODS" **/
      $(this).find('h3').remove();
      /** добавляем в корзину драгнутый товар =) **/
      $(this).find('table tbody').append(generateCardItem(ui));

      if($('.curr_card table tr').length > '3') {
        $('.curr_card table').css({
          'display': 'block',
          'height': '296px',
          'overflow': 'auto'
        });
      }
    }
  });

});

function generateCardItem(ui) {
  var drag = ui.draggable;
  var dragId = drag.attr('data-product-id');
  var basketItems = getBasketItems();
  var compare = false;

  for(var i in basketItems) {
    if(basketItems[i] === dragId) {
      compare = true;
    }
  }

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
};