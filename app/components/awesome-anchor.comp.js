/* global HTMLElement, customElements */

customElements.define('awesome-anchor', class extends HTMLElement {
  connectedCallback () {
    const shadow = this.attachShadow({ mode: 'open' })

    shadow.innerHTML = '<div>' + this.innerHTML + '</div>'
    shadow.addEventListener('click', (e) => {
      this.onclick(e)
    })
  }

  onclick () {
    document.router.navigate(this.getAttribute('href'))
  }
})
