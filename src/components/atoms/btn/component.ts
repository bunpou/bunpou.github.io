import Component from 'Components/component'


@Component.load(require('./index.pug'), require('./styles.sass'))
class BtnAtom extends Component {}


customElements.define('a-btn', BtnAtom)
