import DB from 'japanese-grammar-db/src/db'


/*
static dbPath: string = 'japanese-grammar-db/build/db.json'
static docPath: string = 'japanese-grammar-db/build/doc.json'
*/

export default class BunpouDB extends DB {
  static instance: BunpouDB

  constructor () {
    if (BunpouDB.instance) {
      return BunpouDB.instance
    }
    super()
    BunpouDB.instance = this
  }

  
}
