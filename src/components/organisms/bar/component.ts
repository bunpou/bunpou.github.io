import Component from 'Components/component'


@Component.load(require('./index.pug'), require('./styles.sass'))
class BarOrganism extends Component {}


customElements.define('o-bar', BarOrganism)