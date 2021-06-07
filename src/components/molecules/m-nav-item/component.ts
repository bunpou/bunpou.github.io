import Component from 'Components/component'


@Component.load(require('./index.pug'), require('./styles.sass'))
class NavItemMolecula extends Component {
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