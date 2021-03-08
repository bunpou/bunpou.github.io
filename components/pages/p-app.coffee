# global customElements

import { Component } from '/components/component.min.js'
import '/components/atoms/button/a-button.min.js'
import '/components/atoms/text/a-text.min.js'
import '/components/atoms/view/a-view.min.js'

class AppPage extends Component
  link: -> [
    '/components/pages/p-app.min.css'
  ]

  render: ->
    '''
    <a-button class="menu-button" accent>
      <a-text h2 reverse-auto-oriented>メニュー</a-text>
    </a-button>
    <!-- TODO: do smth with a-text -->
    <div class="layers">
      <!-- TODO: do I really need loading screen?
      <a-loading-screen></a-loading-screen>
      <div class="loading-layer">
        Loading...
        <a-loading-screen></a-loading-screen>
      </div>
      -->
      <div class="view-layer">
        <a-view default-route='/home'></a-view>
      </div>
      <div class="overlay-layer">
        OVERLAY <!-- <an-overlay> -->
      </div>
    </div>
    '''

export tag = 'p-app'
customElements.define(tag, AppPage)
