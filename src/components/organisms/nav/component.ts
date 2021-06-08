import Component from 'Components/component'


@Component.load(require('./index.pug'), require('./styles.sass'))
class NavOrganism extends Component {
  postConnectedCallback () {
    const navItems = this.shadow.querySelectorAll('m-nav-item')

    navItems.forEach((navItem) => {
      navItem.addEventListener('click', (_) => {
        navItem.setAttribute('active', '')
        navItems.forEach((navItem) => {
          navItem.removeAttribute('active')
        })
      })
    })
  }
}


customElements.define('o-nav', NavOrganism)