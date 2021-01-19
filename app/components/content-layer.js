/* global customElements, fetch, HTMLElement */

class ContentLayer extends HTMLElement {
  changePageTo (URL, defaultPage = '/index.html') {
    fetch(URL)
      .then(response => {
        if (response.ok) {
          response.text().then(text => {
            this.innerHTML = text
          })
        } else if (URL !== defaultPage) {
          document.router.navigate(defaultPage.slice(1)) // '/home' -> 'home', otherwise error
          document.router.updatePageLinks()
        } else {
          throw new Error('Page loading error')
        }
      })
  }
}

customElements.define('content-layer', ContentLayer)
