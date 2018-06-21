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
            CURSO SELECCIONADO {this.state.curso._subCategoria._taller}{" "}
            {this.state.curso._subCategoria._nombre}
          </p>
        ) : (
          <Selector padre={this} onSelect={c => this.selectCurso(c)} />
        )}
        {this.state.personaID ? (
          <p> {this.state.personaID} </p>
        ) : (
          this.state.curso ? (
            <InputPersona
            persona={{}}
            // onCancel={() => this.cancelPersona()}
            onAccept={pid => this.acceptPersona(pid)}
            padre={this}
          />
         ):null
        )}
        {this.state.personaID && this.state.curso ? (
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


  acceptPersona(personaID) {
    this.setState({
      personaID
    });
  }

  limpiar() {
    this.setState({ curso: null, personaID: null });
  }

  aceptarAlumno() {
    axios
    .post('/api/cursos/0/alumnos' /*+ this.state.curso._id/alumnos */, {_dni:this.state.personaID} )
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
  }
}

exports.NuevoAlumno = NuevoAlumno;
