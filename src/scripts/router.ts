/* global window, document */

export default class Router {
  root: string

  constructor (root: string) {
    this.root = root

    window.addEventListener('popstate', this.listener.bind(this))
  }

  listener (_: Event) {
    this.onnavigation(document.location.pathname)
  }

  navigate (url: string) {
    const state: object = {}
    const title: string = ''

    history.pushState(state, title, url)
    this.onnavigation(url)
  }

  onnavigation (url: string) {}
}
