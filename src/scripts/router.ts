/* global window, document */

export default class Router {
  static instance: Router
  static eventName: string = 'navigation'


  constructor () {
    if (Router.instance) {
      return Router.instance
    }

    Router.instance = this;
  }

  static navigate (url: string) {
    /* Manually triggers navigation event */

    const state: object = {}
    const title: string = ''

    history.pushState(state, title, url)
    window.dispatchEvent(new CustomEvent(Router.eventName, {detail: url}))
  }

  static addNavigationListener (callback: (event: Event) => void) {
    /* Adds listeners for navigation events */

    window.addEventListener('popstate', (_: Event) => {
      window.dispatchEvent(new CustomEvent(Router.eventName, {detail: document.location.pathname.slice(1)}))
    })
    window.addEventListener(Router.eventName, callback)
  }
}
