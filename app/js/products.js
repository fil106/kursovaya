/** Класс Products - глабольный класс для получения данных о товорах из JSON
 ** и вывода товаров на определенных страницах и местах **/
function Products(page, itemCls, cookieBasket) {
  this.currPage = page;
  this.dataPath = ''; this.getDataPath();
  this.products = []; this.collectProducts();
  this.cookieBasket = cookieBasket;
  this.cookieArticlesHtml = $('<div />'); this.collectProductsFromCookie(this.cookieBasket);
  this.itemCls = itemCls;
}

/** Метод render помещает сгенерированные блоки в место переданное 2-м аргументом
 ** и в зависимости от типа (популярные ли это товары или обычный каталог) **/
Products.prototype.render = function (type, place) {

  if(type === 'featured') {

    var container = $('<div />', {class: 'container'});
    var headerFeatured = $('<h1 />', {text: 'Featured Items'});
    var description = $('<p />', {
      text: 'Shop for items on what we featured in this week',
      class: 'cap_featured'
    });
    var itemsFeatured = $('<div />', {class: 'items_featured'});
    var browseAllProducts = '<a href="html/product.html" class="btn_allproduct hvr-float-shadow">Browse All Product <i class="fa fa-long-arrow-right" aria-hidden="true"></i></a>';

    /** Изначально выводим неболее 8 товаров в популярные товары **/
    var lenFeatured = (this.products.length > 8) ? 8 : this.products.length;
    for(var i=0; i < lenFeatured; i++) {
      itemsFeatured.append(this.singleProduct(this.products[i], type));
      console.log('обрабатываю:', this.products[i], type);
    }

    headerFeatured.appendTo(container);
    description.appendTo(container);
    itemsFeatured.appendTo(container);
    container.append(browseAllProducts);
    container.appendTo($(place));

  } else if(type === 'catalog') {

    console.log(type,this.products);

    /** Изначально выводим неболее 9 товаров в блок каталога товаров **/
    var lenCatalog = (this.products.length > 9) ? 9 : this.products.length;
    for(var j=0; j < lenCatalog; j++) {
      $(place).append(this.singleProduct(this.products[j], type));
      console.log('обрабатываю:', this.products[j], type);
    }

  }

};

/** Метод singleProduct возвращает HTML только одного элемента товара **/
Products.prototype.singleProduct = function (item, type) {
  var cost = '$' + item.cost;

  /** Генерируем необходимые блоки HTML **/
  var article = $('<article />', {
    class: this.itemCls,
    'data-product-id': item.id
  });
  var header = $('<header />');
  var upset = $('<div />', {class: 'upset'});
  var figure = $('<figure />');
  var itemLink = $('<a />', {
    href: '#',
    class: 'item_' + type
  });
  var itemPhoto = $('<div />', {
    class: 'item_' + type + '_photo'
  });

  var img = $('<img>', {
    class: 'photo',
    src: this.dataPath + item.img,
    alt: 'photo'
  });
  var figcaption = $('<figcaption />');
  var headerProduct = $('<h2 />', {text: item.name});
  var footer = $('<footer />');
  var price = $('<span />', {
    class: 'price_featured',
    text: Number.cost ? cost + '.00' : cost
  });

  /** Перемещаем елементы согласно структуре HTML **/
  price.appendTo(footer);
  headerProduct.appendTo(figcaption);
  img.appendTo(itemPhoto);
  itemPhoto.appendTo(figure);
  figcaption.appendTo(figure);
  upset.appendTo(header);
  figure.appendTo(header);
  header.appendTo(itemLink);
  footer.appendTo(itemLink);
  itemLink.appendTo(article);

  return article;
};

/** Метод для получения начала пути к нашим файлам, либо из корня, либо на каталог выше **/
Products.prototype.getDataPath = function () {
  if(this.currPage === 'index.html' || this.currPage === '') {
    this.dataPath = './';
  } else {
    this.dataPath = '../';
  }
  console.log('DataPathContent',this.dataPath);
};

/** Метод collectProducts получает и записывает, полученные данные из json **/
Products.prototype.collectProducts = function () {
  $.ajax({
    // method: 'GET' по умолчанию
    url: this.dataPath + 'data-json/products.json',
    dataType: 'json',
    async: false,
    success: function (data) {
      for (var i in data.items) {
        this.products.push(data.items[i]);
      }
      console.log('Пришли данные: ',this.products);
    },
    context: this
  });
};

Products.prototype.collectProductsFromCookie = function (arrId) {

  for(var i=0; i < this.products.length; i++) {

    for(var j=0; j < arrId.length; j++) {

      if(this.products[i].id === arrId[j]) {

        this.cookieArticlesHtml.append(this.singleProduct(this.products[i]));

      }

    }

  }

  console.log(this.cookieArticlesHtml.find('article'));

};

Products.prototype.getCookieArticlesHtml = function () {
  return this.cookieArticlesHtml
};