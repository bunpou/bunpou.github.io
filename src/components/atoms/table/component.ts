import Component from 'Components/component'


@Component.load(require('./index.pug'), require('./styles.sass'))
class TableAtom extends Component {}


customElements.define('a-table', TableAtom)
