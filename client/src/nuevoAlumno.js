const React = require("react");
const axios = require("axios");
const { InputPersona } = require("./componentesComunes/inputPersona.jsx");
const { AceptarYCancelar } = require("./componentesComunes/botones.jsx");

const { Selector } = require("./componentesComunes/selector.jsx");

class NuevoAlumno extends React.Component {
  constructor(props) {
    super(props);
    //la persona deberia ser un id
    this.state = {
      selectorCursoOculto: false,
      inputPersonaOculto: true,
      curso: null
    };
  }

  render() {
    return (
      <div className="container">
        <h3 className="mt-4 mb-4">Nueva Inscripcion</h3>

        {this.state.curso ? (
          <p>
            {" "}
            CURSO - {this.state.curso._taller._nombre}{" "}
            {this.state.curso._taller._subCategoria}
          </p>
        ) : (
          <Selector padre={this} onSelect={c => this.selectCurso(c)} />
        )}
        {this.state.persona ? (
          <p>
            {" "}
            {"D.N.I: " +
              this.state.persona._dni +
              ", Nombre: " +
              this.state.persona._nombre +
              " " +
              this.state.persona._apellido}{" "}
          </p>
        ) : this.state.curso ? (
          <InputPersona
            persona={{}}
            // onCancel={() => this.cancelPersona()}
            onAccept={p => this.acceptPersona(p)}
            padre={this}
          />
        ) : null}
        {this.state.persona && this.state.curso ? (
          <AceptarYCancelar
            cancelar={() => this.cancel()}
            aceptar={() => this.aceptarAlumno()}
          />
        ) : null}
      </div>
    );
  }

  //selecciono y me guardo el id del curso
  selectCurso(curso) {
    this.setState({
      curso
    });
  }

  //this.InputPersona.state
  cancel() {
    this.limpiar();
  }

  acceptPersona(persona) {
    this.setState({
      persona
    });
  }

  limpiar() {
    this.setState({ curso: null, persona: null });
  }

  aceptarAlumno() {
    axios
      .put("/api/cursos/" + this.state.curso._id + "/alumnos", {
        _idPersona: this.state.persona._id
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
}

exports.NuevoAlumno = NuevoAlumno;
