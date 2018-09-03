const React = require("react");
const axios = require("axios");
const { InputPersona } = require("./componentesComunes/inputPersona.jsx");
const { AceptarYCancelar } = require("./componentesComunes/botones.jsx");

const { Selector } = require("./componentesComunes/selector.jsx");

class NuevoAlumno extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectorCursoOculto: true,
      inputPersonaOculto: true,
      curso: null
    };
    this.mostrarAceptarAlumno = () => this.state.persona && this.state.curso;
  }

  componentDidMount() {
    this.borrarCursoIdEnPadre();
    if (this.props.cursoId) {
      this.fetchCurso(this.props.cursoId).then(c => this.selectCurso(c));
    } else {
      this.setState({selectorCursoOculto:false})
    }
  }

  borrarCursoIdEnPadre() {
    this.props.rootComponent.state.cursoId = undefined;
  }

  fetchCurso(idCurso) {
    console.log(idCurso);
    return axios
      .get("/api/cursos/" + idCurso)
      .then(lc => {
        return lc.data[0];
      })
      .catch(e => console.log(e));
  }

  render() {
    return (
      <div className="container">
        <h3 className="mt-4 mb-4">Nueva Inscripción</h3>

        {this.state.selectorCursoOculto  ? null : (
          <Selector padre={this} onSelect={c => this.selectCurso(c)} />
        )}
        {console.log("curso" + this.state.curso)}

        {this.state.inputPersonaOculto ? null : (
          <React.Fragment>
            <p>
              {" "}
              CURSO - {this.state.curso._taller._nombre}{" "}
              {this.state.curso._taller._subCategoria}
            </p>
            <InputPersona
              persona={this.state.persona || {}}
              onCancel={() => this.cancelPersona()}
              onAccept={p => this.acceptPersona(p)}
              padre={this}
            />
          </React.Fragment>
        )}
        {this.mostrarAceptarAlumno() ? (
          <React.Fragment>
            <p className="mb-3">
              {" "}
              ¿Desea agregar al curso {this.state.curso._taller._nombre}{" "}
              {this.state.curso._taller._subCategoria} el alumno llamado{" "}
              {this.state.persona._nombre +
                " " +
                this.state.persona._apellido}{" "}
              con {"D.N.I: " + this.state.persona._dni} ?{" "}
            </p>

            <AceptarYCancelar
              acceptText={"Si"}
              cancelText={"No"}
              cancelar={() => this.cancel()}
              aceptar={alert => this.aceptarAlumno(alert)}
            />
          </React.Fragment>
        ) : null}
      </div>
    );
  }

  //selecciono y me guardo el id del curso
  selectCurso(curso) {
    this.setState({
      curso: curso,
      selectorCursoOculto: true,
      inputPersonaOculto: !this.state.inputPersonaOculto
    });
  }

  //this.InputPersona.state
  cancel() {
    this.limpiar();
  }

  cancelPersona() {
    this.setState({
      inputPersonaOculto: true,
      selectorCursoOculto: false
    });
  }

  acceptPersona(persona) {
    this.setState({
      persona,
      inputPersonaOculto: !this.state.inputPersonaOculto
    });
  }

  limpiar() {
    this.setState({
      curso: null,
      persona: null,
      inputPersonaOculto: true,
      selectorCursoOculto: false
    });
  }

  aceptarAlumno(alert) {
    let self = this;
    axios
      .put("/api/cursos/" + this.state.curso._id + "/alumnos", {
        _idPersona: this.state.persona._id
      })
      .then(function(response) {
        console.log(response);
        alert.success("Se agregó el alumno a el curso")
        self.limpiar();
      })
      .catch(function(error) {
        alert.error(error.response.data.message)
        console.log(error);
      });
  }
}

exports.NuevoAlumno = NuevoAlumno;
