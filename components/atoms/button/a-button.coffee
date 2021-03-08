# global customElements

import { Component } from '/components/component.min.js'

class ButtonAtom extends Component
  link: ->
    '/components/atoms/button/a-button.min.css'

  render: ->
    @innerHTML

export tag = 'a-button'
customElements.define(tag, ButtonAtom)