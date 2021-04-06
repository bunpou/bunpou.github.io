// global HTMLElement, ShadowRoot


export default class Component extends HTMLElement {
  shadow: ShadowRoot
  postConnectedCallback: Function

  connectedCallback () {
    this.shadow = this.attachShadow({mode: 'open'})

    this.updateInnerHTML()
    this.postConnectedCallback?.()
  }

  render (): string { return '' }

  updateInnerHTML () {
    this.shadow.innerHTML = this.render?.() || ''
  }

  static readFile (path: string): string {
    throw new Error('Method loadHTMLFromFile is not implemented.')
  }
}