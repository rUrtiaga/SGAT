const React = require("react");
const axios = require("axios");

const { Selector } = require("./componentesComunes/selector");
const { InputPersona } = require("./componentesComunes/inputPersona");
const { AceptarYCancelar } = require("./componentesComunes/botones");
const { DHLBar } = require("./componentesComunes/DHLBar");

class DHLList extends React.Component {
  render() {
    return (
      <div className="card mt-sm-2">
        <div className="card-body">
          {this.props.children}
          <DHLBar
            editar={true}
            guardarDHL={this.props.guardarDHL}
            // borrarDHL={this.props.borrarDHL}
          />
        </div>
      </div>
    );
  }
}

class NuevoCurso extends React.Component {
  constructor(props) {
    super(props);
    this.curso = this.props.curso || {};
    this.state = {
      profesores: this.curso._profesores || [],
      profesoresId: this.idsProfesores(this.curso._profesores) || [],
      listaDHL: this.curso._diasHorariosLugares || [],
      tallerId: this.curso._tallerID || "",
      taller: "",
      cupo: this.curso._cupo || "",
      dia: "Lunes",
      hora: "",
      lugar: "",
      comentario: this.curso._comentario || "",

      confirmacion: false,
      inputCurso: false,
      inputPersonaOculto: false,
      borrarDHL: true
    };
  }

  componentDidMount() {
    this.borrarCursoEnPadre();
    // this.seleccionarCategoria(this.state.tallerId);
  }

  borrarCursoEnPadre() {
    this.props.rootComponent.state.curso = undefined;
  }

  idsProfesores(profesores) {
    return profesores ? profesores.map(p => p._id) : undefined;
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

  guardarDHL(dia, hora, lugar) {
    let varDHL = {
      _dia: dia,
      _horario: hora,
      _lugar: lugar
    };
    this.setState({
      listaDHL: [...this.state.listaDHL, varDHL],
      dia: "",
      hora: "",
      lugar: "",
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
      _alumnos: [],
      _alumnosBaja: [],
      _espera: [],
      _esperaBaja: [],
      _diasHorariosLugares: this.state.listaDHL,
      _tallerID: this.state.tallerId,
      _comentario: this.state.comentario,
      _cupo: this.state.cupo,
      _profesores: this.state.profesoresId
    };
    axios
      .post("/api/cursos", curso)
      .then(function(res) {
        alert.success("Se creó correctamente la nueva CURSADA");
      })
      .then(this.cancelarAgregado())
      .catch(function(error) {
        console.log(error);
        alert.error("ERROR - " + error.response.data.message);
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
    this.setState({
      inputPersonaOculto: true
    });
  }

  ocultarNuevaPersona() {
    this.setState({
      inputPersonaOculto: false
    });
  }
  cancelarPersona() {
    this.ocultarNuevaPersona();
  }

  agregarProfesor(persona) {
    this.setState(
      {
        profesores: [...this.state.profesores, persona],
        profesoresId: [...this.state.profesoresId, persona._id]
      },
      () => this.ocultarNuevaPersona()
    );
  }
  nuevaPersona() {
    if (this.state.inputPersonaOculto) {
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

  mostrarProfesores() {
    if (!(this.state.profesoresId.length === 0)) {
      return (
        <div className="card mb-2 mt-2">
          <p> Profesores: </p>{" "}
          <h5>
            {" "}
            {this.state.profesores.map(
              p => p._apellido + ", " + p._nombre + " / "
            )}{" "}
          </h5>{" "}
        </div>
      );
    }
  }

  mostrarDhl() {
    if (this.state.listaDHL) {
      return this.state.listaDHL.map(dhl => (
        <DHLBar
          key={dhl._dia + dhl._horario + dhl._lugar + dhl._id}
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
    if (this.state.confirmacion === false) {
      return this.inputCurso();
    } else {
      return this.datosCursoSeleccionado();
    }
  }

  datosCursoSeleccionado() {
    return (
      <div className="card mb-8 mt-2">
        <div className="form-group">
          <div className="col-md-6">
            <h5> Usted esta a punto de crear la siguiente Cursada: </h5>{" "}
            <p>
              {" "}
              Categoria: <b> {this.state.taller._categoria} </b>{" "}
            </p>{" "}
            <p>
              {" "}
              Taller: <b> {this.state.taller._nombre} </b>{" "}
            </p>{" "}
            <p>
              {" "}
              SubCategoria: <b> {this.state.taller._subCategoria} </b>{" "}
            </p>{" "}
            {this.mostrarDhl} {this.profesoresOAviso()} {this.dhlOAviso()}{" "}
          </div>
          <AceptarYCancelar
            acceptText={"Aceptar"}
            cancelText={"Volver"}
            cancelar={() => this.volver()}
            aceptar={alert => this.guardarCurso(alert)}
          />{" "}
        </div>{" "}
      </div>
    );
  }

  profesoresOAviso() {
    if (this.state.profesores.length === 0) {
      return (
        <div className="alert alert-warning" role="alert">
          Aviso!: no se ha asignado ningún Profesor.{" "}
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
          Aviso!: no se ha asignado dia, horario y lugar.{" "}
        </div>
      );
    } else {
      return this.mostrarDhl;
    }
  }

  inputCurso() {
    return (
      <React.Fragment>
        <div className="form-group">
          <Selector
            padre={this}
            subCategoriaId={this.state.tallerId}
            callbackNuevoCurso={c => this.seleccionarCategoria(c)}
          />{" "}
        </div>{" "}
        <div className="form-group form-row">
          <div className="col-md-2">
            <label htmlFor="cupo"> Cupo: </label>{" "}
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
            />{" "}
          </div>{" "}
        </div>{" "}
        <DHLList guardarDHL={(d, h, l) => this.guardarDHL(d, h, l)}>
          {this.mostrarDhl()}
        </DHLList>
        <div className="form-group form-row">
          <div className="col">
            <label htmlFor="comentario"> Comentario: </label>{" "}
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
            />{" "}
          </div>{" "}
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
              Agregar Docente{" "}
            </button>{" "}
          </div>{" "}
        </AceptarYCancelar>{" "}
      </React.Fragment>
    );
  }

  render() {
    return (
      <div className="container">
        <h3 className="mt-4 mb-4"> Nueva Cursada </h3>
        {this.inputOConfirmacion()}
        {this.nuevaPersona()}{" "}
      </div>
    );
  }
}

module.exports.NuevoCurso = NuevoCurso;
