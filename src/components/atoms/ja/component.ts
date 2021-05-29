import Component from 'Components/component'


@Component.load(require('./index.pug'), require('./styles.sass'))
class JaAtom extends Component {
  /*
    Atom is used for showing japanese text

    Attributes:
      content - japanese text
      over, o - furigana
      under, u - like furigana but below, mainly used for translations
    
    TODO:
      1) Syntax parsing for easier writing under and over text
        a-btn(nav='home') #[a-ja(u='home' o=' ') ホーム]
        a-btn(nav='home') #[a-ja ホーム_home]

        a-btn(nav='contribute') #[a-ja(u='contribute') #[a-ja(o='こうけん') 貢献]する]
        a-btn(nav='contribute') #[a-ja 貢献[こうけん]する_contribute]
  */

  render (): string {
    return this.loadedHTML({
      content: this.innerHTML,
      under: this.getAttribute('under') || this.getAttribute('u'),
      over: this.getAttribute('over') || this.getAttribute('o')
    })
  }
}


customElements.define('a-ja', JaAtom)
