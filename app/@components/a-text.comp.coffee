# global customElements

import { AwesomeComponent } from './awesome.comp.min.js'

class AText extends AwesomeComponent
  link: ->
    '/app/@components/@styles/a-text.comp.min.css'

  render: ->
    @innerHTML

export tag = 'a-text'
customElements.define(tag, AText)