import Component from 'Components/component'


@Component.load(require('./index.pug'), require('./styles.sass'))
class BreadcrumbsMolecula extends Component {
  render () {
    return this.loadedHTML({})
  }
}


customElements.define('m-breadcrumbs', BreadcrumbsMolecula)