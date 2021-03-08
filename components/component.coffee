# global HTMLElement

export class Component extends HTMLElement
  postConnectedCallback: -> null

  connectedCallback: ->
    @shadow = @attachShadow({ mode: 'open' })

    @processRender()
    @processLink()

    @postConnectedCallback()

  render = undefined

  processRender: ->
    if @render?
      @shadow.innerHTML = @render()

  link = undefined

  processLink: ->
    if @link?
      result = @link()

      if typeof result == 'string'
        link = result
        @addLink(link)
      else if Array.isArray(result)
        links = result
        @addLink(link) for link in links
      else
        throw "Link function returned data of wrong type!#{result} :: #{typeof result}\nExpected list or string."

  addLink: (path) ->
    link = document.createElement('link')
    link.setAttribute('rel', 'stylesheet')
    link.setAttribute('href', path)
    @shadow.appendChild(link)
