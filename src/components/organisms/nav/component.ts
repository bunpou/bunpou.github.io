import Component from 'Components/component'


@Component.load(require('./index.pug'), require('./styles.sass'))
class NavOrganism extends Component {}


customElements.define('o-nav', NavOrganism)