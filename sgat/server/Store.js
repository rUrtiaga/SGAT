const { MongoClient, ObjectID } = require("mongodb");

/* Tres cosas de carlos
 *  - no vale abrir mas de una conexion para cada llamada por API
 *  - digamos que el servicio es el encargado de manejar la conexion
 *  - vale que un store "haga de servicio" para llamados API sencillos.
 *    En tal caso, tener dos metodos: el autosuficiente (que no recibe parametros)
 *    y el normal (que recibe la db por parametro)
 */

class Store {
  /**
   * Funciones generales
   */
  fetchID(db, col, id) {
    let oid = new ObjectID(id);
    return db.collection(col).findOne({ _id: oid });
  }

  /**
   * Metodos de operacion
   */

  pushTaller(db, taller) {
    return db.collection("talleres").insertMany([taller]);
  }

  fetchTalleres(db) {
    return db
      .collection("talleres")
      .find()
      .toArray();
  }

  fetchTalleresCategoria(db, cat) {
    return db
      .collection("talleres")
      .find({ _categoria: cat })
      .toArray();
  }

  fetchTaller(db, id) {
    return this.fetchID(db, "talleres", id);
  }

  fetchSubCatCursos(db, ids) {
    let oid = new ObjectID(ids.subid);
    console.log(ids.subid);

    return db
      .collection("talleres")
      .find({ "_subCategorias._id": oid })
      .project({ _subCategorias: { $elemMatch: { _id: oid } } })
      .toArray();
  }

  fetchPersonaDNI(db, dni) {
    return db.collection("personas").findOne({ _dni: parseInt(dni) });
  }

  fetchPersona(db, id) {
    return this.fetchID(db, "personas", id);
  }

  pushPersona(db, persona) {
    return db.collection("personas").insertMany([persona]);
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
}

let store = new Store();

exports.store = store;
