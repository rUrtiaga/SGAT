const React = require("react");
const axios = require("axios");

const { Selector } = require("./componentesComunes/selector.jsx");
const { InputPersona } = require("./componentesComunes/inputPersona.jsx");
const { AceptarYCancelar } = require("./componentesComunes/botones.jsx");

class NuevoCurso extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profesores: [],
      profesoresId: [],
      tallerId: "",
      taller: "",
      cupo: "",
      dia: "",
      hora: "",
      lugar: "",
      comentario: "",

      confirmacion: false,
      inputCurso: false,
      inputPersonaOculto: false
    };
  }

  confirmar() {
    this.setState({ confirmacion: !this.state.confirmacion });
  }

  volver() {
    this.setState({ confirmacion: false });
  }
  guardarCurso() {
    const DHL = [
      {
        _dia: this.state.dia,
        _horario: this.state.hora,
        _lugar: this.state.lugar
      }
    ];
    const curso = {
      _alumnos: [],
      _alumnosBaja: [],
      _espera: [],
      _esperaBaja: [],
      _diasHorariosLugares: DHL,
      _tallerID: this.state.tallerId,
      _comentario: this.state.comentario,
      _cupo: this.state.cupo,
      _profesores: this.state.profesoresId
    };
    axios
      .post("/api/cursos", curso)
      .then(function(res) {
        console.log("se agrego el CURSO " + DHL);
      })
      .then(this.cancelarAgregado())
      .catch(function(error) {
        console.log(error);
      });
  }

  cancelarAgregado() {
    this.setState({
      indice: 0,
      profesores: [],
      profesoresId: [],
      tallerId: "",
      cupo: "",
      dia: "",
      hora: "",
      lugar: "",
      comentario: "",
      inputCurso: false,
      inputPersonaOculto: false,
      confirmacion: false
    });
  }
  agregarDocente() {
    this.setState({ inputPersonaOculto: true });
  }
  
  ocultarNuevaPersona() {
    this.setState({ inputPersonaOculto: false });
  }
  cancelarPersona() {
    this.ocultarNuevaPersona();
  }

  nuevaPersona() {
    if (this.state.inputPersonaOculto) {
      return (
        <InputPersona
          id="inputPersona"
          persona={{}}
          padre={this}
          onCancel={this.cancelarPersona.bind(this)}
          onAccept={p => this.acceptPersona(p)}
        />
      );
    }
  }
  acceptPersona(persona) {
    this.agregarProfesor(persona);
  }

  agregarProfesor(persona) {
    this.setState({ profesores: [...this.state.profesores, persona] });
    this.setState(
      { profesoresId: [...this.state.profesoresId, persona._id] },
      () => this.ocultarNuevaPersona()
    );
  }

  mostrarProfesores() {
    if (!(this.state.profesoresId.length === 0)) {
      return (
        <div className="card mb-2 mt-2">
          <p>Profesores:</p>
          <h5>{this.state.profesores.map(p => p._apellido + " ")}</h5>
        </div>
      );
    }
  }

  seleccionarCategoria(valor) {
    this.setState({ tallerId: valor });
    const self = this;
    axios.get("api/talleres/" + self.state.tallerId).then(respuesta => {
      self.setState({ taller: respuesta.data });
    });
  }

  inputOConfirmacion() {
    if (this.state.confirmacion === false) {
      return this.inputCurso();
    } else {
      return this.datosCursoSeleccionado();
    }
  }

  datosCursoSeleccionado() {
    return (
      <div>
        <div className="card mb-8 mt-2">
          <div className="form-group">
            <div className="col-md-6">
              <h5>Usted esta a punto de crear el siguiente Curso:</h5>
              <p>
                {" "}
                Categoria: <b>{this.state.taller._categoria}</b>
              </p>
              <p>
                {" "}
                Taller: <b>{this.state.taller._nombre}</b>
              </p>
              <p>
                {" "}
                SubCategoria: <b>{this.state.taller._subCategoria}</b>
              </p>
              <p>
                {" "}
                Dia: <b>{this.state.dia}</b>
              </p>
              <p>
                {" "}
                Hora: <b>{this.state.hora}</b>
              </p>
              <p>
                {" "}
                Lugar: <b>{this.state.lugar}</b>
              </p>
              {this.mostrarProfesores()}
            </div>
            <div className="row justify-content-center mt-2">
              <div className="col-md-2">
                <button
                  className="btn btn-danger"
                  onClick={() => this.volver()}
                >
                  Volver
                </button>
              </div>
              <div className="col-md-2">
                <button
                  className="btn btn-primary"
                  onClick={() => this.guardarCurso()}
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  inputCurso() {
    return (
      <React.Fragment>
        <div className="form-group">
          <Selector
            padre={this}
            callbackNuevoCurso={c => this.seleccionarCategoria(c)}
          />
        </div>
        <div className="form-group form-row">
          <div className="col-md-4">
            <label htmlFor="cupo">Cupo:</label>
            <input
              type="number"
              min="1"
              max="999"
              className="form-control"
              id="cupo"
              placeholder="000"
              value={this.state.cupo}
              onChange={event => this.setState({ cupo: event.target.value })}
            />
          </div>

          <div className="col-md-8">
            <label htmlFor="lugar">Lugar:</label>
            <input
              type="text"
              max="30"
              className="form-control"
              id="lugar"
              placeholder="Por Ej. Casa de la Cultura"
              value={this.state.lugar}
              onChange={event => this.setState({ lugar: event.target.value })}
            />
          </div>
        </div>
        <div className="form-group form-row">
          <div className="col-md-6">
            <label htmlFor="cupo">Dia:</label>
            <input
              type="text"
              max="15"
              className="form-control"
              id="cupo"
              placeholder="Por Ej. Lunes"
              value={this.state.dia}
              onChange={event => this.setState({ dia: event.target.value })}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="hora">Horario:</label>
            <input
              type="time"
              className="form-control"
              id="hora"
              placeholder="00:00"
              value={this.state.hora}
              onChange={event => this.setState({ hora: event.target.value })}
            />
          </div>
        </div>

        <div className="form-group form-row">
          <div className="col">
            <label htmlFor="comentario">Comentario:</label>
            <input
              type="textarea"
              className="form-control"
              id="comentario"
              placeholder="Agregue algún comentario"
              row="3"
              value={this.state.comentario}
              onChange={event =>
                this.setState({ comentario: event.target.value })
              }
            />
          </div>
        </div>

        {this.mostrarProfesores()}
        
        <AceptarYCancelar
          acceptText={"Guardar Curso"}
          cancelText={"Cancelar"}
          cancelar={() => this.cancelarAgregado()}
          aceptar={() => this.confirmar()}
        >
          <div className="col col-md-2">
            <button
              className="btn btn-danger col-12"
              onClick={() => this.agregarDocente()}
            >
              Agregar Docente
            </button>
          </div>
        </AceptarYCancelar>
      </React.Fragment>
    );
  }

  render() {
    return (
      <div className="container">
        <h3 className="mt-4 mb-4">Nuevo Curso</h3>

        {this.inputOConfirmacion()}

        {this.nuevaPersona()}
      </div>
    );
  }
}

module.exports.NuevoCurso = NuevoCurso;
