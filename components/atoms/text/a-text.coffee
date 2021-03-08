# global customElements

import { Component } from '/components/component.min.js'

class AText extends Component
  link: ->
    '/components/atoms/text/a-text.min.css'

  render: ->
    @innerHTML

export tag = 'a-text'
customElements.define(tag, AText)