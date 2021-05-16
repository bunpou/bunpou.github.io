// global customElements
import Component from 'Components/component'


var css = require('./styles.sass')
var html = require('./index.pug')

class TableAtom extends Component {
  styles (): string {
    return css
  }

  render (): string {
    return html({content: 'test'})
  }
}

customElements.define('a-table', TableAtom)

