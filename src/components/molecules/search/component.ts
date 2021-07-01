import Component from 'Components/component'
import {PageTree, TreeElement} from 'Scripts/page-tree'
import ALink from 'Atoms/link/component'

import DB from 'Scripts/db'


interface SearchResult {
  source: string,
  title: string,
  link: string
}
type SearchResults = SearchResult[]


@Component.load(require('./index.pug'), require('./styles.sass'))
class SearchMolecula extends Component {
  connectedCallback () {
    const input = this.shadow.querySelector('#input')

    input.addEventListener('input', this.onInputChange.bind(this))
    input.addEventListener('focusin', this.onInputChange.bind(this))
    this.addEventListener('focusout', this.onInputFocusOut.bind(this))
  }

  render () {
    return this.loadedHTML({})
  }

  onInputChange (event: {target: {value: string}}) {
    const querry = event.target.value
    
    this.clearSearchResults()

    if (querry !== '') {
      this.search(querry, (results: SearchResults) => {
        if (results.length !== 0) {
          this.addResults(results)
          this.showResults()
        } else {
          this.hideResults()
        }
      })
    } else {
      this.hideResults()
    }
  }

  onInputFocusOut (_: Event) {
    this.clearSearchResults()
    this.hideResults()
  }

  search (querry: string, callback: Function) {
    callback(DB.search(querry, 5, ['title']))
  }

  addResults (results: SearchResults) {
    const list = this.shadow.querySelector('#list')

    const createLink = (url: string, text: string, isLocal: boolean = false, isCenter: boolean = false): ALink => {
      const link = document.createElement('a-link') as ALink
      
      link.setAttribute(isLocal ? 'to' : 'href', url)
      
      link.setAttribute('block', '')
      if (isCenter) link.setAttribute('center', '')
      link.updateContent(text)

      return link
    }

    results.forEach((result: SearchResult) => {
      const resultElement = document.createElement('div')
      resultElement.classList.add('result')
      list.appendChild(resultElement)

      const sourceElement = document.createElement('div')
      sourceElement.classList.add('source')
      sourceElement.appendChild(createLink(result.link, result.source, result.source === 'Bunpou', true))
      resultElement.appendChild(sourceElement)

      const titleElement = document.createElement('div')
      titleElement.classList.add('title')
      titleElement.appendChild(createLink(result.link, result.title, result.source === 'Bunpou'))
      resultElement.appendChild(titleElement)
    })
  }

  clearSearchResults () {
    this.shadow.querySelector('#list').innerHTML = ''
  }

  showResults () {
    const results = this.shadow.querySelector('#results') as HTMLElement
    results.style.display = 'flex'
  }

  hideResults () {
    const results = this.shadow.querySelector('#results') as HTMLElement
    results.style.display = 'none'
  }

  searchInBunpou (searchText: string): SearchResults {
    // Will be used in future when I move from Google API to local side engines

    const results: SearchResults = []

    const treeElements: TreeElement[] = PageTree.searchAll(searchText)
    treeElements.forEach((treeElement: TreeElement) => {
      results.push({
        source: 'Bunpou',
        title: treeElement.title,
        link: PageTree.buildPathFromName(treeElement.name)
      })
    })

    return results
  }
}


customElements.define('m-search', SearchMolecula)