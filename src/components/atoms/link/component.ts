import Component from 'Components/component'
import Router from 'Scripts/router'


@Component.load(require('./index.pug'), require('./styles.sass'))
export default class LinkAtom extends Component {
  static get observedAttributes() {
    return ['to']
  }

  attributeChangedCallback(name: string, _: any, newValue: any) {
    this.removeEventListener('click', this.processClick)

    const a = this.shadow.querySelector('a')
    a.href = '/' + this.getAttribute('to')

    this.addEventListener('click', this.processClick)
  }

  processClick (event: Event) {
    const self: HTMLElement = event.currentTarget as HTMLElement
    Router.navigate(self.getAttribute('to'))
    event.preventDefault()
  }
}


customElements.define('a-link', LinkAtom)
