import Component from 'Components/component'


@Component.load(require('./index.pug'), require('./styles.sass'))
class ContainerAtom extends Component {}


customElements.define('a-container', ContainerAtom)
