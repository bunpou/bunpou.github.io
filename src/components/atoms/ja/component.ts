import Component from 'Components/component'


@Component.load(require('./index.pug'), require('./styles.sass'))
class JaAtom extends Component {
  /*
    Atom is used for showing japanese text

    Attributes:
      content - innerHTML
      under, u - like furigana but below, mainly used for translations
    
    Examples:
      a-ja(u='home') ホーム
      a-ja(u='cheatsheets') 表#[rt ひょう]か]

  */

  render (): string {
    return this.loadedHTML({
      content: this.innerHTML,
      under: this.getAttribute('under') || this.getAttribute('u'),
    })
  }
}


customElements.define('a-ja', JaAtom)
