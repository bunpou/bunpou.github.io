interface Locals {
  [key: string]: string
}

export default class Component extends HTMLElement {
  shadow: ShadowRoot
  loadedHTML (locals: Locals): string {return `<div id='content'>${locals.content}</div>`}
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

  onAttributeChange (attribute: string): void {}

  addAttributeObserver (callback: (attribute: string) => void) {
    this.onAttributeChange = callback || this.onAttributeChange
    Component.newAttributeObserver(this, (_: HTMLElement, attribute: string) => this.onAttributeChange(attribute))
  }

  static newAttributeObserver (object: HTMLElement, callback: (object: HTMLElement, attribute: string) => void): MutationObserver {
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type == "attributes") callback(object, mutation.attributeName)
      })
    })
    mutationObserver.observe(object, {attributes: true})

    return mutationObserver
  }

  static connectGlobalAttribute (objectToConnect: HTMLElement, globalAttribute: string) {
    Component.newAttributeObserver(document.documentElement, (object, attribute) => {
      if (attribute == `data-${globalAttribute}`) {
        objectToConnect.setAttribute(globalAttribute, object.getAttribute(attribute))
      }
    })
  }
}
