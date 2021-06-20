import Component from 'Components/component'
import LinkAtom from 'Atoms/link/component'


@Component.load(require('./index.pug'), require('./styles.sass'))
class BreadcrumbsMolecula extends Component {
  connectedCallback () {
    this.updateBreadcrumbs(document.location.pathname.split('/').slice(1))
  }

  render () {
    return this.loadedHTML({})
  }

  updateBreadcrumbs (breadcrumbs: string[]) {
    const breadcrumbsDiv = this.shadow.querySelector('#breadcrumbs')
    for (let i = 0; i < breadcrumbs.length; i++) {
      const breadcrumb = breadcrumbs[i]

      const breadcrumbPath = breadcrumbs.slice(0, i + 1).join('/')
      const breadcrumbTitle = breadcrumb[0].toUpperCase() + breadcrumb.slice(1).toLowerCase().split('-').join(' ')

      const breadcrumbElement = document.createElement('div')

      const link = new LinkAtom()
      link.innerHTML = breadcrumbTitle
      link.setAttribute('to', breadcrumbPath)
      link.update()

      breadcrumbElement.appendChild(link)
      breadcrumbsDiv.appendChild(breadcrumbElement)
    }
  }
}


customElements.define('m-breadcrumbs', BreadcrumbsMolecula)