/** Class products for all product **/
function Products() {
  this.products = []; this.collectProducts();
}

/** Method renderFeatured render Featured block with products (most of orders) **/
Products.prototype.renderFeatured = function (place) {
  var container = $('<div />', {class: 'container'});
  var headerFeatured = $('<h1 />', {text: 'Featured Items'});
  var description = $('<p />', {
    text: 'Shop for items on what we featured in this week',
    class: 'cap_featured'
  });
  var itemsFeatured = $('<div />', {class: 'items_featured'});
  var browseAllProducts = '<a href="#" class="btn_allproduct hvr-float-shadow">Browse All Product <i class="fa fa-long-arrow-right" aria-hidden="true"></i></a>';

  for(var i in this.products) {
    itemsFeatured.append(this.singleProduct(this.products[i]));
  }

  headerFeatured.appendTo(container);
  description.appendTo(container);
  itemsFeatured.appendTo(container);
  container.append(browseAllProducts);
  container.appendTo($(place));
};

/** Method singleProduct return html code with only one product **/
Products.prototype.singleProduct = function (item) {
  var cost = '$' + item.cost;

  /** Generate blocks **/
  var article = $('<article />');
  var itemFeaturedLink = $('<a />', {
    href: '#',
    class: 'item_featured'
  });
  var header = $('<header />');
  var upset = $('<div />', {class: 'upset'});
  var figure = $('<figure />');
  var itemFeaturedPhoto = $('<div />', {class: 'item_featured_photo'});
  var img = $('<img>', {
    class: 'photo',
    src: item.img,
    alt: 'photo'
  });
  var figcaption = $('<figcaption />');
  var headerProduct = $('<h2 />', {text: item.name});
  var footer = $('<footer />');
  var priceFeatured = $('<span />', {
    class: 'price_featured',
    text: Number.cost ? cost + '.00' : cost
  });

  /** Create a structure **/
  priceFeatured.appendTo(footer);
  headerProduct.appendTo(figcaption);
  img.appendTo(itemFeaturedPhoto);
  itemFeaturedPhoto.appendTo(figure);
  figcaption.appendTo(figure);
  upset.appendTo(header);
  figure.appendTo(header);
  header.appendTo(itemFeaturedLink);
  footer.appendTo(itemFeaturedLink);
  itemFeaturedLink.appendTo(article);

  return article;
};

/** Method collectProducts get data from json **/
Products.prototype.collectProducts = function () {
  $.ajax({
    // method: 'GET' by default
    url: 'data-json/products.json',
    dataType: 'json',
    success: function (data) {
      for (var i in data.items) {
        this.products.push(data.items[i]);
      }
    },
    context: this
  });
};