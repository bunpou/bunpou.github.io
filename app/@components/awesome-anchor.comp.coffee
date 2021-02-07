# global customElements

import { AwesomeComponent } from '/app/@components/awesome.comp.min.js'

class AwesomeAnchor extends AwesomeComponent
  render: ->
    '<div>' + @innerHTML + '</div>'

  postConnectedCallback: ->
    @shadow.addEventListener('click', (e) =>
      document.router.navigate(@getAttribute('href'))
    )

export tag = 'awesome-anchor'
customElements.define(tag, AwesomeAnchor)