const axios = require("axios");
const proxyApi = require("../forBuild/proxyApi.js");
const {mongo} = require("./MongoConection.js");

axios.defaults.baseURL = proxyApi.default;


let idCurso = "5b983861756b0a1a73c656b3";
let idPersona = "5b983993756b0a1a73c656b9";


describe("API Nuevo Alumno en curso", () => {

    describe("Existoso", () => {

        afterAll(done => {
            return mongo.removeAlumno(idCurso,idPersona)
                .then(r => {
                    expect(r.result).toEqual({ n: 1, nModified: 1, ok: 1 });
                    done();
                })
                .catch(e => {
                    console.log(e);
                });
        })

        test("put persona en alumnos", done => {
            return axios
                .put("/api/cursos/"+idCurso+"/alumnos", {
                    _idPersona: idPersona
                })
                .then(r => {
                    expect(r.status).toBe(200);
                    done();
                })
                .catch(e => {
                    console.log(e);
                });
        });

    })
    describe("Fallidos", () => {
        test("persona que ya esta en alumnos", done => {
            return axios
                .put("/api/cursos/"+idCurso+"/alumnos", {
                    _idPersona: "5b983a07756b0a1a73c656bb"
                })
                .then(r => {
                    console.log(r);
                })
                .catch(e => {
                    expect(e.response.status).toBe(409);
                    expect(e.response.data.message).toEqual('Esta persona ya se encuentra en el curso');
                    done();
                });
        });
        test("persona que es profesor intento agregar a alumnos", done => {
            return axios
                .put("/api/cursos/"+idCurso+"/alumnos", {
                    _idPersona: "5b98384a756b0a1a73c656b2"
                })
                .then(r => {
                    console.log(r);
                })
                .catch(e => {
                    expect(e.response.status).toBe(409);
                    expect(e.response.data.message).toEqual('Esta persona ya se encuentra en el curso');
                    done();
                });
        });
    })
})