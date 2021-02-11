# global customElements

import { AwesomeComponent } from './awesome.comp.min.js'

class AButton extends AwesomeComponent
  link: ->
    '/app/@components/@styles/a-button.comp.min.css'

  render: ->
    @innerHTML

export tag = 'a-button'
customElements.define(tag, AButton)