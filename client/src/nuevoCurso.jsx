const React = require("react");
const axios = require("axios");

const { Fragment, Component } = require("react");
const { Selector } = require("./componentesComunes/selector");
const { InputPersona } = require("./componentesComunes/inputPersona");
const { AceptarYCancelar } = require("./componentesComunes/botones");
const { DHLBar } = require("./componentesComunes/DHLBar");
const {
  MostrarPersona
} = require("./componentesComunes/MostrarPesonaConCerrar");
const { Confirmacion } = require("./componentesComunes/confirmacion");

class DHLList extends Component {
  render() {
    return (
      <div className="card mt-sm-2">
        <div className="card-body">
          <div className="row">
            <div className="col-md-7">
              <label htmlFor="lugar"> Lugar: </label>
            </div>
            <div className="col-md-2">
              <label htmlFor="cupo"> Dia: </label>
            </div>
            <div className="col-md-3">
              <label htmlFor="hora"> Horario: </label>
            </div>
          </div>
          <DHLBar editar={true} guardarDHL={this.props.guardarDHL} />
          {this.props.children}
        </div>
      </div>
    );
  }
}

class NuevoCurso extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profesores: [],
      listaDHL: [],
      taller: "",
      cupo: 10,
      comentario: "",
      anio: this.cicloActual(),

      confirmacion: false,
      inputCurso: false,
      mostrarInputPersona: false,
      borrarDHL: true
    };
  }

  cicloActual() {
    let today = new Date();
    return today.getFullYear() + (today.getMonth() > 9 ? 1 : 0);
  }

  idsProfesores(profesores) {
    return profesores ? profesores.map(p => p._id) : [];
  }

  confirmar() {
    this.setState({
      confirmacion: !this.state.confirmacion
    });
  }

  volver() {
    this.setState({
      confirmacion: false
    });
  }

  guardarDHL(dhl) {
    console.log("DHL:", dhl);
    this.setState({
      listaDHL: [...this.state.listaDHL, dhl],
      borrarDHL: false
    });
  }

  editarDHL(dhl, eDHL) {
    let listDHL = this.state.listaDHL;
    listDHL.splice(listDHL.indexOf(dhl), 1, eDHL);
    this.setState({
      listaDHL: listDHL
    });
  }

  borrarDHL(dhl) {
    let listDHL = this.state.listaDHL;
    listDHL.splice(listDHL.indexOf(dhl), 1);
    this.setState({
      listaDHL: listDHL
    });
  }

  guardarCurso(alert) {
    const curso = {
      _diasHorariosLugares: this.state.listaDHL,
      _tallerID: this.state.tallerId,
      _comentario: this.state.comentario,
      _cupo: this.state.cupo,
      _profesores: this.idsProfesores(this.state.profesores),
      _anio: this.state.anio
    };
    axios
      .post("/api/cursos", curso)
      .then(function(res) {
        alert.success("Se creó correctamente la nueva CURSADA");
      })
      .then(() => this.cancelarAgregado())
      .catch(function(error) {
        console.log(error);
        alert.error("ERROR - " + error.response.data.message);
      });
  }

  cancelarAgregado() {
    this.props.history.goBack();
  }

  agregarDocente() {
    this.setState({
      mostrarInputPersona: !this.state.mostrarInputPersona
    });
  }

  ocultarNuevaPersona() {
    this.setState({
      mostrarInputPersona: false
    });
  }

  cancelarPersona() {
    this.ocultarNuevaPersona();
  }

  agregarProfesor(persona) {
    this.setState(
      {
        profesores: [...this.state.profesores, persona]
      },
      () => this.ocultarNuevaPersona()
    );
  }

  nuevaPersona() {
    if (this.state.mostrarInputPersona && !this.state.confirmacion) {
      return (
        <InputPersona
          id="inputPersona"
          persona={{}}
          padre={this}
          onCancel={this.cancelarPersona.bind(this)}
          onAccept={p => this.agregarProfesor(p)}
        />
      );
    }
  }

  borrarProfesor(persona) {
    let listProfesores = this.state.profesores;
    listProfesores.splice(listProfesores.indexOf(persona), 1);
    this.setState({
      profesores: listProfesores
    });
  }

  mostrarProfesores() {
    if (!(this.state.profesores.length === 0)) {
      return (
        <div className="container border mb-2 ">
          <p> Profesores: </p>
          <h5>
            {this.state.profesores.map(p => (
              <MostrarPersona
                key={p._dni}
                persona={p}
                delete={() => this.borrarProfesor(p)}
              />
            ))}
          </h5>
        </div>
      );
    }
  }

  mostrarDhl() {
    if (this.state.listaDHL) {
      return this.state.listaDHL.map(dhl => (
        <DHLBar
          key={dhl._dia + dhl._horario + dhl._lugar + Math.random()}
          dia={dhl._dia}
          horario={dhl._horario}
          lugar={dhl._lugar}
          guardarDHL={(d, h, l) => this.guardarDHL(d, h, l)}
          borrarDHL={() => this.borrarDHL(dhl)}
          editarDHL={editadoDHL => this.editarDHL(dhl, editadoDHL)}
        />
      ));
    }
  }

  seleccionarCategoria(valor) {
    this.setState({
      tallerId: valor
    });
    const self = this;
    axios.get("api/talleres/" + valor).then(respuesta => {
      self.setState({
        taller: respuesta.data
      });
    });
  }

  inputOConfirmacion() {
    if (this.state.confirmacion) {
      return this.datosCursoSeleccionado();
    } else {
      return this.inputCurso();
    }
  }

  datosCursoSeleccionado() {
    return (
      <Confirmacion
        cancelar={() => this.volver()}
        aceptar={alert => this.guardarCurso(alert)}
      >
        <h5>
          Usted esta a punto de {this.state.cursoId ? "editar" : "crear"} la
          siguiente Cursada:
        </h5>
        <p key="1">
          Categoria: <b> {this.state.taller._categoria} </b>
        </p>
        <p key="2">
          Taller: <b> {this.state.taller._nombre} </b>
        </p>
        <p key="3">
          SubCategoria: <b> {this.state.taller._subCategoria} </b>
        </p>
        {this.mostrarDhl} {this.profesoresOAviso()} {this.dhlOAviso()}
      </Confirmacion>
    );
  }

  profesoresOAviso() {
    if (this.state.profesores.length === 0) {
      return (
        <div className="alert alert-warning" role="alert">
          Aviso!: no se ha asignado ningún Profesor.
        </div>
      );
    } else {
      return this.mostrarProfesores;
    }
  }

  dhlOAviso() {
    if (this.state.listaDHL.length === 0) {
      return (
        <div className="alert alert-warning" role="alert">
          Aviso!: no se ha asignado dia, horario y lugar.
        </div>
      );
    } else {
      return this.mostrarDhl;
    }
  }

  inputCurso() {
    if (!this.state.mostrarInputPersona) {
      return (
        <Fragment>
          <div className="form-group">
            <Selector
              padre={this}
              subCategoriaId={this.state.tallerId}
              callbackNuevoCurso={c => this.seleccionarCategoria(c)}
            />
          </div>
          <div className="form-group form-row">
            <div className="col-md-2">
              <label htmlFor="cupo"> Cupo: </label>
              <input
                type="number"
                min="1"
                max="999"
                className="form-control"
                id="cupo"
                placeholder="000"
                value={this.state.cupo}
                onChange={event =>
                  this.setState({
                    cupo: event.target.value
                  })
                }
              />
            </div>
            <div className="col-md-2">
              <label htmlFor="anio"> Año: </label>
              <input
                disabled={this.state.editar}
                type="number"
                min={new Date().getFullYear()}
                max={new Date().getFullYear() + 30}
                className="form-control"
                id="anio"
                placeholder="000"
                value={this.state.anio}
                onChange={event =>
                  this.setState({
                    anio: event.target.value
                  })
                }
              />
            </div>
          </div>
          <DHLList guardarDHL={(d, h, l) => this.guardarDHL(d, h, l)}>
            {this.mostrarDhl()}
          </DHLList>
          <div className="form-group form-row">
            <div className="col">
              <label htmlFor="comentario"> Comentario: </label>
              <input
                type="textarea"
                className="form-control"
                id="comentario"
                placeholder="Agregue algún comentario"
                row="3"
                value={this.state.comentario}
                onChange={event =>
                  this.setState({
                    comentario: event.target.value
                  })
                }
              />
            </div>
          </div>
          {this.mostrarProfesores()}
          <AceptarYCancelar
            acceptText={"Guardar Cursada"}
            cancelText={"Cancelar"}
            cancelar={() => this.cancelarAgregado()}
            aceptar={() => this.confirmar()}
          >
            <div className="col col-md-3">
              <button
                className="btn btn-success col-12"
                onClick={() => this.agregarDocente()}
              >
                Agregar Docente
              </button>
            </div>
          </AceptarYCancelar>
        </Fragment>
      );
    }
  }

  render() {
    return (
      <div className="container">
        <h3 className="mt-4 mb-4">
          {this.curso ? "Editando" : "Nueva"} Cursada
        </h3>
        {this.inputOConfirmacion()}
        {this.nuevaPersona()}
      </div>
    );
  }
}

