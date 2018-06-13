const { MongoClient } = require("mongodb");

/* Tres cosas de carlos
 *  - no vale abrir mas de una conexion para cada llamada por API
 *  - digamos que el servicio es el encargado de manejar la conexion
 *  - vale que un store "haga de servicio" para llamados API sencillos.
 *    En tal caso, tener dos metodos: el autosuficiente (que no recibe parametros)
 *    y el normal (que recibe la db por parametro)
 */

class Store {
  //   agregarPersona(persona) {

  //   const collectionName = "personas";

  //   let dbConnection = null;
  //   let db = null;

  //   MongoClient.connect(dbServerURL, { useNewUrlParser: true })
  //     .then(function(conn) {
  //       dbConnection = conn; //Guardo la conneccion en la variable externa al promise
  //       db = dbConnection.db(dbName);

  //       //db.collection(collectionName).find().toArray()
  //       //SI NO PONGO EL toArray, te da el cursor(que es mejor para consultas grandes)

  //       return db
  //         .collection(collectionName)
  //         .insertOne(persona.persistentJSON());
  //     })
  //     .catch(function(error) {
  //       //manejo el error
  //       console.log(error)
  //     })
  //     .then(function() {
  //       dbConnection.close();
  //     });
  // }

  // agregarCategoria(categoria){
  //   // MongoClient.connect();

  //   const collectionName = "categorias";

  //   let dbConnection = null;
  //   let db = null;

  //   MongoClient.connect(dbServerURL, { useNewUrlParser: true })
  //   .then(function(conn) {
  //     dbConnection = conn; //Guardo la conneccion en la variable externa al promise
  //     db = dbConnection.db(dbName);

  //     return db
  //       .collection(collectionName)
  //       .insertOne({categoria});
  //   })
  //   .catch(function(error) {
  //     console.log(error)
  //   })
  //   .then(function() {
  //     dbConnection.close();
  //   });
  // }

  // getCategorias(res){
  //   const collectionName = "categorias";

  //   let dbConnection = null;
  //   let db = null;

  //   return MongoClient.connect(dbServerURL, { useNewUrlParser: true })
  //   .then(function(conn) {
  //     dbConnection = conn; //Guardo la conneccion en la variable externa al promise
  //     db = dbConnection.db(dbName);

  //     return db
  //       .collection(collectionName)
  //       .find().toArray();
  //   })
  //   .then(function(data){
  //     // res.json(data)
  //     return Promise.resolve()
  //   })
  //   .catch(function(error) {
  //     console.log(error)
  //   })
  //   .then(function() {
  //     dbConnection.close();
  //   });
  // }

  //este seria si llamo DIRECTAMENTE al STORE
  // fetchCategoriasAutosuficiente() {
  //   return this.doOperationOnConnection((db) => this.fetchCategorias(db))
  // }

  fetchPersona(db, dni) {
    return db
      .collection("personas")
      .find({ _dni: parseInt(dni) })
      .toArray();
  }
  fetchCategorias(db) {
    return db
      .collection("categorias")
      .find()
      .toArray();
  }

  pushCategoria(db, categoria) {
    return db.collection("categorias").insertMany([{ categoria: categoria }]);
  }

  existsCategoria(db, categoria) {
    return db
      .collection("categorias")
      .find({ categoria: categoria })
      .toArray();
  }
  // return db
  //   .collection("categorias")
  //   .find({ categoria: categoria })
  //   .toArray();

  //sin condiciones
  // fetchCategoriasCompacto() {
  //   return this.doOperationOnConnection((db) => {
  //     return db
  //         .collection("categorias")
  //         .find().toArray()
  //   })
  // }

  //con condiciones
  // fetchCategoriasConCondicion(filtro) {
  //   return this.doOperationOnConnection((db) => {
  //     return db
  //         .collection("categorias")
  //         .find(filtro).toArray()
  //   })
  // }

  // esto seria como se usaria con anotation
  // @OperationOnConnection
  // fetchCategoriasCompacto() {
  //   return MagicContext.db()
  //       .collection("categorias")
  //       .find().toArray()
  // }

  // ESTE SE PASO A SERVICE
  // doOperationOnConnection(operation) {
  //   let dbConnection = null;
  //   let db = null;

  //   return MongoClient.connect(dbServerURL, { useNewUrlParser: true })
  //   .then(function(conn) {
  //     dbConnection = conn; //Guardo la conneccion en la variable externa al promise
  //     db = dbConnection.db(dbName);

  //     return operation(db)
  //   })
  //   .then(function(data) {
  //     dbConnection.close();
  //     return Promise.resolve(data)
  //   })
  //   .catch(function(error) {
  //     console.log(error)
  //     dbConnection.close();
  //     return Promise.reject(error)
  //   })
  // }
}

let store = new Store();

exports.store = store;
