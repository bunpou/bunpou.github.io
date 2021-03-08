# global customElements

import { Component } from '/components/component.min.js'

class AnchorAtom extends Component
  render: ->
    '<div>' + @innerHTML + '</div>'

  postConnectedCallback: ->
    @shadow.addEventListener('click', (e) =>
      document.router.navigate(@getAttribute('href'))
    )

export tag = 'a-anchor'
customElements.define(tag, AnchorAtom)