/* global HTMLElement, customElements */

export const tag = 'reader-page'
customElements.define(tag, class ReaderPage extends HTMLElement {
  connectedCallback () {
    const shadow = this.attachShadow({ mode: 'open' })

    shadow.innerHTML = `
    <div>Reader Page</div>
    <div onclick="document.router.navigate('/home')">Go Home</div>`
  }
})
