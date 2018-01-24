/** Class products for all product **/
function Products(page) {
  this.currPage = page;
  this.dataPath = ''; this.getDataPath();
  this.products = []; this.collectProducts();
}

/** Method renderFeatured render Featured block with products (most of orders) **/
Products.prototype.renderProducts = function (type, place) {

  if(type === 'featured') {

    var container = $('<div />', {class: 'container'});
    var headerFeatured = $('<h1 />', {text: 'Featured Items'});
    var description = $('<p />', {
      text: 'Shop for items on what we featured in this week',
      class: 'cap_featured'
    });
    var itemsFeatured = $('<div />', {class: 'items_featured'});
    var browseAllProducts = '<a href="#" class="btn_allproduct hvr-float-shadow">Browse All Product <i class="fa fa-long-arrow-right" aria-hidden="true"></i></a>';

    /** Limit no more than 8 elements in block featured **/
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

    /** Limit no more than 9 elements in block catalog items **/
    var lenCatalog = (this.products.length > 9) ? 9 : this.products.length;
    for(var j=0; j < lenCatalog; j++) {
      $(place).append(this.singleProduct(this.products[j], type));
      console.log('обрабатываю:', this.products[j], type);
    }

  }

};

/** Method singleProduct return html code with only one product **/
Products.prototype.singleProduct = function (item, type) {
  var cost = '$' + item.cost;

  /** Generate blocks **/
  var article = $('<article />');
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

  /** Create a structure **/
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

Products.prototype.getDataPath = function () {
  if(this.currPage === 'index.html' || this.currPage === '') {
    this.dataPath = './';
  } else {
    this.dataPath = '../';
  }
  console.log('DataPath',this.dataPath);
};

/** Method collectProducts get data from json **/
Products.prototype.collectProducts = function () {
  $.ajax({
    // method: 'GET' by default
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