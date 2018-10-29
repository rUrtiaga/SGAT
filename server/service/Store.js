const {
  ObjectID
} = require("mongodb");

/* Tres cosas de carlos
 *  - no vale abrir mas de una conexion para cada llamada por API
 *  - digamos que el servicio es el encargado de manejar la conexion
 *  - vale que un store "haga de servicio" para llamados API sencillos.
 *    En tal caso, tener dos metodos: el autosuficiente (que no recibe parametros)
 *    y el normal (que recibe la db por parametro)
 * 
 * 
 * 
 * categoria:{_id:aa,_nombre:"unaCategoria"}

    taller: {_id:sarasa,_categoria:"unaCategoria",_subCategoria:'Aborigen',_nombre:"Ceramica"}
    curso: {_id:sa,_taller:sarasa,_alumnos:[], _profesores:[], ...}
    persona: {_id:p,_dni:12345678,_nombre,_apellido,_fechaNacimiento,_telPrincipal,_telSecundario,_mail,_comentario,}
 */

class Store {
  /**
   * Funciones generales
   */
  fetchID(db, col, id) {
    return db.collection(col).findOne({
      _id: ObjectID(id)
    });
  }

  /**
   * Metodos de operacion
   */

  pushTalleres(db, talleres) {
    return db.collection("talleres").insertMany(talleres);
  }

  fetchTalleres(db) {
    return db
      .collection("talleres")
      .find()
      .toArray();
  }
  existsTaller(db, nombreTaller) {
    return db
      .collection("talleres")
      .find({
        _nombre: nombreTaller
      })
      .toArray();
  }

  fetchTalleresCategoria(db, cat) {
    return (
      db
      .collection("talleres")
      .find({
        _categoria: cat
      })
      .toArray()
    );
  }
  fetchTalleresCatYTaller(db, cat, taller) {
    return db
      .collection("talleres")
      .find({
        _categoria: cat,
        _nombre: taller
      })
      .toArray();
  }

  fetchTaller(db, id) {
    return this.fetchID(db, "talleres", id);
  }

  fetchCursoRaw(db, id) {
    return this.fetchID(db, "cursos", id);
  }


  fetchCurso(db, id) {
    return db
      .collection("cursos")
      .aggregate([{
          $match: {
            _id: ObjectID(id)
          }
        },
        {
          $lookup: {
            from: "personas",
            localField: "_profesores",
            foreignField: "_id",
            as: "_profesores"
          }
        },
        {
          $lookup: {
            from: "talleres",
            localField: "_tallerID",
            foreignField: "_id",
            as: "_taller"
          }
        },
        {
          $addFields: {
            _taller: {
              $ifNull: [{
                  $arrayElemAt: ["$_taller", 0]
                },
                {
                  message: "Problema en taller"
                }
              ]
            },
            _alumnos: {
              $setDifference: ["$_alumnos", "$_alumnosBaja"]
            }
          }
        },
        {
          $lookup: {
            from: "personas",
            localField: "_alumnos",
            foreignField: "_id",
            as: "_alumnos"
          }
        }
      ])
      .toArray();
  }

  fetchCursosCompletos(db) {
    return db
      .collection("cursos")
      .aggregate([{
          $lookup: {
            from: "personas",
            localField: "_profesores",
            foreignField: "_id",
            as: "_profesores"
          }
        },
        {
          $addFields: {
            _hayCupo: {
              $gt: [
                "$_cupo",
                {
                  $subtract: [{
                    $size: "$_alumnos"
                  }, {
                    $size: "$_alumnosBaja"
                  }]
                }
              ]
            },
            _cantAlumnos: {
              $subtract: [{
                $size: "$_alumnos"
              }, {
                $size: "$_alumnosBaja"
              }]
            }

          }
        }
      ])
      .toArray();
  }

  fetchCursos(db) {
    return db
      .collection("cursos")
      .find()
      .toArray();
  }

