import Component from 'Components/component'


@Component.load(require('./index.pug'), require('./styles.sass'))
class HeaderOrganism extends Component {}


customElements.define('o-header', HeaderOrganism)