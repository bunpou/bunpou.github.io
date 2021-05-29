import Component from 'Components/component'
import Router from 'Scripts/router'


@Component.load(null, require('./styles.sass'))
class BtnAtom extends Component {
  postConnectedCallback () {
    if (this.hasAttribute('nav')) {
      this.addEventListener('click', () => {
        Router.navigate(this.getAttribute('nav'))
      })
    }
  }

  render (): string {
    return this.loadedHTML({content: this.innerHTML})
  }
}


customElements.define('a-btn', BtnAtom)
