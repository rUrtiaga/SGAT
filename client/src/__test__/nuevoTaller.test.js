import axios from "axios";

//axios.defaults.baseURL = "http://localhost:3001/";
const proxyApi = require("../forBuild/proxyApi.js");
axios.defaults.baseURL = proxyApi.default;



describe("Nuevo Taller API", () => {
  let ids
  let indice

  afterAll(() => { 
      return axios
      .delete("api/talleres/" + ids[0])
      .then(r => {
      })
      .catch(e => {
        console.log(e);
      })    
  });


  test("guardar un taller", done => {
    const taller = {
      _categoria: "Deportes",
      _nombre: "Futbol",
      _subCategorias: ["inicial"]
    };
    indice = taller._subCategorias.length
    axios
      .post("api/talleres ", taller)
      .then(function(res) {
        expect(res.status).toBe(201);
        console.log("Se creó correctamente el TALLER " + taller._nombre);
        ids = res.data.insertedIds;
        expect(res.status).toBe(201);
        done();
      })

      .catch(function(error) {
        console.log(error);
        fail(error);
      });
  });
});
