# global customElements, document

import { Component } from '/components/component.min.js'
import { View } from '/scripts/view.min.js'

class ViewAtom extends Component
  postConnectedCallback: ->
    node = this
    @defaultRoute = @getAttribute('default-route')

    @view = new View(node)
    @view.onError = @onError.bind(this)

    document.viewAtoms ?= []
    document.viewAtoms.push(node)

    @update(document.location.pathname)

  onError: (pageFilePath, error) ->
    if pageFilePath != @routeToPageFilePath(@defaultRoute)
      document.router.navigate(@defaultRoute)
    else
      console.log('Redirecting on the default page has failed.')

  routeToPageFilePath: (route) ->
    prefix = '/components/pages'
    pageName = route.slice(route.lastIndexOf('/') + 1)
    file = 'p-' + pageName + '.min.js'

    pageFilePath = prefix + route + '/' + file

  update: (route) ->
    @view.update(@routeToPageFilePath(route))

export tag = 'a-view'
customElements.define(tag, ViewAtom)