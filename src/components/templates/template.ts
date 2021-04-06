import Component from 'Components/component'


export default class Template extends Component {
  blocks: { [key: string]: string }

  constructor () {
    super()
    this.blocks = {}
  }

  createBlock (name: string) {
    this.blocks[name] = ''
  }

  setBlock (name: string, value: string) {
    this.blocks[name] = value
  }

  getBlock (name: string): string {
    return this.blocks[name]
  }
}
