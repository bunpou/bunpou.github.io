import Component from 'Components/component'


@Component.load(require('./index.pug'), require('./styles.sass'))
class TableOrganism extends Component {
  static get observedAttributes() {
    return ['cols', 'rows', 'mobile', 'desktop']
  }

  attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    console.log(name, oldValue, newValue)
  }
}


customElements.define('o-table', TableOrganism)
