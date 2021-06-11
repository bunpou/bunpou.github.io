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
        
        if (isLinkToSmth) {
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
}


customElements.define('o-nav', NavOrganism)