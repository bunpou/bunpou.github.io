import 'Scripts/redirect'

import 'Atoms/table/component'
import 'Atoms/view/component'
import 'Atoms/btn/component'

import './global.sass'

var html = require('Pages/verbs/classifying-into-ru-and-u.pug')
const div = document.createElement('div')
div.innerHTML = html.default
document.body.appendChild(div)
