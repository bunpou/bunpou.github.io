# global customElements

import { AwesomeComponent } from './awesome.comp.min.js'

class AnAnchor extends AwesomeComponent
  render: ->
    '<div>' + @innerHTML + '</div>'

  postConnectedCallback: ->
    @shadow.addEventListener('click', (e) =>
      document.router.navigate(@getAttribute('href'))
    )

export tag = 'an-anchor'
customElements.define(tag, AnAnchor)