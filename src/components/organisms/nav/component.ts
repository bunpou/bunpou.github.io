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
    this.buildFromTree(this.shadow.querySelector('nav'), PageTree.tree, document.location.pathname.slice(1).split('/'))
  }

  buildFromTree (root: HTMLElement, tree: Tree, activeItemPath: string[] = null) {
    tree.forEach((treeElement) => {
      const isFold = PageTree.isFold(treeElement)

      const navItem = this.buildNavItem(isFold, treeElement, activeItemPath)

      root.appendChild(navItem)

      this.navItems.push(navItem)
      if (isFold) {
        this.folds.push(navItem)
      } else {
        this.pages.push(navItem)
      }
    })
  }

  buildNavItem (isFold: boolean, treeElement: Page|Fold, activeItemPath: string[]) {
    const navItem = document.createElement('div')
    navItem.classList.add(isFold ? 'fold' : 'page')

    if (activeItemPath[0] == treeElement.name) {
      if (isFold) {
        navItem.classList.add('open')
      } else {
        navItem.classList.add('active')
      }
      
    }

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
      const accordeon = this.buildNavItemAccordeon(treeElement, activeItemPath)
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

  buildNavItemAccordeon (treeElement: Page|Fold, activeItemPath: string[]): HTMLElement {
    const accordeon = document.createElement('div')
    accordeon.classList.add('accordeon')
    this.buildFromTree(accordeon, (<Fold>treeElement).children, activeItemPath.slice(1))

    return accordeon
  }

  render () {
    return '<nav></nav>'
  }
}


customElements.define('o-nav', NavOrganism)