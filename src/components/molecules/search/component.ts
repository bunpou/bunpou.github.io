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
    this.search('verbs', console.log)
  }

  render () {
    return this.loadedHTML({})
  }

  search (querry: string, callback: Function) {
    const results: SearchResults = []

    // TODO Add other sites in querry
    fetch("https://google-search3.p.rapidapi.com/api/v1/search/q=%253Asite+www.imabi.net+verbs&sxsrf=ALeKk003_zOL3DXLDyKkVLQARsDERXgJhQ%253A1624799481210&source=hp&ei=-XjYYL_jCsXIgQaVxp2IAg&iflsig=AINFCbYAAAAAYNiHCVIVChlEFvsE6OIsjW_KVo5SZEce&oq=%253Asite+www.imabi.net+verbs&gs_lcp=Cgdnd3Mtd2l6EAMyBAgjECc6BwgjEOoCECdQvwdYvwdg6wloAXAAeACAAXKIAXKSAQMwLjGYAQCgAQKgAQGqAQdnd3Mtd2l6sAEK&sclient=gws-wiz&ved=0ahUKEwj_w6Df8bfxAhVFZMAKHRVjByEQ4dUDCAc&uact=5", {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "a7567f45d9msh257ea58e39fe872p1a4fcfjsnc14e05822496",
        "x-rapidapi-host": "google-search3.p.rapidapi.com"
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
    })
    .catch(error => {
      console.log(error)
      console.log('Google API limit is reached I guess :c');
    })

    callback(results)
  }

  searchInBunpou (searchText: string): SearchResults {
    // Will be used in future when I move from Google API to local side engines

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