import Component from 'Components/component'


@Component.load(null, require('./styles.sass'))
class NavMolecule extends Component {}


customElements.define('m-nav', NavMolecule)