import CheetSheetsTemplate from "Templates/cheetsheets/template"

const page = new CheetSheetsTemplate()

page.setBlock('content', CheetSheetsTemplate.readFile('./content.html'))

export default page
