import Component from 'Components/component'


@Component.load(require('./index.pug'), require('./styles.sass'))
class JaAtom extends Component {
  render (): string {
    return this.loadedHTML({content: this.innerHTML})
  }
}


customElements.define('a-ja', JaAtom)
