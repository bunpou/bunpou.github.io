import Component from 'Components/component'


@Component.load(require('./index.pug'), require('./styles.sass'))
class HomeTemplate extends Component {
  render (): string {
    return this.loadedHTML({
      header: this.getAttribute('header'),
      info: this.getAttribute('info'),
      exploreButton: this.getAttribute('exploreButton')
    })
  }
}


customElements.define('t-home', HomeTemplate)