# global customElements

import { Component } from '/components/component.min.js'

class CheatSheetsPage extends Component
  link: ->
    '/components/pages/cheat-sheets/p-cheat-sheets.min.css'

  render: ->
    '''
    <div>Cheat Sheets Page</div>
    '''

export tag = 'p-cheat-sheets'
customElements.define(tag, CheatSheetsPage)
