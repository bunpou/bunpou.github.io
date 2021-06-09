import Component from 'Components/component'


@Component.load(require('./index.pug'), require('./styles.sass'))
class H1Atom extends Component {}

@Component.load(require('./index.pug'), require('./styles.sass'))
class H2Atom extends Component {}

@Component.load(require('./index.pug'), require('./styles.sass'))
class H3Atom extends Component {}

@Component.load(require('./index.pug'), require('./styles.sass'))
class H4Atom extends Component {}

@Component.load(require('./index.pug'), require('./styles.sass'))
class H5Atom extends Component {}

@Component.load(require('./index.pug'), require('./styles.sass'))
class H6Atom extends Component {}


customElements.define('a-h1', H1Atom)
customElements.define('a-h2', H2Atom)
customElements.define('a-h3', H3Atom)
customElements.define('a-h4', H4Atom)
customElements.define('a-h5', H5Atom)
customElements.define('a-h6', H6Atom)
