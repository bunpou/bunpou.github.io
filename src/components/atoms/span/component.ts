import Component from 'Components/component'


@Component.load(require('./index.pug'), require('./styles.sass'))
class SpanAtom extends Component {}


customElements.define('a-span', SpanAtom)
