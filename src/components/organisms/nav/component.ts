import Component from 'Components/component'

const querySelectorAllDeep = require('query-selector-shadow-dom').querySelectorAllDeep
const querySelectorDeep = require('query-selector-shadow-dom').querySelectorDeep


@Component.load(require('./index.pug'), require('./styles.sass'))
class NavOrganism extends Component {
  postConnectedCallback () {
    const navItems = querySelectorAllDeep('m-nav-item')

    navItems.forEach((navItem: HTMLElement) => {
      navItem.addEventListener('click', (e) => {
        const isLinkToSmth = querySelectorDeep('a-link', navItem).hasAttribute('to')
        const isAnchor = navItem.getAttribute('anchor') !== null
        
        console.log(isLinkToSmth, isAnchor);
        
        if (isLinkToSmth && !isAnchor) {
          navItems.forEach((otherNavItem: HTMLElement) => {
            otherNavItem.removeAttribute('active')
          })
          navItem.setAttribute('active', '')
        }

        e.preventDefault()
        e.stopPropagation()
      })
    })
  }

  render () {
    return this.loadedHTML({})
  }
}


customElements.define('o-nav', NavOrganism)