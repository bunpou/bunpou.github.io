import 'Atoms/table/a-table'
import './global.sass'
import Router from './scripts/router'

var html = require('Pages/verbs/classifying-into-ru-and-u.pug')
const div = document.createElement('div')
div.innerHTML = html.default
document.body.appendChild(div)

const router = new Router('/')
router.addNavigationListener((event: CustomEvent) => {
  console.log(event.detail)
})
