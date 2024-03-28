const url = 'mongodb://127.0.0.1:27017';
const dbName = 'Bookhouse';
const collectionName = 'books';
const MongoClient = require('mongodb').MongoClient;

async function fetchBookData() {
    globalThis.client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
      await client.connect();
      globalThis.db = client.db(dbName);
      globalThis.collection = db.collection(collectionName);
  
      const data = await collection.find({}).toArray();
  
      return data;
    }
    catch(err){
      console.log(err);
    }
     finally {
      // client.close();
  }
}

module.exports = fetchBookData; 

