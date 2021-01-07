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
    const useHash = false
    const defaultPage = '/home'

    this.router = new Navigo(root, useHash)

    this.router
      .on('*', () => {
        let pathname = document.location.pathname

        if (pathname === '/') {
          pathname = defaultPage
        }

        const URL = './pages' + pathname + '/page.html'

        this.loadPage(URL, defaultPage)
      })
      .resolve()
  }

  render () {
    return html`<div>${this.innerHTML}</div>`
  }

  loadPage (URL, defaultPage = '/index.html') {
    fetch(URL)
      .then(response => {
        if (response.ok) {
          response.text().then(text => {
            this.innerHTML = html`${unsafeHTML(text)}`
          })
        } else if (URL !== defaultPage) {
          this.router.navigate(defaultPage.slice(1)) // '/home' -> 'home', otherwise error
        } else {
          throw new Error('Page loading error')
        }
      })
  }
}

customElements.define('app-page', AppPage)
