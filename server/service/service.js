const {
  Taller,
  Persona,
  Curso
} = require("./dominio/dominio-talleres.js");
const {
  store
} = require("./Store.js");
const {
  MongoClient
} = require("mongodb");
const {
  SgatError
} = require("./extras/SgatError.js");
const process = require("process");

//lo del process es para hacer la variable de sistema.
const dbServerURL = process.env.MONGO_SERVER || "mongodb://localhost:27017/";
const dbName = "sgat";

//Funcion provisoria para frenar el server y probar tiempos de carga
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if (new Date().getTime() - start > milliseconds) {
      break;
    }
  }
}

class Service {
  doOperationOnConnection(operation) {
    let dbConnection = null;
    let db = null;

    return MongoClient.connect(
        dbServerURL, {
          useNewUrlParser: true
        }
      )
      .then(function (conn) {
        dbConnection = conn; //Guardo la conneccion en la variable externa al promise
        db = dbConnection.db(dbName);

        return operation(db);
      })
      .then(function (data) {
        dbConnection.close();
        return Promise.resolve(data);
      })
      .catch(function (error) {
        if (dbConnection) {
          dbConnection.close();
        }
        return Promise.reject(error);
      });
  }
  /**
   * Talleres
   */

  // pushTaller(dataTaller) {
  //   let talleres = dataTaller._subCategorias.map(
  //     subCat => new Taller(dataTaller, subCat)
  //   );
  //   return this.doOperationOnConnection(db => {
  //     // store.pushCategoria(dataTaller._categoria)
  //     return store.pushTalleres(db, talleres);
  //   });
  // }

  fetchTalleres() {
    return this.doOperationOnConnection(db => {
      return store.fetchTalleres(db);
    });
  }

  pushTaller(dataTaller) {
    let talleres = dataTaller._subCategoriasConId.map(
      subCat => new Taller(dataTaller, subCat._subCategoria)
    );
    console.log(talleres);
    let nombre = dataTaller._nombre;

    if (!this.validarBlancos(dataTaller)) {
      return this.doOperationOnConnection(db => {
        return this.existTaller(db, nombre).then(() =>
          store.pushTalleres(db, talleres)
        );
      });
    } else {
      return Promise.reject(
        new SgatError("El Taller tiene datos incompletos", 409)
      );
    }
  }
  editTaller(dataTaller) {
    // RECIBO UN NOMBRE, UNA CATEGORIA Y UNA LISTA CON SUBCATEGORIAS DONDE TENGO QUE GENERAR
    //TALLERES, NUEVOS (y guardarlos) Y A EDITAR (y actualizarlos)

    let talleres = dataTaller._subCategoriasConId.map(
      subCat => new Taller(dataTaller, subCat._subCategoria, subCat._id)
    );

    let talleresConId = talleres.filter(t => !t._id == ""); // DEBERIA FILTRAR LOS TALLERES EXISTENTES CON ID

    let talleresSinId = talleres.filter(t => t._id == undefined); // DEBERIA FILTRAR LOS TALLERES NUEVOS

    console.log("TALLERES CON ID" + talleresConId);
    console.log("TALLERES SIN ID" + talleresSinId);

    let nombre = dataTaller._nombre;

    if (!this.validarBlancos(dataTaller)) {
      return this.doOperationOnConnection(db => {
        return this.existTaller(db, nombre).then(
          () => store.pushTalleres(db, talleres) // esta linea deberia reemplazarce por las 3 siguientes

          //() => store.pushTalleres(db, talleresSinId)
          //.then(() =>
          //store.editTalleres(db, talleresConId) //) // ASI LA IDEA ES QUE POR LO MENOS EDITE LOS TALLERES Q YA EXISTEN
        ); // LOS NUEVOS LOS ESTARIA OBVIANDO
      });
    } else {
      return Promise.reject(
        new SgatError("El Taller tiene datos incompletos", 409)
      );
    }
  }

  validarBlancos(dataTaller) {
    return dataTaller._nombre === "" || dataTaller._categoria === "";
  }

  existTaller(db, nombreTaller) {
    return store.existsTaller(db, nombreTaller).then(talleres => {
      //if (talleres.length == 0) {     //COMENTADO XQ EL EDITAR TALLER CHOCA CON ESTO
      return Promise.resolve();
      // } else {
      //   return Promise.reject(
      //     new SgatError(
      //       "ya se encuentra un Taller con el nombre: " + nombreTaller,
      //       409
      //     )
      //   );
      // }
    });
  }

  fetchTalleresCategoria(categoria) {
    return this.doOperationOnConnection(db => {
      return store.fetchTalleresCategoria(db, categoria);
    });
  }

