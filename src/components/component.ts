interface Locals {
  [key: string]: string
}

export default class Component extends HTMLElement {
  shadow: ShadowRoot
  loadedHTML (locals: Locals): string {return `<div>${locals.content}</div>`}
  loadedCSS (): string {return ''}

  postConnectedCallback () {}

  connectedCallback () {
    this.shadow = this.attachShadow({mode: 'open'})

    this.updateHTML()
    this.updateCSS()

    this.postConnectedCallback()
  }

  render (): string {
    // Post proccessing of loaded html

    return this.loadedHTML({content: this.innerHTML})
  }

  styles (): string {
    // Post proccessing of loaded css
    
    return this.loadedCSS()
  }

  updateCSS () {
    // Adds css to the component
    
    let style = document.createElement('style')
    style.textContent = this.styles()
    this.shadow.appendChild(style)
  }

  updateHTML () {
    // Adds html to the component

    this.shadow.innerHTML = this.render()
  }

  static load (loadedHTML: Function, loadedCSS: string) {
    // Decorator for loading html and css in component
    
    return function (constructor: Function) {
      constructor.prototype.loadedHTML = loadedHTML || constructor.prototype.loadedHTML
      constructor.prototype.loadedCSS = (() => {return loadedCSS}) || constructor.prototype.loadedCSS
    }
  }
}