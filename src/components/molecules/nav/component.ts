import Component from 'Components/component'


@Component.load(null, require('./styles.sass'))
class NavMolecule extends Component {
  postConnectedCallback () {
    Array.from(this.children).forEach(child => {
      if (child !== null && child.shadowRoot !== null) {
        // TODO: events doesn't work at all
        // google about shadow dom children shadow dom events
        child.addEventListener('click', (_) => {
          console.log(1);
        })
        child.shadowRoot.addEventListener('click', (e) => {
          const btn = <HTMLSelectElement> e.target
          console.log(2);
          
          
          if (!btn.hasAttribute('active')) {
            Array.from(this.children).forEach(child => {
              child.removeAttribute('active')
            })
            btn.setAttribute('active', '')
          }
        })
      }
    })
  }
}


customElements.define('m-nav', NavMolecule)