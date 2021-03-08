# global customElements

import { Component } from '/components/component.min.js'
import '/components/atoms/anchor/a-anchor.min.js'

class SearcherPage extends Component
  render: ->
    '''
    <div>Searcher Page</div>
    <div onclick="document.router.navigate('/home')">Go Home</div>
    '''

export tag = 'p-searcher'
customElements.define(tag, SearcherPage)