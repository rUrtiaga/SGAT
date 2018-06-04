const { MongoClient } = require("mongodb");

const dbServerURL = "mongodb://localhost:27017/";
const dbName = "sgat";
class Store {
  constructor(){
  }
    
    agregarPersona(persona) {

    const collectionName = "personas";

    let dbConnection = null;
    let db = null;

    MongoClient.connect(dbServerURL, { useNewUrlParser: true })
      .then(function(conn) {
        dbConnection = conn; //Guardo la conneccion en la variable externa al promise
        db = dbConnection.db(dbName);

        //db.collection(collectionName).find().toArray()
        //SI NO PONGO EL toArray, te da el cursor(que es mejor para consultas grandes)

        return db
          .collection(collectionName)
          .insertOne(persona.persistentJSON());
      })
      .catch(function(error) {
        //manejo el error
        console.log(error)
      })
      .then(function() {
        dbConnection.close();
      });
  }

  agregarCategoria(categoria){
    // MongoClient.connect();

    const collectionName = "categorias";

    let dbConnection = null;
    let db = null;

    MongoClient.connect(dbServerURL, { useNewUrlParser: true })
    .then(function(conn) {
      dbConnection = conn; //Guardo la conneccion en la variable externa al promise
      db = dbConnection.db(dbName);

      return db
        .collection(collectionName)
        .insertOne({categoria});
    })
    .catch(function(error) {
      console.log(error)
    })
    .then(function() {
      dbConnection.close();
    });
  }

  getCategorias(res){
    const collectionName = "categorias";

    let dbConnection = null;
    let db = null;

    return MongoClient.connect(dbServerURL, { useNewUrlParser: true })
    .then(function(conn) {
      dbConnection = conn; //Guardo la conneccion en la variable externa al promise
      db = dbConnection.db(dbName);
      
      return db
        .collection(collectionName)
        .find().toArray();
    })
    .then(function(data){
      res.json(data)
    })
    .catch(function(error) {
      console.log(error)
    })
    .then(function() {
      dbConnection.close();
    });
  }
}

let store = new Store();

exports.store = store
