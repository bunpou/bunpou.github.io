/* globals history */

export class Router {
  constructor (root) {
    this.root = root
    this.onnavigation = null

    window.addEventListener('popstate', this.listener.bind(this))
  }

  listener (event) {
    document.router.onnavigation(document.location.pathname)
  }

  navigate (URL) {
    const state = {}
    const title = ''

    history.pushState(state, title, URL)
    this.onnavigation(URL)
  }
}

/*

const root = '/'
const useHash = false
const defaultPage = '/home'
const pageViewElement = document.getElementsByTagName('content-layer')[0]

document.router = new Navigo(root, useHash)
document.router
  .on('*', () => {
    // document.view.update(URL)
    let pathname = document.location.pathname
    console.log(document.location, pathname) // Ya manal etor router, chto-to s nim ne tak

    if (pathname === '/') {
      pathname = defaultPage
    }

    const URL = './pages' + pathname + '/page.html'
    pageViewElement.changePageTo(URL, defaultPage)
  })
  .resolve()

*/
