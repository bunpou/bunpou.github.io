import Component from 'Components/component'
import {PageTree, TreeElement} from 'Scripts/page-tree'
import ALink from 'Atoms/link/component'


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
    if (querry === 'verbs') {
      callback([
        {
          source: 'Imabi',
          title: '- Regular Verbs I - IMABI!',
          link: 'https://www.imabi.net/regularverbsi.htm'
        },
        {
          source: 'Tae Kim',
          title: 'Verb Basics – Learn Japanese',
          link: 'http://www.guidetojapanese.org/learn/grammar/verbs'
        },
        {
          source: 'Bunpou',
          title: 'Verbs',
          link: 'cheatsheets/verbs'
        },
      ])
    } else {
      callback([])
    }

    /*
    const results: SearchResults = []

    fetch(`https://google-search3.p.rapidapi.com/api/v1/search/q=${encodeURIComponent(querry)}+site%253Awww.imabi.net+%7C+site%253Awww.guidetojapanese.org+%7C+site%253Awww.bunpou.github.io`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "1b2764380bmsh5f3b93446957eaap11524fjsnf6db5ff591b2",
        "x-rapidapi-host": "google-search3.p.rapidapi.com"
      }
    })
    .then(response => response.json())
    .then((data: {results: []}) => {
      data.results.forEach((result: {title: string, link: string}) => {
        results.push({
          source: 'test',
          title: result.title,
          link:  result.link
        })
      })
    })
    .catch(error => {
      console.log(error)
      console.log('Google API limit is reached I guess :c');
    })

    callback(results)
    */
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