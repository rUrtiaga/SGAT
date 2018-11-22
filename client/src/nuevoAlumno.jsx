const React = require("react");
const axios = require("axios");
const { InputPersona } = require("./componentesComunes/inputPersona.jsx");
const { Confirmacion } = require("./componentesComunes/confirmacion");

class NuevoAlumno extends React.Component {
  constructor(props) {
    super(props);
    const stateRouter = props.location.state;
    this.state = {
      cursoId: stateRouter.cursoId
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
            <LabelCursada curso={this.state.curso} />
            <InputPersona
              persona={this.state.persona || {}}
              onCancel={() => this.props.history.goBack()}
              onAccept={(p, alert) => this.acceptPersona(p, alert)}
              padre={this}
            />
          </React.Fragment>
        ) : (
          <Confirmacion
            aceptar={alert => this.aceptarAlumno(alert)}
            cancelar={() => this.cancel()}
          >
            <p className="mb-3">
              ¿Desea agregar a la cursada{" "}
              <strong>
                {this.state.curso._taller._nombre}{" "}
                {this.state.curso._taller._subCategoria}
              </strong>{" "}
              el alumno llamado{" "}
              <strong>
                {this.state.persona._nombre +
                  " " +
                  this.state.persona._apellido}{" "}
              </strong>
              con D.N.I:
              <strong>{this.state.persona._dni}</strong>?
            </p>
          </Confirmacion>
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
    if (this.state.curso._hayCupo) {
      this.request(alert, "alumnos", "Se agregó el alumno a el curso");
    } else {
      this.request(
        alert,
        "espera",
        "Se agregó el alumno a la lista de espera del curso"
      );
    }
  }

  request(alert, path, successMessage) {
    let self = this;
    axios
      .put(`/api/cursos/${this.state.curso._id}/${path}`, {
        _idPersona: this.state.persona._id
      })
      .then(response => {
        alert.success(successMessage);
        self.props.history.goBack();
      })
      .catch(error => {
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
