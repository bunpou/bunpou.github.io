import Component from 'Components/component'


@Component.load(require('./index.pug'), require('./styles.sass'))
class ThemeChangerMolecula extends Component {
  connectedCallback () {
    this.setAttribute('light', '')

    this.addEventListener('click', (_) => {
      this.toggleAttribute('light')
      this.toggleAttribute('dark')
      
      const html = document.documentElement
      const htmlDataTheme = html.getAttribute('data-theme')
      document.documentElement.setAttribute('data-theme', htmlDataTheme == 'light' ? 'dark' : 'light')
    })
  }

  render () {
    return this.loadedHTML({})
  }
}


customElements.define('m-theme-changer', ThemeChangerMolecula)