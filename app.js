import { LitElement, html } from 'https://unpkg.com/lit-element@2.1.0/lit-element.js?module'
import Navigo from 'https://unpkg.com/navigo@7.1.2/lib/navigo.es.js'
/* global customElements, DOMParser, fetch */

class AppPage extends LitElement {
  static get properties () {
    return { innerHTML: { type: Object } }
  }

  constructor () {
    super()

    this.parser = new DOMParser()

    const root = '/'
    const useHash = true
    const hash = '#'
    const router = new Navigo(root, useHash, hash)

    router
      .on('*', () => {
        const URL = './pages' + document.location.pathname + '/page.html'
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
    return html`<div>${this.innerHTML}</div>` // TODO: Check what render should return to render this correctly
  }

  loadPage (URL) {
    fetch(URL).then(response => {
      response.text().then(text => {
        this.innerHTML = this.parser.parseFromString(text, 'text/html')
        console.log(this.innerHTML)
      })
    })
  }
}

customElements.define('app-page', AppPage)
