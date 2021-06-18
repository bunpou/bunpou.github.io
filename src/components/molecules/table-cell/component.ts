import Component from 'Components/component'


@Component.load(require('./index.pug'), require('./styles.sass'))
class TableCellMolecula extends Component {
  static get observedAttributes() {
    return ['rspan', 'cspan'] // h1, h2
  }

  attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    switch (name) {
      case 'rspan':
        if (newValue !== 'rspan') {
          this.style.gridRow = `span ${newValue}`
        } else {
          this.style.gridColumn = '1 / -1'
        }
        break
      case 'cspan':
        if (newValue !== 'cspan') {
          this.style.gridColumn = `span ${newValue}`
        } else {
          this.style.gridRow = '1 / -1'
        }
        break
    }
  }
}


customElements.define('m-table-cell', TableCellMolecula)