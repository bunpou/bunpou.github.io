import { LitElement, html } from 'https://unpkg.com/lit-element@2.1.0/lit-element.js?module'
/* global customElements */

class TestElement extends LitElement {
  render () {
    return html`<div>Text from web-component</div>`
  }
}

customElements.define('test-element', TestElement)
