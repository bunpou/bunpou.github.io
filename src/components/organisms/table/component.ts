import Component from 'Components/component'


@Component.load(require('./index.pug'), require('./styles.sass'))
class TableOrganism extends Component {
  static get observedAttributes() {
    return ['cols', 'rows']
  }

  attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    const table: HTMLElement = this.shadow.querySelector('#table')
    switch (name) {
      case 'cols':
        table.style.gridTemplateColumns = `repeat(${newValue}, fit-content(0)`
        break
      case 'rows':
        table.style.gridTemplateRows = `repeat(${newValue}, fit-content(0)`
        break
    }
  }
}


customElements.define('o-table', TableOrganism)
