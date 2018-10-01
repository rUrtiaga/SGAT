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
    if (idsCant > 0) {
       await borradoIds(pasarObjectAArray(ids,idsCant));
      idsCant = 0;
    }
  });

  test("guardar un taller", done => {
    const taller = {
      _categoria: "Deportes",
      _nombre: "Futbol",
      _subCategorias: ["ninios", "adultos", "otros"]
    };
    axios
      .post("api/talleres ", taller)
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

  test("guardar un taller duplicado", done => {
    const taller = {
      _categoria: "Deportes",
      _nombre: "Tenis",
      _subCategorias: ["uno", "dos"]
    };
    axios
      .post("api/talleres ", taller)
      .then(function(res) {
        done();
      })
      .catch(error => {
        expect(error.response.status).toBe(409);
        expect(error.response.data.message).toMatch(
          "ya se encuentra un Taller con el nombre: " + taller._nombre
        );
        done();
      });
  });

  test("guardar un taller con blancos", done => {
    const taller = {
      _categoria: "",
      _nombre: "",
      _subCategorias: ["uno", "dos"]
    };
    axios
      .post("api/talleres ", taller)
      .then(function(res) {
        done();
      })
      .catch(error => {
        expect(error.response.status).toBe(409);
        expect(error.response.data.message).toMatch(
          "El Taller tiene datos incompletos");
        done();
      });
  });
});
