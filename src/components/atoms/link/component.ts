import Component from 'Components/component'
import Router from 'Scripts/router'


@Component.load(require('./index.pug'), require('./styles.sass'))
export default class LinkAtom extends Component {
  static get observedAttributes() {
    return ['to', 'href']
  }

  attributeChangedCallback(name: string, _: any, __: any) {
    const a = this.shadow.querySelector('a')

    if (name === 'to') {
      this.removeEventListener('click', this.processClickForLocalLink)
      a.href = '/' + this.getAttribute('to')
      this.addEventListener('click', this.processClickForLocalLink)
    } else if (name === 'href') {
      this.removeEventListener('click', this.processClickForOuterLink)
      a.href = this.getAttribute('href')
      this.addEventListener('click', this.processClickForOuterLink)
    }
  }

  processClickForLocalLink (event: Event) {
    const self: HTMLElement = event.currentTarget as HTMLElement
    Router.navigate(self.getAttribute('to'))
    event.preventDefault()
  }

  processClickForOuterLink (event: Event) {
    const self: HTMLElement = event.currentTarget as HTMLElement
    window.open(self.getAttribute('href'), '_blank').focus()
    event.preventDefault()
  }

  updateContent (innerHTML: string) {
    const a = this.shadow.querySelector('a')
    a.innerHTML = innerHTML
  }
}


customElements.define('a-link', LinkAtom)
