import Component from 'Components/component'
import {PageTree, TreeElement} from 'Scripts/page-tree'


interface SearchResult {
  source: string,
  title: string,
  url: string
}
type SearchResults = SearchResult[]


@Component.load(require('./index.pug'), require('./styles.sass'))
class SearchMolecula extends Component {
  connectedCallback () {
    console.log(this.searchInBunpou('verbs'))
  }

  render () {
    return this.loadedHTML({})
  }

  searchInBunpou (searchText: string): SearchResults {
    const results: SearchResults = []

    const treeElements: TreeElement[] = PageTree.searchAll(searchText)
    treeElements.forEach((treeElement: TreeElement) => {
      results.push({
        source: 'Bunpou',
        title: treeElement.title,
        url: PageTree.buildPathFromName(treeElement.name)
      })
    })

    return results
  }
}


customElements.define('m-search', SearchMolecula)