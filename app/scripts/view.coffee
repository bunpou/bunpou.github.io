export class View
  constructor: (@prefix, @suffix, @node, @defaultPage) ->

  update: (URL) ->
    pagePath = @prefix + URL + '/' + @suffix

    import(pagePath)
      .then (Component) =>
        page = document.createElement(Component.tag)

        while @node.lastElementChild
          @node.removeChild(@node.lastElementChild)

        @node.appendChild(page)

      .catch (error) =>
        console.log(error)
        @update(@defaultPage)
