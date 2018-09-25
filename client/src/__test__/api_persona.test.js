const axios = require("axios");
const proxyApi = require("../forBuild/proxyApi.js");
const {
  mongo
} = require("./MongoConection.js");

axios.defaults.baseURL = proxyApi.default;


describe("API Persona  ", () => {

  describe("Existoso", () => {
    let id;

    //Despues de unos test, borro la persona
    afterAll(done => {
      return mongo.deleteID(id).then(r => {
        expect(r.result).toEqual({
          "n": 1,
          "ok": 1
        });
        done()
      }).catch(e => console.log(e))
    });


    test("PUSH persona", done => {
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

    test("GET persona  - dni", done => {
      return axios
        .get("/api/personas?dni=99999999")
        .then(r => {
          expect(r.status).toBe(200);
          expect(r.data._dni).toBe(99999999);
          expect(r.data._mail).toBe("a@a.com");
          expect(r.data._nombre).toBe("Juan");
          expect(r.data._apellido).toBe("Casta");
          expect(r.data._telPrincipal).toBe("1231233");
          expect(r.data._telSecundario).toBe("12312313");
          expect(r.data._fechaNac).toBe("2015-12-31T00:00:00.000Z");
          done()
        })
        .catch(e => {
          console.log(e)
        })
    });

    test("GET persona  - Id", done => {
      return axios
        .get("/api/personas/" + id)
        .then(r => {
          expect(r.status).toBe(200);
          expect(r.data._dni).toBe(99999999);
          expect(r.data._mail).toBe("a@a.com");
          expect(r.data._nombre).toBe("Juan");
          expect(r.data._apellido).toBe("Casta");
          expect(r.data._telPrincipal).toBe("1231233");
          expect(r.data._telSecundario).toBe("12312313");
          expect(r.data._fechaNac).toBe("2015-12-31T00:00:00.000Z");
          done()
        })
        .catch(e => {
          console.log(e)
        })
    });

    test("PUSH persona - fallido mismo dni", done => {
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
          console.log(r)
        })
        .catch(e => {
          expect(e.response.status).toBe(409);
          expect(e.response.data.message).toMatch('el dni 99999999 ya se encuentra en el sistema')
          done()
        })
    });
  });

  describe("Fallidos", () => {
    test("GET persona - dni", done => {
      return axios
        .get("/api/personas?dni=99999999")
        .then(r => {
          expect(r.status).toBe(200);
          //espero que cuando me devuelva una persona pedida por un dni que no esta cargada, me devuelva un json vacio
          expect(r.data).toEqual({});
          done()
        })
    })
    test("GET persona - id", done => {
      return axios
        .get("/api/personas/5b9cab83137b3341f2b5328d")
        .then(r => {
          console.log(r)
        }).catch(e => {
          expect(e.response.status).toBe(404);
          expect(e.response.data.message).toMatch(/no se encuentra la persona con id/)
          done()
        })
    })
    test("POST persona - nombre con numero", done => {
      return axios
        .post("/api/personas", {
          _dni: 99999999,
          _nombre: "Juan1",
          _apellido: "Casta",
          _mail: "a@a.com",
          _telPrincipal: "1231233",
          _telSecundario: "12312313",
          _fechaNac: "2015-12-31T00:00:00.000Z"
        })
        .then(r => {
          console.log(r)
        }).catch(e => {
          expect(e.response.status).toBe(400);
          expect(e.response.data.message).toMatch('La persona no es valida')
          expect(e.response.data.listElementos).toEqual(['nombre'])
          done()
        })
    })
    test("POST persona - dni alto", done => {
      return axios
        .post("/api/personas", {
          _dni: 199999999,
          _nombre: "Juan",
          _apellido: "Casta",
          _mail: "a@a.com",
          _telPrincipal: "1231233",
          _telSecundario: "12312313",
          _fechaNac: "2015-12-31T00:00:00.000Z"
        })
        .then(r => {
          console.log(r)
        }).catch(e => {
          expect(e.response.status).toBe(400);
          expect(e.response.data.message).toMatch('La persona no es valida')
          expect(e.response.data.listElementos).toEqual(['D.N.I.'])
          done()
        })
    })
    test("POST persona - dni bajo", done => {
      return axios
        .post("/api/personas", {
          _dni: 0,
          _nombre: "Juan",
          _apellido: "Casta",
          _mail: "a@a.com",
          _telPrincipal: "1231233",
          _telSecundario: "12312313",
          _fechaNac: "2015-12-31T00:00:00.000Z"
        })
        .then(r => {
          console.log(r)
        }).catch(e => {
          expect(e.response.status).toBe(400);
          expect(e.response.data.message).toMatch('La persona no es valida')
          expect(e.response.data.listElementos).toEqual(['D.N.I.'])
          done()
        })
    })

    test("POST persona - telefono", done => {
      return axios
        .post("/api/personas", {
          _dni: 99999999,
          _nombre: "Juan",
          _apellido: "Casta",
          _mail: "a@a.com",
          _telPrincipal: "1231233d",
          _telSecundario: "12312-313",
          _fechaNac: "2015-12-31T00:00:00.000Z"
        })
        .then(r => {
          console.log(r)
        }).catch(e => {
          expect(e.response.status).toBe(400);
          expect(e.response.data.message).toMatch('La persona no es valida')
          expect(e.response.data.listElementos).toEqual(['teléfono principal', 'teléfono secundario'])
          done()
        })
    })

    test("POST persona - mail", done => {
      return axios
        .post("/api/personas", {
          _dni: 99999999,
          _nombre: "Juan",
          _apellido: "Casta",
          _mail: "aa.com",
          _telPrincipal: "1231233",
          _telSecundario: "12312313",
          _fechaNac: "2015-12-31T00:00:00.000Z"
        })
        .then(r => {
          console.log(r)
        }).catch(e => {
          expect(e.response.status).toBe(400);
          expect(e.response.data.message).toMatch('La persona no es valida')
          expect(e.response.data.listElementos).toEqual(['mail'])
          done()
        })
    })
    describe("POST persona - Fecha nacimiento", () => {

      test("vacia", done => {
        return axios
          .post("/api/personas", {
            _dni: 99999999,
            _nombre: "Juan",
            _apellido: "Casta",
            _mail: "a@a.com",
            _telPrincipal: "1231233",
            _telSecundario: "12312313",
            _fechaNac: ""
          })
          .then(r => {
            console.log(r)
          }).catch(e => {
            expect(e.response.status).toBe(400);
            expect(e.response.data.message).toMatch('La persona no es valida')
            expect(e.response.data.listElementos).toEqual(['Fecha Nacimiento'])
            done()
          })
      })
      test("no ISO date", done => {
        let a = new Date('2015-12-31').toDateString()
        return axios
          .post("/api/personas", {
            _dni: 99999999,
            _nombre: "Juan",
            _apellido: "Casta",
            _mail: "a@a.com",
            _telPrincipal: "1231233",
            _telSecundario: "12312313",
            _fechaNac: a
          })
          .then(r => {
            console.log(r)
          }).catch(e => {
            expect(e.response.status).toBe(400);
            expect(e.response.data.message).toMatch('La persona no es valida')
            expect(e.response.data.listElementos).toEqual(['Fecha Nacimiento'])
            done()
          })
      })
      test("muy actual", done => {
        let now = new Date().toISOString()
        return axios
          .post("/api/personas", {
            _dni: 99999999,
            _nombre: "Juan",
            _apellido: "Casta",
            _mail: "a@a.com",
            _telPrincipal: "1231233",
            _telSecundario: "12312313",
            _fechaNac: now
          })
          .then(r => {
            console.log(r)
          }).catch(e => {
            expect(e.response.status).toBe(400);
            expect(e.response.data.message).toMatch('La persona no es valida')
            expect(e.response.data.listElementos).toEqual(['Fecha Nacimiento'])
            done()
          })
      })
      test("muy viejo", done => {
        let tooOldDate = new Date("1-1-1800")
        return axios
          .post("/api/personas", {
            _dni: 99999999,
            _nombre: "Juan",
            _apellido: "Casta",
            _mail: "a@a.com",
            _telPrincipal: "1231233",
            _telSecundario: "12312313",
            _fechaNac: tooOldDate
          })
          .then(r => {
            console.log(r)
          }).catch(e => {
            expect(e.response.status).toBe(400);
            expect(e.response.data.message).toMatch('La persona no es valida')
            expect(e.response.data.listElementos).toEqual(['Fecha Nacimiento'])
            done()
          })
      })
    })
  })
});