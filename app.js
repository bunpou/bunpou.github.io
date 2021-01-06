import { LitElement, html } from 'https://unpkg.com/lit-element@2.1.0/lit-element.js?module'
import Navigo from 'https://unpkg.com/navigo@7.1.2/lib/navigo.es.js'
/* global customElements, fetch */

class AppPage extends LitElement {
  static get properties () {
    return { page: { type: Object } }
  }

  constructor () {
    super()

    const root = '/' // Change later if bugs occure
    const useHash = true
    const hash = '#'
    const router = new Navigo(root, useHash, hash)

    router
      .on('/home', () => {
        this.page = html`<div>HOME TEST</div>` // this.loadPage('home')
      })
      .on('/reader', () => {
        this.page = html`<div>READER TEST</div>` // this.loadPage('reader')
      })
      .on('*', () => { // Just send to a url that is '/pages/' + previousURL in ALL cases, not only '*'
        this.page = html`<div>ANY UNKNOWN PAGE TEST</div>` // this.loadPage('404')
      })

    router.resolve()
  }

  render () {
    return html`<div>${this.page}</div>`
  }

  async loadPage (pagePath) {
    const response = await fetch(`./pages/${pagePath}/index.html`)
    const text = await response.text()
    return text
  }
}

customElements.define('app-page', AppPage)
