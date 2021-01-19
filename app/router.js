import 'https://unpkg.com/navigo@8.3.2/lib/navigo.min.js'
// import Navigo from 'https://unpkg.com/navigo@7.1.2/lib/navigo.es.js'
/* global Navigo */

const root = '/'
const useHash = false
const defaultPage = '/home'
const pageViewElement = document.getElementsByTagName('content-layer')[0]

document.router = new Navigo(root, useHash)
document.router
  .on('*', () => {
    let pathname = document.location.pathname
    console.log(document.location, pathname) // Ya manal etor router, chto-to s nim ne tak

    if (pathname === '/') {
      pathname = defaultPage
    }

    const URL = './pages' + pathname + '/page.html'
    pageViewElement.changePageTo(URL, defaultPage)
  })
  .resolve()
