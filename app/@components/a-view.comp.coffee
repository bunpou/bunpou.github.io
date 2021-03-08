# global customElements

import { AwesomeComponent } from './awesome.comp.min.js'
import { View } from '/app/@scripts/view.min.js'

class AView extends AwesomeComponent
  postConnectedCallback: ->
    prefix = @getAttribute('prefix')
    suffix = @getAttribute('suffix')
    node = this
    defaultPage = @getAttribute('default')

    @view = new View(prefix, suffix, node, defaultPage)

    document.views ?= []
    document.views.push(@view)

    @view.update(document.location.pathname)

export tag = 'a-view'
customElements.define(tag, AView)