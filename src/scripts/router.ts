/* global window, document */

export default class Router {
  root: string
  eventName: string

  constructor (root: string) {
    this.root = root
    this.eventName = 'navigation'
  }

  navigate (url: string) {
    /* Manually triggers navigation event */

    const state: object = {}
    const title: string = ''

    history.pushState(state, title, url)

    window.dispatchEvent(new CustomEvent(this.eventName, {'detail': url}))
  }

  addNavigationListener (callback: (event: Event) => void) {
    /* Adds listeners for navigation events */

    window.addEventListener('popstate', (_: Event) => {
      window.dispatchEvent(new CustomEvent(this.eventName, {'detail': document.location.pathname}))
    })
    window.addEventListener(this.eventName, callback.bind(this))
  }
}
