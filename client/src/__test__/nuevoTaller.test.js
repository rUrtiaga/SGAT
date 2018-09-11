import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001/";

describe("Nuevo Taller API", () => {
  it("guardar un taller", done => {
    const taller = {
      _categoria: "Deportes",
      _nombre: "Futbol",
      _subCategorias: ["inicial", "intermedio"]
    };
    expect.assertions(1);
    axios
      .post("api/talleres ", taller)
      .then(function(res) {
        expect(res.status).toBe(201);
        console.log("Se creó correctamente el TALLER " + taller._nombre);
        done();
      })
      .catch(function(error) {
        console.log(error);
        fail(error);
      });
      //borrar el taller que se creo
  });
});
