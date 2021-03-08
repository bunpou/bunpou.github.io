# global customElements

import { Component } from '/components/component.min.js'
import '/components/atoms/anchor/a-anchor.min.js'

class HomePage extends Component
  link: ->
    '/components/pages/home/p-home.min.css'

  render: ->
    '''
    <div>Home Page</div>
    <div onclick="document.router.navigate('/searcher')">Go to Searcher</div>
    <a-anchor href="/searcher">Awesome anchor to go to Searcher</a-anchor>
    '''

export tag = 'p-home'
customElements.define(tag, HomePage)
