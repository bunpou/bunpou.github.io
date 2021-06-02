import Component from 'Components/component'


@Component.load(require('./index.pug'), require('./styles.sass'))
class ThemeChangerMolecula extends Component {}


customElements.define('m-theme-changer', ThemeChangerMolecula)