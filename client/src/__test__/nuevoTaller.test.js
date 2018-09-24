import axios from "axios";

//axios.defaults.baseURL = "http://localhost:3001/";
const proxyApi = require("../forBuild/proxyApi.js");
axios.defaults.baseURL = proxyApi.default;

async function borradoids(ides, cant){

  // MODIFICAR POR LA NUEVA VERSION
  let responses = []
  try {
    for (let index = 0; index < cant; index++) {
      responses.push(await axios.delete("api/talleres/" + ides[index]))
    }
  } catch (error) {  
  }
  return responses

}

describe("Nuevo Taller API", () => {
  let ids
  let idsCant = 0

  afterEach(() => { 
    console.log(idsCant)
    if (idsCant > 0){
      borradoids(ids, idsCant)
      idsCant = 0
    }
    })  

  test("guardar un taller", done => {
    const taller = {
      _categoria: "Deportes",
      _nombre: "Futbol",
      _subCategorias: ["ninios","adultos","otros"]
    };
    axios
      .post("api/talleres ", taller)
      .then(function(res) {
        expect(res.status).toBe(201);
        ids = res.data.insertedIds
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
          _subCategorias: ["uno","dos"]
        };
      axios
      .post("api/talleres ", taller)
      .then(function(res) {
        done();
      })
      .catch(error => {
        expect(error.response.status).toBe(409);
        expect(error.response.data.message).toMatch("ya se encuentra un Taller con el nombre: " + taller._nombre)
        done()
      });
  });

})