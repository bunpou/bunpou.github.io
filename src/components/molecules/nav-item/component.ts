import Component from 'Components/component'

const querySelectorDeep = require('query-selector-shadow-dom').querySelectorDeep


@Component.load(require('./index.pug'), require('./styles.sass'))
class NavItemMolecula extends Component {
  postConnectedCallback () {
    const header = this.shadow.querySelector('#header')

    header.addEventListener('click', (_) => {
      const navItems = this.querySelectorAll(':scope > m-nav-item')

      if (navItems.length !== 0 && this.getAttribute('to') == null) {
        if (this.getAttribute('open') !== null) {
          this.removeAttribute('open')
        } else {
          this.setAttribute('open', '')
        }
      }

      const isLinkToSmth = querySelectorDeep('a-link', this).hasAttribute('to')
      const isMobile = window.matchMedia('(max-width: 992px)').matches // TODO Remove magic number

      if (isLinkToSmth && isMobile) {
        document.documentElement.setAttribute('data-menu-open', 'false')
      }
      
    })
  }

  render () {
    const content = Array.from(this.querySelectorAll(':scope > :not(m-nav-item)')).map(value => value.outerHTML).join('')
    const navItems = Array.from(this.querySelectorAll(':scope > m-nav-item')).map(value => value.outerHTML).join('')

    return this.loadedHTML({
      'to': this.getAttribute('to'),
      'content': content,
      'navItems': navItems,
    })
  }
}


customElements.define('m-nav-item', NavItemMolecula)