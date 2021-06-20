import Component from 'Components/component'


@Component.load(require('./index.pug'), require('./styles.sass'))
class TitleMolecula extends Component {
  render () {
    return this.loadedHTML({
      content: this.innerHTML,
      hasId: this.id
    })
  }
}


customElements.define('m-title', TitleMolecula)
