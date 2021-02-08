# global customElements

import { AwesomeComponent } from '/app/@components/awesome.comp.min.js'

class CheatSheetsPage extends AwesomeComponent
  link: ->
    './@styles/cheat-sheets.min.css'

  render: ->
    '''
    <div>Cheat Sheets Page</div>
    '''

export tag = 'cheat-sheets-page'
customElements.define(tag, CheatSheetsPage)
