# global customElements

import { AwesomeComponent } from '/app/@components/awesome.comp.min.js'
import '/app/@components/awesome-anchor.comp.min.js'

class ReaderPage extends AwesomeComponent
  render: ->
    '''
    <div>Reader Page</div>
    <div onclick="document.router.navigate('/home')">Go Home</div>
    '''

export tag = 'reader-page'
customElements.define(tag, ReaderPage)