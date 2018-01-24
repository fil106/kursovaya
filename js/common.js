
var loc = document.location.href.split('/');
var currPage = loc[loc.length-1];
console.log('текущая страница:',loc,currPage);

$(document).ready(function(){

  if(currPage === 'product.html') {

    var products = new Products(currPage);
    products.renderProducts('catalog', '.items_catalog');

  } else if(currPage === 'index.html' || currPage === '') {

    var products = new Products(currPage);
    products.renderProducts('featured', '.featured');

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
    $(".profile_card").click(function(){
        $(this).parent().find(".curr_card").slideToggle();
    });
});