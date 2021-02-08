# global customElements

import { AwesomeComponent } from './awesome.comp.min.js'

class AwesomeButton extends AwesomeComponent
  link: ->
    '/app/@components/@styles/awesome-button.comp.min.css'

  render: ->
    @innerHTML

export tag = 'awesome-button'
customElements.define(tag, AwesomeButton)