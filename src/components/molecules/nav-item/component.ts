import Component from 'Components/component'

const querySelectorDeep = require('query-selector-shadow-dom').querySelectorDeep


@Component.load(require('./index.pug'), require('./styles.sass'))
class NavItemMolecula extends Component {
  link: string
  header: string
  accordeon: string


  connectedCallback () {
    this.processAttrs()
    this.update()
    this.processPath()
    this.processOnclick()
  }

  processAttrs () {
    const clone: HTMLElement = this.cloneNode(true) as HTMLElement // It works, believe me
    clone.querySelectorAll('m-nav-item').forEach((navItem) => {
      if (clone.contains(navItem)) {
        clone.removeChild(navItem)
      }
    })

    this.header = clone.innerHTML

    const navItems = Array.from(this.querySelectorAll(':scope > m-nav-item')).map(value => value.outerHTML).join('')
    this.accordeon = navItems
  }

  processOnclick () {
    const header = this.shadow.querySelector('#header')

    header.addEventListener('click', (_) => {
      const navItems = this.querySelectorAll(':scope > m-nav-item')

      if (navItems.length !== 0 && (this.getAttribute('to') == null || this.getAttribute('not-a-link') !== null)) {
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

  processPath () {
    this.link = this.hasAttribute('path') ? this.getAttribute('path') + '/' + this.getAttribute('to') : this.getAttribute('to')

    const accordeon = this.shadow.querySelector('#accordeon')
    if (accordeon) {
      const navItems = accordeon.children

      Array.from(navItems).forEach((navItem: NavItemMolecula) => {
        navItem.setAttribute('path', this.link)
        navItem.processPath()
      })
    }

    querySelectorDeep('a-link', this).setAttribute('to', this.link)
  }

  render () {
    return this.loadedHTML({
      'link': this.hasAttribute('not-a-link') ? null : this.link,
      'header': this.header,
      'accordeon': this.accordeon,
    })
  }
}


customElements.define('m-nav-item', NavItemMolecula)