  fetchCursosTaller(db, idTaller) {
    return (
      db
      .collection("cursos")
      .aggregate([{
          $match: {
            _tallerID: ObjectID(idTaller)
          }
        },
        {
          $lookup: {
            from: "personas",
            localField: "_profesores",
            foreignField: "_id",
            as: "_profesores"
          }
        },
        {
          $lookup: {
            from: "talleres",
            localField: "_tallerID",
            foreignField: "_id",
            as: "_taller"
          }
        },
        {
          $addFields: {
            _taller: {
              $ifNull: [{
                  $arrayElemAt: ["$_taller", 0]
                },
                {
                  message: "Problema en taller"
                }
              ]
            },
            _hayCupo: {
              $gt: [
                "$_cupo",
                {
                  $subtract: [{
                    $size: "$_alumnos"
                  }, {
                    $size: "$_alumnosBaja"
                  }]
                }
              ]
            }
          }
        }
      ])
      .toArray()
    );
  }

  pushCurso(db, curso) {
    return db.collection("cursos").insertMany([curso]);
  }

  editCurso(db, idCurso, newDataCurso) {
    return db.collection("cursos").updateOne({
      _id: ObjectID(idCurso)
    }, {
      $set: {
        _diasHorariosLugares: newDataCurso._diasHorariosLugares,
        _tallerID: ObjectID(newDataCurso._tallerID),
        _comentario: newDataCurso._comentario,
        _cupo: newDataCurso._cupo,
        _profesores: newDataCurso._profesores.map(p => new ObjectID(p))
      }
    })
  }

  updateCurso(db, property, idCurso, idPersona) {
    return db.collection("cursos").updateOne({
      _id: ObjectID(idCurso)
    }, {
      $push: {
        [property]: ObjectID(idPersona)
      }
    });
  }

  updateCursoAlumno(db, idCurso, idPersona) {
    return this.updateCurso(db, "_alumnos", idCurso, idPersona);
  }

  updateCursoRemoveAlumnoBaja(db, idCurso, idPersona) {
    return db
      .collection("cursos")
      .updateOne({
        _id: ObjectID(idCurso)
      }, {
        $pull: {
          _alumnosBaja: ObjectID(idPersona)
        }
      });
  }

  updateCursoBajaAlumno(db, idCurso, idPersona) {
    return db.collection("cursos").updateOne({
      _id: ObjectID(idCurso),
      _alumnos: ObjectID(idPersona)
    }, {
      $addToSet: {
        _alumnosBaja: ObjectID(idPersona)
      }
    });
  }

  updateCursoProfesor(db, idCurso, idPersona) {
    return this.updateCurso(db, "_profesores", idCurso, idPersona);
  }

  fetchPersonaDNI(db, dni) {
    return db.collection("personas").findOne({
      _dni: parseInt(dni)
    });
  }

  fetchPersona(db, id) {
    return this.fetchID(db, "personas", id);
  }

  pushPersona(db, persona) {
    return db.collection("personas").insertMany([persona]);
  }

  updatePersona(db, persona) {
    let id = persona._id
    delete persona._id;
    return db.collection("personas").updateOne({
      _id: ObjectID(id)
    }, {
      $set: persona
    });
  }

  fetchCategorias(db) {
    return db
      .collection("categorias")
      .find()
      .toArray();
  }

  pushCategoria(db, categoria) {
    return db.collection("categorias").insertMany([{
      _categoria: categoria
    }]);
  }

  existsCategoria(db, categoria) {
    return db
      .collection("categorias")
      .find({
        categoria: categoria
      })
      .toArray();
  }

  pushInizializeDdTest(db, dbTestObject) {
    return db
      .collection("personas")
      .insertMany(dbTestObject.personas)
      .then(() => db.collection("talleres").insertMany(dbTestObject.talleres))
      .then(() => db.collection("cursos").insertMany(dbTestObject.cursos))
      .then(() =>
        db.collection("categorias").insertMany(dbTestObject.categorias)
      );
  }
}

let store = new Store();

exports.store = store;