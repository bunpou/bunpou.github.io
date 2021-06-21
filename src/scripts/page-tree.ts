interface Page {
  name: string,
  title: string,
}
interface Fold {
  name: string,
  title: string,
  tree: Tree,
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
          tree: node.children ? PageTree.generateTree(Array.from(node.querySelectorAll(':scope > fold, :scope > page'))) : [],
        })
      } else {
        throw `Wrong tree element tag name: ${node.tagName}`
      }
    })

    return tree
  }
}
