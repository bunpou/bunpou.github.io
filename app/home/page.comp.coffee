# global customElements

import { AwesomeComponent } from '/app/@components/awesome.comp.min.js'
import '/app/@components/awesome-anchor.comp.min.js'

class HomePage extends AwesomeComponent
  link: ->
    '/app/home/@styles/home.min.css'

  render: ->
    '''
    <div>Home Page</div>
    <div onclick="document.router.navigate('/reader')">Go to Reader</div>
    <awesome-anchor href="/reader">Awesome anchor to go to Reader</awesome-anchor>
    '''

export tag = 'home-page'
customElements.define(tag, HomePage)
