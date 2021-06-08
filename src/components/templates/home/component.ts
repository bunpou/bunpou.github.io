import Component from 'Components/component'


@Component.load(require('./index.pug'), require('./styles.sass'))
class HomeTemplate extends Component {
  render (): string {
    return this.loadedHTML({
      title: this.getAttribute('title')
    })
  }
}


customElements.define('t-home', HomeTemplate)