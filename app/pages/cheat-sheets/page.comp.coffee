# global customElements

import { AwesomeComponent } from '/app/components/awesome.comp.min.js'

class CheatSheetsPage extends AwesomeComponent
  link: ->
    ['/app/theme.min.css',
    '/app/pages/cheat-sheets/page.min.css']

  render: ->
    '''
    <div>Cheat Sheets Page</div>
    '''

export tag = 'cheat-sheets-page'
customElements.define(tag, CheatSheetsPage)
