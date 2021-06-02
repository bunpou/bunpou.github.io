import Component from 'Components/component'
import Router from 'Scripts/router'


@Component.load(require('./index.pug'), require('./styles.sass'))
class LinkAtom extends Component {
  postConnectedCallback () {
    if (this.hasAttribute('to')) {
      this.addEventListener('click', () => {
        Router.navigate(this.getAttribute('to'))
      })
    }
  }
}


customElements.define('a-link', LinkAtom)
