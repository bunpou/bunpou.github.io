import Component from 'Components/component'


@Component.load(require('./index.pug'), require('./styles.sass'))
class TableCellMolecula extends Component {}


customElements.define('m-table-cell', TableCellMolecula)