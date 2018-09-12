const axios = require("axios");
const proxyApi = require("../forBuild/proxyApi.js");

axios.defaults.baseURL = proxyApi.default;

describe("API Persona", () => {
  let id;

  //Despues de cada test de agregado, borro la persona
  afterEach(done => {
   return axios
      .delete("/api/personas/" + id)
      .then(r => {
        done();
      })
      .catch(e => {
        console.log(e);
      });
  });


  test("push persona - exitoso", done => {
    expect.assertions(1);
    return axios
      .post("/api/personas", {
        _dni: 99999999,
        _nombre: "Juan",
        _apellido: "Casta",
        _mail: "a@a.com",
        _telPrincipal: "1231233",
        _telSecundario: "12312313",
        _fechaNac: "2015-12-31T00:00:00.000Z"
      })
      .then(r => {
        id = r.data.insertedIds[0];
        expect(r.status).toBe(201);
        done()
      })
      .catch(e => {
        console.log(e)
      })
  });
});
