# global customElements

import { AwesomeComponent } from './awesome.comp.min.js'

class AwesomeText extends AwesomeComponent
  link: ->
    '/app/@components/@styles/awesome-text.comp.min.css'

  render: ->
    @innerHTML

export tag = 'awesome-text'
customElements.define(tag, AwesomeText)