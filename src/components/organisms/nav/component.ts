import LinkAtom from 'Atoms/link/component'
import Component from 'Components/component'
import {Tree, Page, Fold, PageTree} from 'Scripts/page-tree'


@Component.load(null, require('./styles.sass'))
class NavOrganism extends Component {
  navItems: HTMLElement[] = []
  pages: HTMLElement[] = []
  folds: HTMLElement[] = []
  activeNavItem: HTMLElement = undefined


  connectedCallback () {
    this.buildFromTree(this.shadow.querySelector('nav'), PageTree.tree)
  }

  buildFromTree (root: HTMLElement, tree: Tree) {
    tree.forEach((treeElement) => {
      const isFold = treeElement.hasOwnProperty('children')

      const navItem = this.buildNavItem(isFold, treeElement)

      root.appendChild(navItem)

      this.navItems.push(navItem)
      if (isFold) {
        this.folds.push(navItem)
      } else {
        this.pages.push(navItem)
      }
    })
  }

  buildNavItem (isFold: boolean, treeElement: Page|Fold) {
    const navItem = document.createElement('div')
    navItem.classList.add(isFold ? 'fold' : 'page')

    const title = this.buildNavItemTitle(isFold, treeElement)
    navItem.appendChild(title)

    if (isFold) {
      title.addEventListener('click', (_) => {
        if (navItem.classList.contains('open')) {
          navItem.classList.remove('open')
        } else {
          navItem.classList.add('open')
        }
      })
    } else {
      title.addEventListener('click', (_) => {
        const isMobile = window.matchMedia('(max-width: 992px)').matches // TODO Remove magic number
  
        if (isMobile) {
          document.documentElement.setAttribute('data-menu-open', 'false')
        }
      })
    }
    
    if (isFold) {
      const accordeon = this.buildNavItemAccordeon.bind(this)(treeElement)
      navItem.appendChild(accordeon)
    }

    if (!isFold) {
      navItem.addEventListener('click', (e) => {
        this.activeNavItem?.classList.remove('active')
        this.activeNavItem = navItem
        navItem.classList.add('active')

        e.preventDefault()
        e.stopPropagation()
      })
    }

    return navItem
  }

  buildNavItemTitle (isFold: boolean, treeElement: Page|Fold): HTMLElement {
    const title = document.createElement('div')
    title.classList.add('title')

    const link = this.buildTitleLink(isFold, treeElement)
    title.appendChild(link)

    return title
  }

  buildTitleLink (isFold: boolean, treeElement: Page|Fold): HTMLElement {
    const link = document.createElement('a-link') as LinkAtom
    link.setAttribute('block', '')
    if (!isFold) {
      const path = PageTree.buildPathFromName(PageTree.tree, treeElement.name)
      link.setAttribute('to', path)
    }
    link.innerHTML = treeElement.title
    link.update()

    return link
  }

  buildNavItemAccordeon (treeElement: Page|Fold): HTMLElement {
    const accordeon = document.createElement('div')
    accordeon.classList.add('accordeon')
    this.buildFromTree(accordeon, (<Fold>treeElement).children)

    return accordeon
  }

  render () {
    return '<nav></nav>'
  }
}


customElements.define('o-nav', NavOrganism)