const { dominio } = require("./dominio/dominio-talleres.js");
const { store } = require("./Store.js");
const { MongoClient } = require("mongodb");

const dbServerURL = "mongodb://localhost:27017/";
const dbName = "sgat";

class Service {
  // agregarPersona(persona) {
  //   let persona = new dominio.Persona(
  //     dataPersona._dni,
  //     dataPersona._nombre,
  //     dataPersona._apellido,
  //     dataPersona._fechaNac,
  //     dataPersona._direccion,
  //     dataPersona._telPrincipal,
  //     dataPersona._mail
  //   );
  //   persona.setTelSecundario(dataPersona._telSecundario);
  //   persona.setComentario(dataPersona._comentario);

  //   store.agregarPersona(persona);
  // }

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
        console.log('data en service'+data);
        return Promise.resolve(data);
      })
      .catch(function(error) {
        console.log('catch!!! '+ error);
        dbConnection.close();
        return Promise.reject(error);
      });
  }

  fetchCategorias() {
    return this.doOperationOnConnection(db => store.fetchCategorias(db));
  }

  pushCategoria(categoria) {
    return this.doOperationOnConnection(db => {
      //hacer la pequeña validacion con el esistCategoria
      return store.existsCategoria(db, categoria)
            .then(dataCategoria => {
              console.log(dataCategoria);
              return store.pushCategoria(db, categoria);
            })
            .catch((e)=> console.log(e));
    });
  }
}

let service = new Service();

exports.service = service;
