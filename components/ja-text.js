import { LitElement, html } from 'https://unpkg.com/lit-element@2.1.0/lit-element.js?module'
/* global customElements */

class JaText extends LitElement {
  render () {
    return html`NOT IMPLEMENTED ERROR: JA-TEXT`
  }
}

customElements.define('ja-text', JaText)

/* EXAMPLE
私は猫を見る
<span class='ja-wrap'> <ruby>私<rt>わたし</rt><rtc class='under'>I</rtc></ruby> は <ruby>猫<rt>ねこ</rt><rtc class='under'>cat</rtc></ruby> を <ruby class='yellow'><ruby>見<rt>み</rt></ruby>る<rtc class='under'>see</rtc></ruby> </span>
<ja-text>私は猫を**見る**</ja-text>
*/
