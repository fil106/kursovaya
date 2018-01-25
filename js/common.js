
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


  // *** выпадающее меню ***
  $(".sort_by_select").click(function(){

  var sel = $(this);
  var selDown = $(this).find(".sort_by_select_down");

  // показываем/скрываем выпадающее меню
  selDown.slideToggle(200);

  // если курсор мыши вне выпадающего меню, то скрываем его
  $(".sort").mouseleave(function(){
      selDown.slideUp(200);
  });

  $(".sort_by_select_down ul li").click(function(){
      $(this).parent().parent().parent().find(".sort_by_select_current").text($(this).text());
  })
});

  // *** выпадающее меню для боковой панели ***
  $(".menu_aside_click").click(function(){
      var active = $(this);

      active.parent().find(".menu_aside_under").slideToggle(200);
      active.find(".fa").toggleClass("fa-sort-asc fa-sort-desc");
      active.toggleClass("menu_aside_active");
  });

  // *** выпадающее меnu для кнопки BROWSE ***
  $(".select_search").click(function(){
     $(this).find(".browsemenu").slideToggle();
  });

  // *** выпадающее меnu для корзины ***
  if($(window).width() <= 1525) {
    $('.curr_card').css('right', '20px');
    $('.arrow_up').hide();
    $('.close_curr_card').show();
  }

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

  $(document).scroll(function () {
    if($(document).scrollTop() > 70) {
      $('.arrow_up').hide();
      $('.close_curr_card').show();
      $('.curr_card').css('position', 'fixed');
    }
  });

  $('.close_curr_card').click(function () {
    $(this).parent().parent().find(".curr_card").slideToggle();
  });

  $(".profile_card").click(function(){
      $(this).parent().find(".curr_card").slideToggle();
  });

  /** DRAG & DROP **/
  $('.items_featured article').draggable({ scroll: false });
});