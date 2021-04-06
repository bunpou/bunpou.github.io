import Template from 'Templates/template'

export default class CheetsheetsTemplate extends Template {
  constructor() {
    super();
    this.createBlock('content');
  }

  render() {
    return ''
    /*
    V1 Без pug :c
      return `
        <div>Just a test cheetsheet page</div>
        <div>${this.getBlock('content')}</div>
      `
    
    V2 Pug в html, но нет возможности внедрять переменные
      return CheetsheetsTemplate.loadFile('./index.html')

    V3 Прийдётся сделать pug не dev depend
      return pug.renderFile('./index.pug', {
        cache: true,
        'contentBlock': this.getBlock('content)
      })

    V4 Компилировать весь pug в js функции что будут возвращать обычную строку из html и имеют возможность внедрять переменные
    ПОКА ЧТО ЭТО ЛУЧШИЙ ВАРИАНТ, ТАК ЧТО ПОТЕСТИРУЙ 
    ---- Build
      var fs = require('fs');
      var pug = require('pug');

      // Compile the template to a function string
      var jsFunctionString = pug.compileFileClient('/path/to/pugFile.pug', {name: "fancyTemplateFun"});

      // Compile all templates to a templates.js file and serve it to the client
      fs.writeFileSync("templates.js", jsFunctionString);
    
    ---- Usage
      return this.loadPugJS('./index.pug.js', {
        'content': this.getBlock('content')
      })

    */

  }
}
