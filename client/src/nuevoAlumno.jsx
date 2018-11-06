const React = require("react");
const axios = require("axios");
const { InputPersona } = require("./componentesComunes/inputPersona.jsx");
const { AceptarYCancelar } = require("./componentesComunes/botones.jsx");

class NuevoAlumno extends React.Component {
  constructor(props) {
    super(props);
    const params = props.match.params;
    this.state = {
      cursoId: params.cursoId
    };
  }

  mostrarAceptarAlumno() {
    return this.state.persona && this.state.curso;
  }

  componentDidMount() {
    this.fetchCurso(this.state.cursoId).then(c => this.selectCurso(c));
  }

  fetchCurso(idCurso) {
    return axios
      .get("/api/cursos/" + idCurso)
      .then(lc => {
        return lc.data[0];
      })
      .catch(e => console.log(e));
  }

  render() {
    if (!this.state.curso) {
      return null;
    }

    return (
      <div className="container">
        <h3 className="mt-4 mb-4">Nueva Inscripción</h3>
        <Warning show={!this.state.curso._hayCupo}>
          El curso se encuentra lleno y se agregará a la lista de espera
        </Warning>
        {!this.mostrarAceptarAlumno() ? (
          <React.Fragment>
            {console.log(this.state.curso)}

            <LabelCursada curso={this.state.curso} />
            <InputPersona
              persona={this.state.persona || {}}
              onCancel={() => this.props.history.goBack()}
              onAccept={(p, alert) => this.acceptPersona(p, alert)}
              padre={this}
            />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <p className="mb-3">
              {" "}
              ¿Desea agregar al curso {this.state.curso._taller._nombre}{" "}
              {this.state.curso._taller._subCategoria} el alumno llamado{" "}
              {this.state.persona._nombre + " " + this.state.persona._apellido}{" "}
              con {"D.N.I: " + this.state.persona._dni} ?{" "}
            </p>
            <AceptarYCancelar
              acceptText={"Si"}
              cancelText={"No"}
              cancelar={() => this.cancel()}
              aceptar={alert => this.aceptarAlumno(alert)}
            />
          </React.Fragment>
        )}
      </div>
    );
  }

  //selecciono y me guardo el id del curso
  selectCurso(curso) {
    this.setState({
      curso: curso
    });
  }

  cancel() {
    this.limpiar();
  }

  cancelPersona() {
    // this.setState({
    //   inputPersonaOculto: true,
    //   selectorCursoOculto: false
    // });
  }

  acceptPersona(persona) {
    this.setState({
      persona
    });
  }

  limpiar() {
    this.setState({
      persona: null
    });
  }

  aceptarAlumno(alert) {
    let self = this;
    axios
      .put("/api/cursos/" + this.state.curso._id + "/alumnos", {
        _idPersona: this.state.persona._id
      })
      .then(function(response) {
        alert.success("Se agregó el alumno a el curso");
        self.props.history.goBack();
      })
      .catch(function(error) {
        alert.error(error.response.data.message);
        console.log(error);
      });
  }
}

class LabelCursada extends React.Component {
  render() {
    return this.props.curso ? (
      <p>
        CURSADA - {this.props.curso._taller._nombre}{" "}
        {this.props.curso._taller._subCategoria}
      </p>
    ) : null;
  }
}

class Warning extends React.Component {
  render() {
    return this.props.show ? (
      <div className="alert alert-danger">{this.props.children}</div>
    ) : null;
  }
}

exports.NuevoAlumno = NuevoAlumno;
