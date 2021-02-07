# globals history

export class Router
  constructor: (@root, @onnavigation = null) ->
    window.addEventListener('popstate', @listener.bind(this))

  listener: (event) ->
    # TODO: document.router -> this. -> @
    document.router.onnavigation(document.location.pathname)

  navigate: (URL) ->
    state = {}
    title = ''

    history.pushState(state, title, URL)
    @onnavigation(URL)
