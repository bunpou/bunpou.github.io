import Component from 'Components/component'


@Component.load(require('./index.pug'), require('./styles.sass'))
class HeaderOrganism extends Component {
  connectedCallback () {
    Component.connectGlobalAttribute(this, 'menu-open')
  }

  render () {
    return this.loadedHTML({})
  }
}


customElements.define('o-header', HeaderOrganism)