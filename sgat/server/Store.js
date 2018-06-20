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
    return db
      .collection("talleres")
      .find({ _categoria: cat })
      .toArray();
  }

  fetchTaller(db, id) {
    return this.fetchID(db, "talleres", id);
  }

  fetchCurso(db, id) {
    // return this.fetchID(db, "cursos", id);
    return db.collection("cursos").aggregate([
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
      }
    ]).toArray();
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
      .find({ _taller: idTaller })
      .toArray();
  }
  pushCurso(db, curso) {
    return db.collection("cursos").insertMany([curso]);
  }

  updateCursoAlumno(db, idCurso, idPersona) {
    let personaOID = new ObjectID(idPersona);
    let cursoOID = new ObjectID(idCurso);
    return db
      .collection("cursos")
      .updateOne({ _id: cursoOID }, { $push: { _alumnos: personaOID } });
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
