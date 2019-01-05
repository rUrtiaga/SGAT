const React = require("react");
const { ListarAlumnos } = require("./alumnos");
const { Alert } = require("react-alert");
const axios = require("axios");

class AddToStudentsButton extends React.Component {
  render() {
    return (
      <Alert>
        {alert => (
          <button
            className="btn btn-success"
            onClick={() => this.addToStudents(alert, this.props.alumno)}
          >
            <span className="fa fa-plus"> Agregar </span>
          </button>
        )}
      </Alert>
    );
  }

  addToStudents(alert, alumno) {
    return axios
      .put("/api/cursos/" + this.props.idCurso + "/espera/" + alumno._id)
      .then(function(response) {
        alert.success("Se movio a Alumnos a: " + alumno._apellido);
      })
      .catch(function(error) {
        alert.error(error.response.data.message);
        console.log("Error, no se pudo agregar a los alumnos");
      });
  }
}

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

  botones(alum) {
    return (
      <React.Fragment>
        {this.botonDetalle(alum)}
        {this.botonEliminar(alum)}
        <AddToStudentsButton alumno={alum} idCurso={this.state.idCurso} />
      </React.Fragment>
    );
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