  fetchTalleresCatYTaller(categoria, nTaller) {
    return this.doOperationOnConnection(db => {
      return store.fetchTalleresCatYTaller(db, categoria, nTaller);
    });
  }

  fetchTaller(id) {
    return this.doOperationOnConnection(db => {
      return store.fetchTaller(db, id);
    });
  }

  fetchTalleresQueContienenCursos() {
    return this.doOperationOnConnection(db => {
      return store.fetchTalleresQueContienenCursos(db);
    });
  }

  /**
   * Cursos
   */

  fetchCursosCompletos() {
    return this.doOperationOnConnection(db => {
      return store.fetchCursosCompletos(db);
    });
  }

  fetchCursos() {
    return this.doOperationOnConnection(db => {
      return store.fetchCursos(db);
    });
  }

  fetchCurso(id) {
    return this.doOperationOnConnection(db => {
      return store.fetchCurso(db, id);
    });
  }

  putCurso(idCurso, newDataCurso) {
    return this.doOperationOnConnection(db => {
      return store.editCurso(db, idCurso, newDataCurso);
    });
  }

  pushCurso(dataCurso) {
    let curso = new Curso(dataCurso);

    if (!this.validarCurso(dataCurso)) {
      return this.doOperationOnConnection(db => {
        return store.pushCurso(db, curso);
      });
    } else {
      return Promise.reject(
        new SgatError("El Cupo del curso no puede ser NEGATIVO", 409)
      );
    }
    return this.doOperationOnConnection(db => {
      return store.pushCurso(db, curso);
    });
  }

  validarCurso(dataCurso) {
    return dataCurso._cupo < 0;
  }

  fetchCursosTaller(idTaller) {
    return this.doOperationOnConnection(db => {
      return store.fetchCursosTaller(db, idTaller);
    });
  }

  /**
   * Alumnos
   */

  putAlumnoCurso(idCurso, idPersona) {
    return this.doOperationOnConnection(db => {
      return store.fetchCursoRaw(db, idCurso).then(dataCurso => {
        return Curso.estaRepetidoPersona(dataCurso, idPersona)
          .then(() => {
            if (Curso.personaBorrada(dataCurso, idPersona)) {
              return store.updateCursoRemoveAlumnoBaja(db, idCurso, idPersona);
            }
            return store.updateCursoAlumno(db, idCurso, idPersona);
          })
          .catch(e => Promise.reject(e));
      });
    });
  }

  deleteAlumnoCurso(idCurso, idPersona) {
    return this.doOperationOnConnection(db => {
      return store.fetchCursoRaw(db, idCurso).then(dataCurso => {
        if (Curso.sePuedeBorrarAlumno(dataCurso, idPersona)) {
          return store.updateCursoBajaAlumno(db, idCurso, idPersona);
        } else {
          Promise.reject(new SgatError("No se puede eliminar el alumno", 404));
        }
      });
    });
  }

  /**
   * Espera de alumnos en curso
   */

  putAlumnoEsperaCurso(idCurso, idPersona) {
    return this.doOperationOnConnection(db => {
      return store.fetchCursoRaw(db, idCurso).then(dataCurso => {
        return Curso.estaRepetidoPersona(dataCurso, idPersona)
          .then(() => {
            return store.updateCursoAlumnoEspera(db, idCurso, idPersona)
          })
          .catch(e => Promise.reject(e));
      });
    });
  }

  deletePersonaEsperaCurso(idCurso, idPersona) {
    return this.doOperationOnConnection(db => {
      return store.updateCursoEliminarEspera(db, idCurso, idPersona);
    });
  }

  /**
   * Profesores
   */
  postProfesorCurso(idCurso, idPersona) {
    return this.doOperationOnConnection(db => {
      return store.updateCursoProfesor(db, idCurso, idPersona);
    });
  }

  /**
   *  Personas
   */

  putPersona(persona) {
    return this.doOperationOnConnection(db => {
      return store.updatePersona(db, persona);
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
          new SgatError("el dni " + dni + " ya se encuentra en el sistema", 409)
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

  //Borrar DB
  deleteDB() {
    return this.doOperationOnConnection(db => db.dropDatabase());
  }

  isEmptyDB() {
    return this.doOperationOnConnection(db => {
      return db
        .listCollections({}, {
          nameOnly: true
        })
        .toArray()
        .then(list => list.length === 0);
    });
  }

  initializeForTest(testDBObject) {
    return this.doOperationOnConnection(db =>
      store.pushInizializeDdTest(db, testDBObject)
    );
  }
}

let service = new Service();

exports.service = service;