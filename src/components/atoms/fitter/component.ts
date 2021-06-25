import Component from 'Components/component'


@Component.load(null, require('./styles.sass'))
class FitterAtom extends Component {
  connectedCallback () {
    window.addEventListener('resize', this.fit.bind(this))
    setTimeout(this.fit.bind(this), 0) // TODO Make this work without setTimeout. It may cause problems with
    // loading pages with hashes as they will move and fitter will resize and position will be wrong
  }

  render () {
    return this.children[0].outerHTML
  }

  fit () {
    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i]
      this.shadow.innerHTML = child.outerHTML

      if (!FitterAtom.isOverflown(this)) break
    }
  }

  static isOverflown(element: HTMLElement) {
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth
  }
}


customElements.define('a-fitter', FitterAtom)
