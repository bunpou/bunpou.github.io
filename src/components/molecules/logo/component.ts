import Component from 'Components/component'


@Component.load(require('./index.pug'), require('./styles.sass'))
class LogoMolecula extends Component {}


customElements.define('m-logo', LogoMolecula)