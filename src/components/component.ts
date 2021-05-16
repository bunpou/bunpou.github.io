// global HTMLElement, ShadowRoot


export default class Component extends HTMLElement {
  shadow: ShadowRoot
  postConnectedCallback: Function

  connectedCallback () {
    this.shadow = this.attachShadow({mode: 'open'})

    this.updateInnerHTML()
    this.updateStyles()

    this.postConnectedCallback?.()
  }

  render (): string { return '' }
  styles (): string { return '' }

  updateStyles () {
    let style = document.createElement('style')
    style.textContent = this.styles?.() || ''
    this.shadow.appendChild(style)
  }

  updateInnerHTML () {
    this.shadow.innerHTML = this.render?.() || ''
  }
}