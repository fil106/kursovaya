/** Класс Menu - глабольный класс для получения данных о пунктах меню из JSON
 ** и вывода меню на определенных страницах и местах **/
function Menu(page) {
  this.currPage = page;
  this.dataPath = ''; this.getDataPath();
  this.items = []; this.collectItems();
}

Menu.prototype.render = function (place) {
  var container = $('<div />', {class: 'container'});
  var ul = $('<ul />', {class: "header_menu"});

  for(var i=0; i < this.items.length; i++) {
    ul.append(this.singleItem(this.items[i]));
  }

  ul.appendTo(container);
  container.appendTo($(place));
};

Menu.prototype.singleItem = function (item) {
  var li = $('<li />');
  var a = $('<a />', {
    href: this.dataPath + item.href,
    text: item.name
  });

  var active = item.href.replace('html/', '');

  /** Если совпала открытая страница в браузере и текущая, генерируемая ссылка **/
  if(this.currPage === active) {
    a.addClass('active_item_menu');
  }

  a.appendTo(li);

  /** Если есть подменю, то начинаем его генерировать рекурсивной функцией **/
  if(item.hasOwnProperty('megamenu')) {
    li.addClass('show_megamenu');
    li.append(this.megaMenu());
  }

  return li;
};

/** Метод megaMenu это не subMenu! нужен для отрисовки красивого большого меню **/
Menu.prototype.megaMenu = function () {
  var megamenu = $('<div />', {
    class: 'megamenu'
  });
  var arrowUp = $('<div />', {
    class: 'arrow_up'
  });
  var headerMenuUnder = $('<div />', {
    class: 'header_menu_under'
  });



  arrowUp.appendTo(megamenu);
  headerMenuUnder.appendTo(megamenu);

  return megamenu;
};

Menu.prototype.megaMenuItem = function () {
  var item = $('<div />', {
    class: 'header_menu_item'
  });

  return item;
};

Menu.prototype.getDataPath = function () {
  if(this.currPage === 'index.html' || this.currPage === '') {
    this.dataPath = './';
  } else {
    this.dataPath = '../';
  }
  console.log('DataPathMenu',this.dataPath);
};

Menu.prototype.collectItems = function () {
  $.ajax({
    // method: 'GET' by default
    url: this.dataPath + 'data-json/menu.json',
    dataType: 'json',
    async: false,
    success: function (data) {
      for (var i in data.items) {
        this.items.push(data.items[i]);
      }
      console.log('Пришли данные меню: ',this.items);
    },
    context: this
  });
};