# global customElements

import { AwesomeComponent } from './@components/awesome.comp.min.js'
import './@components/a-button.comp.min.js'
import './@components/a-text.comp.min.js'
import './@components/a-view.comp.min.js'

class AppPage extends AwesomeComponent
  link: -> [
    '/app/@styles/app.min.css'
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
        <a-view prefix='/app' suffix='page.comp.min.js' default='/home'></a-view>
      </div>
      <div class="overlay-layer">
        OVERLAY <!-- <an-overlay> -->
      </div>
    </div>
    '''

export tag = 'app-page'
customElements.define(tag, AppPage)
