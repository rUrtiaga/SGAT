const {
    MongoClient,
    ObjectID
} = require("mongodb");

const dbServerURL = process.env.MONGO_SERVER || "mongodb://localhost:27017/";
const dbName = "sgat";

class Mongo {
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

    deleteID(id) {
        return this.doOperationOnConnection(db => {
            return deleteByID(db, id)
        })
    }

    removeAlumno(idCurso,idPersona){
        return this.doOperationOnConnection(db => {
            return removeAlumno(db,idCurso,idPersona)
        })    
    }

}

function removeAlumno(db, idCurso, idPersona) {
    return db
      .collection("cursos")
      .updateOne({
        _id: ObjectID(idCurso)
      }, {
        $pull: {
          _alumnos: ObjectID(idPersona)
        }
      });
  }


function deleteByID(db, id) {
    return db
        .collections()
        .then(collections => findCollection(collections, id))
        .then(collection =>
            collection.remove({
                _id: ObjectID(id)
            })
            .catch(e => {
                console.log(e);
                return Promise.reject(e);
            })
        ).catch(e => {
            console.log(e);
            Promise.reject(e)
        });
}


let mongo = new Mongo();

exports.mongo = mongo;