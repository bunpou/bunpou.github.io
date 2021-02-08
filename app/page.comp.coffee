# global customElements

import { AwesomeComponent } from './@components/awesome.comp.min.js'
import './@components/awesome-view.comp.min.js'

class AppPage extends AwesomeComponent
  link: -> [
    '/app/@styles/app.min.css'
  ]

  render: ->
    '''
    <div class="menu-button">メニュー</div>
    <div class="layer loading-layer">
      Loading...
    </div>
    <div class="layer view-layer">
      <awesome-view prefix='/app' suffix='page.comp.min.js' default='/home'></awesome-view>
    </div>
    <div class="layer overlay-layer">
      OVERLAY
    </div>
    '''

export tag = 'app-page'
customElements.define(tag, AppPage)
