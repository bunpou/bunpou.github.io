# global customElements

import { AwesomeComponent } from './@components/awesome.comp.min.js'
import './@components/awesome-view.comp.min.js'

class AppPage extends AwesomeComponent
  link: -> [
    '/app/@styles/theme.min.css',
    '/app/@styles/app.min.css'
  ]

  render: ->
    '''
    <div>Awesome Japanese</div>
    <awesome-view prefix='/app' suffix='page.comp.min.js' default='/home'>
      Loading...
    </awesome-view>
    '''

export tag = 'app-page'
customElements.define(tag, AppPage)
