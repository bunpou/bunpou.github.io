import Component from 'Components/component'

interface Icons {
  [key: string]: string
}


@Component.load(require('./index.pug'), require('./styles.sass'))
class IconAtom extends Component {
  icons: Icons = {
    'logo': require('Assets/logo.svg'),
    'menu': require('Assets/menu.svg'),
    'close': require('Assets/close.svg'),
    'search': require('Assets/search.svg'),
    'right-arrow': require('Assets/right-arrow.svg'),
  }


  postConnectedCallback () {
    this.addAttributeObserver(null)
  }

  render () {
    return this.loadedHTML({})
  }

  onAttributeChange () {
    Object.keys(this.icons).forEach((icon: string) => {
      if (this.getAttribute(icon) !== null) {
        this.setIcon(icon)
      }
    })
  }

  setIcon (name: string) {
    const icon = this.shadow.querySelector<HTMLElement>('#icon')
    icon.style.backgroundImage = 'url("' + this.icons[name] + '")'
  }
}


customElements.define('a-icon', IconAtom)
