import axios from "axios";
const { mongo } = require("./MongoConection.js");

const proxyApi = require("../forBuild/proxyApi.js");
axios.defaults.baseURL = proxyApi.default;

 async function borradoIds(ides) {
  for (let index = 0; index < ides.length ; index++) {
    await mongo.deleteID(ides[index])
  }
}

function pasarObjectAArray(object, cant){
  var array = []
  for (let index = 0; index < cant; index++) {
    array.push(object[index])
  }
  return array

}

describe("Nuevo Taller API", () => {
  let ids;
  let idsCant = 0;

  afterEach( async () => {
    // if (idsCant > 0) {
    //    await borradoIds(pasarObjectAArray(ids,idsCant));
    //   idsCant = 0;
    // }
    return mongo.deleteID(ids[0])
    .then()
    .catch(e => console.log(e))
  });

  test("guardar un CURSO", done => {
    const curso = {
      _alumnos: [],
      _alumnosBaja: [],
      _espera: [],
      _esperaBaja: [],
      _diasHorariosLugares: [{_dia: "Lunes",_horario: "20:00",_lugar: "Casa de la Cultura"}],
      _tallerID: "5b7c865635be6f6b700f1f31",
      _comentario: "esto es un comentario",
      _cupo: 21,
      _profesores: ["5b787ed1369ff1357e5b7293"]
    };
    axios
    .post("/api/cursos", curso)
      .then(function(res) {
        expect(res.status).toBe(201);
        ids = res.data.insertedIds;
        idsCant = res.data.insertedCount;
        done();
      })
      .catch(function(error) {
        fail(error);
      });
  });

  test("guardar un curso con cupo negativo", done => {
    const curso = {
        _alumnos: [],
        _alumnosBaja: [],
        _espera: [],
        _esperaBaja: [],
        _diasHorariosLugares: [{_dia: "Lunes",_horario: "20:00",_lugar: "Casa de la Cultura"}],
        _tallerID: "5b7c865635be6f6b700f1f31",
        _comentario: "esto es un comentario",
        _cupo: -15,
        _profesores: ["5b787ed1369ff1357e5b7293"]
      };
    axios
    .post("/api/cursos", curso)
      .then(function(res) {
        done();
      })
      .catch(error => {
        expect(error.response.status).toBe(409);
        expect(error.response.data.message).toMatch(
          "El Cupo del curso no puede ser NEGATIVO");
        done();
      });
  });

});