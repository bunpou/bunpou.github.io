import Component from 'Components/component'
import Router from 'Scripts/router'


@Component.load(require('./index.pug'), require('./styles.sass'))
export default class LinkAtom extends Component {
  connectedCallback () {
    if (this.hasAttribute('to')) {
      const to = this.getAttribute('to')
      const a = this.shadow.querySelector('a')
      a.href = '/' + to

      this.addEventListener('click', (event) => {
        Router.navigate(to)
        event.preventDefault()
      })
    }
  }
}


customElements.define('a-link', LinkAtom)
