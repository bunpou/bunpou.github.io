import Component from 'Components/component'


@Component.load(require('./index.pug'), require('./styles.sass'))
class SearchMolecula extends Component {}


customElements.define('m-search', SearchMolecula)