export class View
  constructor: (@prefix, @suffix, @node, @defaultPage) ->
    @node = @node.shadow ? @node

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
        if pagePath != @defaultPage
          @update(@defaultPage)
        else
          console.log('Redirecting on the default page has failed')
