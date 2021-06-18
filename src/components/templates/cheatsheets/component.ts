import Component from 'Components/component'


@Component.load(require('./index.pug'), require('./styles.sass'))
class CheatsheetsTemplate extends Component {
  render () {
    return this.loadedHTML({
      'title': this.getAttribute('title'),
      'content': this.innerHTML
    })
  }
}


customElements.define('t-cheatsheets', CheatsheetsTemplate)