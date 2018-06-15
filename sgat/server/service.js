const { Taller, Persona, Curso, DiaHorarioLugar } = require("./dominio/dominio-talleres.js");
const { store } = require("./Store.js");
const { MongoClient } = require("mongodb");

const dbServerURL = "mongodb://localhost:27017/";
const dbName = "sgat";

class Service {

  doOperationOnConnection(operation) {
    let dbConnection = null;
    let db = null;

    return MongoClient.connect(
      dbServerURL,
      { useNewUrlParser: true }
    )
      .then(function(conn) {
        dbConnection = conn; //Guardo la conneccion en la variable externa al promise
        db = dbConnection.db(dbName);

        return operation(db);
      })
      .then(function(data) {
        dbConnection.close();
        return Promise.resolve(data);
      })
      .catch(function(error) {
        dbConnection.close();
        return Promise.reject(error);
      });
  }

  fetchPersonaDNI(dni) {
    return this.doOperationOnConnection(db => {
      return store.fetchPersonaDNI(db, dni).then(p => {
        if (p == null) {
          return Promise.resolve({});
        } else {
          return Promise.resolve(p);
        }
      });
    });
  }

  fetchPersona(id) {
    return this.doOperationOnConnection(db => {
      return store.fetchPersona(db, id).then(p => {
        if (p == null) {
          let e = new Error(
            "no se encuentra la persona con id: '" + id + "'"
          );
          e.code = 404;
          return Promise.reject(e);
        } else {
          return Promise.resolve(p);
        }
      });
    });
  }

  pushPersona(dataPersona){
    let persona = new Persona(dataPersona)

    return this.doOperationOnConnection(db => {
      return store.pushPersona(db, persona)
    })
  }

  fetchCategorias() {
    return this.doOperationOnConnection(db => store.fetchCategorias(db));
  }

  existCategoria(db, categoria) {
    return store.existsCategoria(db, categoria).then(dcat => {
      if (dcat.length == 0) {
        return Promise.resolve();
      } else {
        return Promise.reject(
          new Error(
            "ya se encuentra una categoria con el nombre: '" + categoria + "'"
          )
        );
      }
    });
  }

  pushCategoria(db, categoria) {
    return store.pushCategoria(db, categoria);
  }
}

let service = new Service();

exports.service = service;
