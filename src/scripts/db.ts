import { Document, ID, Dict, DataEntry, Data, Options } from 'flexsearch'


// Just stright copyied... I can't handle these errors anymore
export default class DB {
  static instance: DB
  static options: Dict = {
    tokenize: 'full',
    document: {
      id: 'id',
      index: ['title', 'source', 'link']
    }
  }
  static data: Data = DB.importData(require('/japanese-grammar-db/build/db.json'))
  static doc: Document = DB.importDoc(require('/japanese-grammar-db/build/doc.json'))

  constructor () {
    if (DB.instance) {
      return DB.instance
    }
    DB.instance = DB
  }

  static emptyData (): Data {
    return []
  }

  static importData (json: Dict): Data {
    return json as Data
  }

  static emptyDoc (options?: Options): Document {
    options = options || DB.options
    
    return new Document(options)
  }

  static importDoc (json: Dict, options?: Options): Document {
    options = options || DB.options
    const doc = DB.emptyDoc(options)
    
    for (const [key, value] of Object.entries(json)) {
      doc.import(key, value)
    }

    return doc
  }

  static read (path: string): Dict {
    return require(path)
  }

  static search(string?: string, limit?: string[], options?: Options): Dict {
    const results = DB.doc.search(string, limit, options)
    let ids: number[] = []
    results.forEach((result: any) => {
      ids = ids.concat(result.result)
    });
    
    return ids.map((id: number) => this.data[id])
  }
}
