function Menu(page) {
  this.currPage = page;
  this.dataPath = ''; this.getDataPath();
  this.items = []; this.collectItems();
}

Menu.prototype.getDataPath = function () {
  if(this.currPage === 'index.html' || this.currPage === '') {
    this.dataPath = './';
  } else {
    this.dataPath = '../';
  }
  console.log('DataPath',this.dataPath);
};

Menu.prototype.collectItems = function () {
  $.ajax({
    // method: 'GET' by default
    url: this.dataPath + 'data-json/menu.json',
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