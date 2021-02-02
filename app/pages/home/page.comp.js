/* global HTMLElement, customElements */
import '/app/components/awesome-anchor.comp.min.js'

export const tag = 'home-page'
customElements.define(tag, class extends HTMLElement {
  connectedCallback () {
    const shadow = this.attachShadow({ mode: 'open' })

    shadow.innerHTML = `
    <div>Home Page</div>
    <div onclick="document.router.navigate('/reader')">Go to Reader</div>
    <awesome-anchor href="/reader">Awesome button to go to Reader</awesome-anchor>
    `

    const link = document.createElement('link')
    link.setAttribute('rel', 'stylesheet')
    link.setAttribute('href', '/app/pages/home/page.css')
    shadow.appendChild(link)
  }
})

// How it would be nice to look:

/*
import { Page } from '/app/page.min.js'
import '/app/components/awesome-anchor.comp.min.js'

export default class HomePage extends Page {
  constructor () {
    super()
    this.link('/app/pages/home/page.css')
    this.render(`
    <div>Home Page</div>
    <awesome-anchor href="reader">Reader</awesome-anchor>
    `)
  }
}
*/
