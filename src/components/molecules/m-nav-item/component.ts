import Component from 'Components/component'


@Component.load(require('./index.pug'), require('./styles.sass'))
class NavItemMolecula extends Component {
  postConnectedCallback () {
    const header = this.shadow.querySelector('#header')

    header.addEventListener('click', (_) => {
      const navItems = this.querySelectorAll(':scope > m-nav-item')

      if (navItems.length !== 0) {
        if (this.getAttribute('open') !== null) {
          this.removeAttribute('open')
        } else {
          this.setAttribute('open', '')
        }
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