import 'Atoms/table/a-table'
import './global.sass'

var html = require('Pages/verbs/classifying-into-ru-and-u.pug')
const div = document.createElement('div')
div.innerHTML = html.default
document.body.appendChild(div)
