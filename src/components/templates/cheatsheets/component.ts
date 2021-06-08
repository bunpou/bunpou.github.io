import Component from 'Components/component'


@Component.load(null, require('./styles.sass'))
class CheatsheetsTemplate extends Component {}


customElements.define('t-cheatsheets', CheatsheetsTemplate)