import { LitElement, html } from 'https://unpkg.com/lit-element@2.1.0/lit-element.js?module'
import { unsafeHTML } from 'https://unpkg.com/lit-html@1.3.0/directives/unsafe-html.js?module'
import Navigo from 'https://unpkg.com/navigo@7.1.2/lib/navigo.es.js'
/* global customElements, fetch */

class AppPage extends LitElement {
  static get properties () {
    return { innerHTML: { type: String } }
  }

  constructor () {
    super()

    const root = '/'
    const useHash = true
    const hash = '#'
    const router = new Navigo(root, useHash, hash)

    router
      .on('*', () => {
        let pathname = document.location.pathname

        if (pathname === '/') {
          pathname = '/home'
        }

        const URL = './pages' + pathname + '/page.html'
        this.loadPage(URL)
      })
      /*
      .on('/home', () => {
        this.innerHTML = html`<div>HOME TEST</div>` // this.loadPage('./pages/home/page.html')
      })
      .on('/reader', () => {
        this.innerHTML = html`<div>READER TEST</div>` // this.loadPage('./pages/reader/page.html')
      })
      */

    router.resolve()
  }

  render () {
    return html`<div>${this.innerHTML}</div>`
  }

  loadPage (URL) {
    fetch(URL).then(response => {
      response.text().then(text => {
        this.innerHTML = html`${unsafeHTML(text)}`
      })
    })
  }
}

customElements.define('app-page', AppPage)
