import Component from 'Components/component'

const querySelectorDeep = require('query-selector-shadow-dom').querySelectorDeep


@Component.load(require('./index.pug'), require('./styles.sass'))
class MenuBtnMolecula extends Component {
  connectedCallback () {
    this.addEventListener('click', (_) => {
      const html = document.documentElement
      const htmlMenuOpen = html.getAttribute('data-menu-open')
      document.documentElement.setAttribute('data-menu-open', htmlMenuOpen == 'true' ? 'false' : 'true')
    })

    Component.connectGlobalAttribute(this, 'menu-open')
  }

  static get observedAttributes() {
    return ['menu-open']
  }

  attributeChangedCallback(name: string, _: any, newValue: any) {
    if (name == 'menu-open') {
      const menuOpen = newValue
      const icon : HTMLElement = querySelectorDeep('a-icon', this)

      icon.setAttribute(menuOpen == 'true' ? 'close' : 'menu', '')
      icon.removeAttribute(menuOpen == 'true' ? 'menu' : 'close')
    }
  }

  render () {
    return this.loadedHTML({})
  }
}


customElements.define('m-menu-btn', MenuBtnMolecula)