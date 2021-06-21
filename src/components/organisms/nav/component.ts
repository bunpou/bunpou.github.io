import LinkAtom from 'Atoms/link/component'
import Component from 'Components/component'
import {Tree, PageTree} from 'Scripts/page-tree'

/* Do I need these ? */
const querySelectorAllDeep = require('query-selector-shadow-dom').querySelectorAllDeep
const querySelectorDeep = require('query-selector-shadow-dom').querySelectorDeep


@Component.load(null, require('./styles.sass'))
class NavOrganism extends Component {
  navItems: HTMLElement[] = []


  connectedCallback () {
    this.buildNavFromTree(this.shadow.querySelector('nav'), PageTree.tree)

    /*
    const navItems = querySelectorAllDeep('m-nav-item')

    navItems.forEach((navItem: HTMLElement) => {
      navItem.addEventListener('click', (e) => {
        const isLinkToSmth = querySelectorDeep('a-link', navItem).hasAttribute('to')
        const isAnchor = navItem.getAttribute('anchor') !== null
        
        if (isLinkToSmth && !isAnchor) {
          navItems.forEach((otherNavItem: HTMLElement) => {
            otherNavItem.removeAttribute('active')
          })
          navItem.setAttribute('active', '')
        }

        e.preventDefault()
        e.stopPropagation()
      })
    })
    */
  }

  buildNavFromTree (root: HTMLElement, tree: Tree) {
    tree.forEach((treeElement) => {
      const isFold = treeElement.hasOwnProperty('tree')
      const element = document.createElement('div')
      element.className = isFold ? 'fold' : 'page'

      const title = document.createElement('div')
      title.className = 'title'
      const link = document.createElement('a-link') as LinkAtom
      link.setAttribute('to', treeElement.name) // PageTree.buildPath(treeElement)) // TODO Add this function
      link.setAttribute('block', '')
      link.innerHTML = treeElement.title
      link.update()
      title.appendChild(link)
      element.appendChild(title)

      if (isFold) {
        const accordeon = document.createElement('div')
        accordeon.className = 'accordeon'

        // TODO Process accordeon creation here...

        element.appendChild(accordeon)
      }

      this.navItems.push(element)
      root.appendChild(element)
    })

    console.log(this.navItems);
  }

  render () {
    return '<nav></nav>'
  }
}


customElements.define('o-nav', NavOrganism)