// Generated by CoffeeScript 2.5.1
export var View = class View {
  constructor(prefix, suffix, node, defaultPage) {
    this.prefix = prefix;
    this.suffix = suffix;
    this.node = node;
    this.defaultPage = defaultPage;
  }

  update(URL) {
    var pagePath;
    pagePath = this.prefix + URL + '/' + this.suffix;
    return import(pagePath).then((Component) => {
      var page;
      page = document.createElement(Component.tag);
      while (this.node.lastElementChild) {
        this.node.removeChild(this.node.lastElementChild);
      }
      return this.node.appendChild(page);
    }).catch((error) => {
      console.log(error);
      return this.update(this.defaultPage);
    });
  }

};

// TODO: AUTO MIN JS FROM COFFEE
