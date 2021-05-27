import Component from 'Components/component'
import Router from 'Scripts/router'


@Component.load(null, require('./styles.sass'))
class ViewAtom extends Component {
  content: string

  postConnectedCallback() {
    this.updateView(document.location.pathname.slice(1))

    Router.addNavigationListener((e: CustomEvent) => {
      const url = e.detail
      this.updateView(url)
    })
  }

  render (): string {
    return this.content
  }

  updateView (url: string) {
    this.content = this.loadPage(url)
    this.updateHTML()
  }

  loadPage (url: string): string {
    url = url || this.getAttribute('default')
    try {
      return require('../../../pages/' + url + '.pug').default
    } catch (error) {
      return require('../../../pages/' + this.getAttribute('default') + '.pug').default
    }
  }
}


customElements.define('a-view', ViewAtom)
