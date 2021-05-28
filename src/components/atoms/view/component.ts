import Component from 'Components/component'
import Router from 'Scripts/router'


class ViewAtom extends Component {
  content: string


  postConnectedCallback() {
    Router.addNavigationListener((e: CustomEvent) => {
      const url = e.detail
      this.updateView(url)
    })

    this.updateView(document.location.pathname.slice(1))
  }

  render (): string {
    return this.content
  }

  updateView (url: string) {
    const page = this.loadPage(url)
    if (page) {
      this.content = page
      this.updateHTML()
    }
  }

  loadPage (url: string): string {
    url = url || this.getAttribute('default')
    
    try {
      return require('../../../pages/' + url + '.pug').default  // TODO relative path somehow to aliases
    } catch (_) {
      Router.navigate(this.getAttribute('default'))
    }
  }
}


customElements.define('a-view', ViewAtom)
