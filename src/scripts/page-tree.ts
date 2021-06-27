export interface Page {
  name: string,
  title: string,
}
export interface Fold {
  name: string,
  title: string,
  children: Tree,
}
export type TreeElement = Page | Fold
export type Tree = TreeElement[]


export class PageTree {
  static tree: Tree = PageTree.generateTree((() => {
    const container = document.createElement('div')
    container.innerHTML = require('./page-tree.pug')({})
    return Array.from(container.children)
  })())

  static generateTree (nodes: Element[]): Tree {
    const tree: Tree = []
    nodes.forEach((node: HTMLElement) => {
      // TODO START Move this in nav
      // Making first ruby under to shortify writing of pages
      const firstChild = node.children[0]
      if (firstChild && firstChild.tagName === 'RUBY') {
        firstChild.className = 'under'
        const rt: HTMLElement = firstChild.children[firstChild.children.length - 1] as HTMLElement
        if (rt && rt.tagName === 'RT') {
          rt.style.rubyAlign = 'start'
        }
      }
      // ... TODO END

      if (node.tagName === 'PAGE') {
        tree.push({
          name: node.className,
          title: node.innerHTML
        })
      } else if (node.tagName === 'FOLD') {
        const nodeWithTitleOnly = node.cloneNode(true) as HTMLElement
        Array.from(nodeWithTitleOnly.children).forEach((child) => {
          if (child.tagName === 'PAGE' || child.tagName === 'FOLD' ) {
            nodeWithTitleOnly.removeChild(child)
          }
        })

        tree.push({
          name: node.className,
          title: nodeWithTitleOnly.innerHTML,
          children: node.children ? PageTree.generateTree(Array.from(node.querySelectorAll(':scope > fold, :scope > page'))) : [],
        })
      } else {
        throw `Wrong tree element tag name: ${node.tagName}`
      }
    })

    return tree
  }

  static buildPathFromName (name: string, tree: Tree = PageTree.tree, path: string = ''): string {
    for (let i = 0; i < tree.length; i++) {
      const treeElement = tree[i]
      const treeElementPath = path === '' ? treeElement.name : path + '/' + treeElement.name

      if (treeElement.name == name) return treeElementPath
      if (PageTree.isFold(treeElement)){
        const outputPath = this.buildPathFromName(name, (<Fold>treeElement).children, treeElementPath)
        if (outputPath) return outputPath 
      }
    }
  }
  
  static includesURL (url: string, root: Tree = PageTree.tree): boolean {
    const path = url.split('/')

    for (let i = 0; i < root.length; i++) {
      const treeElement = root[i];
      const isFold = PageTree.isFold(treeElement)

      if (path.length === 1 && path[0] == treeElement.name) {
        return true
      } else if (path.length !== 1 && isFold && path[0] == treeElement.name) {
        return PageTree.includesURL(path.slice(1).join('/'), (<Fold>treeElement).children)
      }
    }

    return false
  }

  static getByURL (url: string, root: Tree = PageTree.tree): TreeElement {
    const path = url.split('/')

    for (let i = 0; i < root.length; i++) {
      const treeElement = root[i];
      const isFold = PageTree.isFold(treeElement)

      if (path.length === 1 && path[0] == treeElement.name) {
        return treeElement
      } else if (path.length !== 1 && isFold && path[0] == treeElement.name) {
        return PageTree.getByURL(path.slice(1).join('/'), (<Fold>treeElement).children)
      }
    }

    return null
  }

  static isFold (treeElement: TreeElement): boolean {
    return treeElement.hasOwnProperty('children')
  }

  static isPage (treeElement: TreeElement): boolean {
    return !PageTree.isFold(treeElement)
  }

  static getFirstChildPage (fold: Fold): Page {
    for (let i = 0; i < fold.children.length; i++) {
      const foldChild = fold.children[i];
      const isPage = PageTree.isPage(foldChild)

      if (isPage) return foldChild
      else return PageTree.getFirstChildPage(<Fold>foldChild)
    }

    return null
  }

  static searchAll(searchText: string, root: Tree = PageTree.tree): TreeElement[] {
    return [] // TODO
  }
}
