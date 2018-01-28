/** Смотрим текущую страницу и далее передаем её в класс, где она обработается
 ** и вернет нам либо корневой каталог './', либо на каталог выше '../' **/
var loc = document.location.href.split('/');
var currPage = loc[loc.length-1];
console.log('текущая страница:',loc,currPage);

/** Далее все дейсвтия делаем только после полного построния DOM **/
$(document).ready(function(){
  /** Создаем экземпляр класса корзины **/
  var basket = new Basket('curr_card');
  /** отрисовываем корзину **/
  basket.render('.profile');

  /** Создаем экземпляр класса верхнего (горизонтального) меню **/
  var topMenu = new Menu(currPage);
  /** отрисовываем меню **/
  topMenu.render('.nav_header');

  if(currPage === 'product.html' || currPage === 'product.html#') {

    var products = new Products(currPage);
    products.render('catalog', '.items_catalog');

  } else if(currPage === 'index.html' || currPage === 'index.html#' || currPage === '') {

    var products = new Products(currPage);
    products.render('featured', '.featured');

  }

  $(".menu_aside_active").parent().find(".menu_aside_under").slideDown(400);

  /** выпадающее меню ***/
  $(".sort_by_select").click(function(){
    var selDown = $(this).find(".sort_by_select_down");

    /** показываем/скрываем выпадающее меню **/
    selDown.slideToggle(200);

    /** если курсор мыши вне выпадающего меню, то скрываем его **/
    $(".sort").mouseleave(function(){
        selDown.slideUp(200);
    });

    $(".sort_by_select_down ul li").click(function(){
        $(this).parent().parent().parent().find(".sort_by_select_current").text($(this).text());
    });
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

  $('.close_basket').click(function () {
    $(this).parent().parent().slideUp();
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
      $(this).find('table tbody').append(generateBasketItem(ui));

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