class EditarCurso extends NuevoCurso {
  constructor(props) {
    super(props);
    this.curso = this.props.location.state.curso || {};
    this.state = {
      editar: true,
      cursoId: this.curso._id,
      profesores: this.curso._profesores || [],
      listaDHL: this.curso._diasHorariosLugares || [],
      taller: "",
      cupo: this.curso._cupo || 10,
      comentario: this.curso._comentario || "",
      anio: this.curso._anio || this.cicloActual(),

      confirmacion: false,
      inputCurso: false,
      mostrarInputPersona: false,
      borrarDHL: true
    };
  }

  componentDidMount() {
    this.seleccionarCategoria(this.curso.tallerID);
  }

  guardarCurso(alert) {
    const curso = {
      _diasHorariosLugares: this.state.listaDHL,
      _tallerID: this.state.tallerId,
      _comentario: this.state.comentario,
      _cupo: this.state.cupo,
      _profesores: this.idsProfesores(this.state.profesores),
      _anio: this.state.anio
    };
    axios
      .put("/api/cursos/" + this.state.cursoId, curso)
      .then(r => alert.success("Se modificó correctamente la cursada"))
      .then(() => this.cancelarAgregado())
      .catch(function(error) {
        console.log(error);
        alert.error("No se pudo modificar esta cursada");
      });
  }
}
module.exports.NuevoCurso = NuevoCurso;
module.exports.EditarCurso = EditarCurso;
