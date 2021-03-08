export class View
  constructor: (@node) ->
    @node = @node.shadow ? @node

  onError: (pageFilePath, error) ->
    throw undefined

  update: (pageFilePath) ->
    import(pageFilePath)
      .then (Component) =>
        page = document.createElement(Component.tag)

        while @node.lastElementChild
          @node.removeChild(@node.lastElementChild)

        @node.appendChild(page)

      .catch (error) =>
        @onError(pageFilePath, error)
