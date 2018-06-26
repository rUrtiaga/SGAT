const { MongoClient, ObjectID } = require("mongodb");

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
    return db.collection(col).findOne({ _id: ObjectID(id) });
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

  fetchTalleresCategoria(db, cat) {
    return (
      db
        .collection("talleres")
        .find({ _categoria: cat })
        //este agregate era por que pense que tenia que devolver la lista sola
        // .aggregate([
        //   { $match: { _categoria: cat } },
        //   { $group: { _id: "$_nombre" }},
        //   { $project: {_nombre: "$_id",_id : 0}}
        // ])
        .toArray()
    );
  }
  fetchTalleresCatYTaller(db, cat, taller) {
    return db
      .collection("talleres")
      .find({ _categoria: cat, _nombre: taller })
      .toArray();
  }

  fetchTaller(db, id) {
    return this.fetchID(db, "talleres", id);
  }

  fetchCurso(db, id) {
    // return this.fetchID(db, "cursos", id);
    return db
      .collection("cursos")
      .aggregate([
        {
          $match: { _id: ObjectID(id) }
        },
        {
          $lookup: {
            from: "personas",
            localField: "_alumnos",
            foreignField: "_id",
            as: "_alumnos"
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
              $ifNull: [
                { $arrayElemAt: ["$_taller", 0] },
                { message: "Problema en taller" }
              ]
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
    return db
      .collection("cursos")
      // .find({ _tallerID: ObjectID(idTaller) })
      .aggregate([
        {
          $match: { _tallerID: ObjectID(idTaller) }
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
              $ifNull: [
                { $arrayElemAt: ["$_taller", 0] },
                { message: "Problema en taller" }
              ]
            }
          }
        }
      ])
      .toArray();
  }
  pushCurso(db, curso) {
    return db.collection("cursos").insertMany([curso]);
  }

  updateCurso(db, property, idCurso, idPersona) {
    return db
      .collection("cursos")
      .updateOne(
        { _id: ObjectID(idCurso) },
        { $push: { [property]: ObjectID(idPersona) } }
      );
  }

  updateCursoAlumno(db, idCurso, idPersona) {
    return this.updateCurso(db, "_alumnos", idCurso, idPersona);
  }

  updateCursoProfesor(db, idCurso, idPersona) {
    return this.updateCurso(db, "_profesores", idCurso, idPersona);
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
