import Component from 'Components/component'


@Component.load(require('./index.pug'), require('./styles.sass'))
class MainOrganism extends Component {
  render () {
    return this.loadedHTML({})
  }
}


customElements.define('o-main', MainOrganism)