import axios from "axios";

//axios.defaults.baseURL = "http://localhost:3001/";
const proxyApi = require("../forBuild/proxyApi.js");
axios.defaults.baseURL = proxyApi.default;



describe("Nuevo Taller API", () => {
  let ids = []

  afterEach(() => { 
    if (ids.length != 0){
      for (let index = 0; index < ids.length; index++) {
        const id = ids[index];
        return axios
        .delete("api/talleres/" + id)
        .then(r => {
        })
        .catch(e => {
        }) 
      }

    }  
  });


  test("guardar un taller", done => {
    const taller = {
      _categoria: "Deportes",
      _nombre: "Futbol",
      _subCategorias: ["ninios"]
    };
    axios
      .post("api/talleres ", taller)
      .then(function(res) {
        expect(res.status).toBe(201);
        ids = res.data.insertedIds
        done();
      })
      .catch(function(error) {
        fail(error);
      });
  });

  test("guardar un taller duplicado", done => {
        const taller = {
          _categoria: "Deportes",
          _nombre: "futbol",
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