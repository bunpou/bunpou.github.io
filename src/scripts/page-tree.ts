export interface Page {
  name: string,
  title: string,
}
export interface Fold {
  name: string,
  title: string,
  children: Tree,
}
export type Tree = (Page|Fold)[]


export class PageTree {
  static tree: Tree = PageTree.generateTree((() => {
    const container = document.createElement('div')
    container.innerHTML = require('./page-tree.pug')({})
    return Array.from(container.children)
  })())

  static generateTree (nodes: Element[]): Tree {
    const tree: Tree = []
    nodes.forEach((node: HTMLElement) => {
      // Making first ruby under to shortify writing of pages
      const firstChild = node.children[0]
      if (firstChild && firstChild.tagName === 'RUBY') {
        firstChild.className = 'under'
      }

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

  static buildPathFromName (tree: Tree, name: string, path: string = ''): string {
    for (let i = 0; i < tree.length; i++) {
      const treeElement = tree[i]
      const treeElementPath = path === '' ? treeElement.name : path + '/' + treeElement.name

      if (treeElement.name == name) return treeElementPath
      if (treeElement.hasOwnProperty('children')){
        return this.buildPathFromName((<Fold>treeElement).children, name, treeElementPath)
      }
    }
  }
}
