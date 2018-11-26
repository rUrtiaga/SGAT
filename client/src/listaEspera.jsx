const { ListarAlumnos } = require("./alumnos");
const axios = require("axios");

class ListaEspera extends ListarAlumnos {
  setDataCurso(json) {
    this.setState({
      listaDeAlumnos: json[0]._espera,
      nombreTaller: json[0]._taller._nombre,
      categoriaTaller: json[0]._taller._categoria,
      subCategoriaTaller: json[0]._taller._subCategoria,
      cupo: json[0]._cupo
    });
  }

  removeAlumno(alumno, alert) {
    return axios
      .delete("/api/cursos/" + this.state.idCurso + "/espera/" + alumno._id)
      .then(function(response) {
        alert.success("Se retiro de la lista de espera :  " + alumno._apellido);
      })
      .catch(function(error) {
        alert.error(error.response.data.message);
        console.log("Error, no se pudo retirar de la lista de espera");
      });
  }
}

module.exports.ListaEspera = ListaEspera;
