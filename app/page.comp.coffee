# global customElements

import { AwesomeComponent } from './@components/awesome.comp.min.js'
import './@components/awesome-view.comp.min.js'
import './@components/awesome-button.comp.min.js'
import './@components/awesome-text.comp.min.js'

class AppPage extends AwesomeComponent
  link: -> [
    '/app/@styles/app.min.css'
  ]

  render: ->
    '''
    <awesome-button class="menu-button" accent>
      <awesome-text h2 reverse-auto-oriented>メニュー</awesome-text>
    </awesome-button>
    <!-- TODO: do smth with awesome-text -->
    <div class="layers">
      <!-- TODO: do I really need loading screen?
      <awesome-loading-screen></awesome-loading-screen>
      <div class="loading-layer">
        Loading...
        <awesome-loading-screen></awesome-loading-screen>
      </div>
      -->
      <div class="view-layer">
        <awesome-view prefix='/app' suffix='page.comp.min.js' default='/home'></awesome-view>
      </div>
      <div class="overlay-layer">
        OVERLAY <!-- <awesome-overlay> -->
      </div>
    </div>
    '''

export tag = 'app-page'
customElements.define(tag, AppPage)
