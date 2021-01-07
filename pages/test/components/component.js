import { LitElement, html } from 'https://unpkg.com/lit-element@2.1.0/lit-element.js?module'

class TestElement extends LitElement {
  render () {
    return html`Text from loaded web-component`
  }
}

customElements.define('test-element', TestElement)
