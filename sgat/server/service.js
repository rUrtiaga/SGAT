const {
  Taller,
  Persona,
  Curso,
  DiaHorarioLugar
} = require("./dominio/dominio-talleres.js");
const { store } = require("./Store.js");
const { MongoClient } = require("mongodb");
const { SgatError } = require("./extras/SgatError.js");
const process = require("process");

//lo del process es para hacer la variable de sistema.
const dbServerURL = process.env.MONGOSERVER || "mongodb://localhost:27017/";
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
  /**
   * Talleres
   */

  pushTaller(dataTaller) {
    let taller = new Taller(dataTaller._categoria,dataTaller._nombre, dataTaller._subCategorias)
    return this.doOperationOnConnection(db => {
      return store.pushTaller(db, taller);
    });
  }

  fetchTalleres() {
    return this.doOperationOnConnection(db => {
      return store.fetchTalleres(db);
    });
  }

  fetchTalleresCategoria(categoria) {
    return this.doOperationOnConnection(db => {
      return store.fetchTalleresCategoria(db,categoria);
    });
  }

  fetchTaller(id){
    return this.doOperationOnConnection(db=>{
      return store.fetchTaller(db,id)
    })
  }

  //Esto esta feo... 
  fetchCursos(ids){
    return this.doOperationOnConnection(db=>{
      return store.fetchSubCatCursos(db,ids)
              .then(listT => listT[0]._subCategorias[0]._cursos)
              // .then(listC => )
    })
  }

  /**
   *  Personas
   */

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
          return Promise.reject(
            new SgatError(
              "no se encuentra la persona con id: '" + id + "'",
              404
            )
          );
        } else {
          return Promise.resolve(p);
        }
      });
    });
  }

  pushPersona(dataPersona) {
    let persona = new Persona(dataPersona);

    return this.doOperationOnConnection(db => {
      return this.isFreeDNI(db, persona.getDNI()).then(() =>
        store.pushPersona(db, persona)
      );
    });
  }

  isFreeDNI(db, dni) {
    return store.fetchPersonaDNI(db, dni).then(value => {
      if (value == null) {
        return Promise.resolve();
      } else {
        return Promise.reject(
          new SgatError("el dni " + dni + " ya se encuentra en el sistema", 400)
        );
      }
    });
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
          new SgatError(
            "ya se encuentra una categoria con el nombre: '" + categoria + "'",
            409
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
