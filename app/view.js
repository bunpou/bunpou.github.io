export class View {
  constructor (prefix, suffix, node, defaultPage) {
    this.prefix = prefix
    this.suffix = suffix
    this.node = node
    this.defaultPage = defaultPage
  }

  update (URL) {
    const importpath = this.prefix + URL + '/' + this.suffix
    import(importpath)
      .then((Component) => {
        const page = document.createElement(Component.tag)
        while (this.node.lastElementChild) {
          this.node.removeChild(this.node.lastElementChild)
        }
        this.node.appendChild(page)
      })
      .catch((error) => {
        console.log(error)
        this.update(this.defaultPage)
      })
  }
}
