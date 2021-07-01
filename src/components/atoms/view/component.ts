import Component from 'Components/component'
import Router from 'Scripts/router'
import {PageTree, Fold} from 'Scripts/page-tree'

const querySelectorDeep = require('query-selector-shadow-dom').querySelectorDeep


class ViewAtom extends Component {
  content: string


  connectedCallback() {
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
    let hash = ''
    if (url.includes('#')) {
      const hashIndex = url.indexOf('#')
      hash = url.slice(hashIndex + 1)
      url = url.slice(0, hashIndex)
    }

    const page = this.loadPage(url)

    if (page) {
      this.content = page
      this.updateHTML()

      if (hash) {
        this.toAnchor(hash)
      } else {
        this.scrollIntoView()
      }
    }
  }

  loadPage (url: string): string {
    url = url || this.getAttribute('default')

    if (url[url.length - 1] === '/') url = url.slice(0, -1) // test/page/path/ --> test/page/path
    
    const page = PageTree.getByURL(url)
    if (page !== null) {
      if (PageTree.isFold(page)) {
        const firstChildPage = PageTree.getFirstChildPage(<Fold>page)
        if (firstChildPage !== null) {
          const path = PageTree.buildPathFromName(firstChildPage.name)
          Router.navigate(path)
        } else {
          Router.navigate(this.getAttribute('default'))
        }
      } else {
        return require('../../../pages/' + url + '.pug').default  // TODO relative path somehow to aliases
      }
    } else {
      Router.navigate(this.getAttribute('default'))
    }
  }

  toAnchor (anchor: string) {
    const anchorElement = querySelectorDeep(`#${anchor}`, this)
    if (anchorElement !== null) {
      anchorElement.scrollIntoView()
    }
  }
}


customElements.define('a-view', ViewAtom)
