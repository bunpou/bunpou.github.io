# global HTMLElement, customElements
import '/app/components/awesome-anchor.comp.min.js'

export tag = 'home-page'
customElements.define(tag, class HomePage extends HTMLElement
  connectedCallback: ->
    shadow = @attachShadow({ mode: 'open' })

    shadow.innerHTML =
      """
      <div>Home Page</div>
      <div onclick="document.router.navigate('/reader')">Go to Reader</div>
      <awesome-anchor href="/reader">Awesome button to go to Reader</awesome-anchor>
      """

    link = document.createElement('link')
    link.setAttribute('rel', 'stylesheet')
    link.setAttribute('href', '/app/pages/home/page.css')
    shadow.appendChild(link)
)

"""

import { Page } from '/app/page.min.js'
import '/app/components/awesome-anchor.comp.min.js'

export default class HomePage extends Page
  link: ->
    '/app/pages/home/page.css'

  render: ->
    '''
    <div>Home Page</div>
    <div onclick="document.router.navigate('/reader')">Go to Reader</div>
    <awesome-anchor href="/reader">Awesome button to go to Reader</awesome-anchor>
    '''
"""
