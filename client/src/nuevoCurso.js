const React = require("react");
const axios = require("axios");

const { Alert } = require('react-alert');

const { Selector } = require("./componentesComunes/selector.jsx");
const { InputPersona } = require("./componentesComunes/inputPersona.jsx");
const { AceptarYCancelar } = require("./componentesComunes/botones.jsx");

class NuevoCurso extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profesores: [],
      profesoresId: [],
      listaDHL: [],
      DhlString: [],
      dias:["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"],
      tallerId: "",
      taller: "",
      cupo: "0",
      dia: "Lunes",
      hora: "",
      lugar: "",
      comentario: "",
     

      confirmacion: false,
      inputCurso: false,
      inputPersonaOculto: false,
      borrarDHL:true
    };
  }

  confirmar() {
    this.setState({ confirmacion: !this.state.confirmacion });
  }

  volver() {
    this.setState({ confirmacion: false });
  }

  guardarDHL(dia, hora, lugar) {
    var varDHL = {
      _dia: dia,
      _horario: hora,
      _lugar: lugar
    }
    this.setState({ 
      listaDHL: [...this.state.listaDHL, varDHL] ,
      DhlString: [...this.state.DhlString,
                 (this.state.dia + " a las " + this.state.hora + " en " + this.state.lugar)],   
      dia:"",
      hora:"",
      lugar:"",
      borrarDHL: false
    });
    
    
  }
  borrarDHL(){
    var coleccion = this.state.listaDHL
    var colString = this.state.DhlString
    coleccion.splice(coleccion.length-1,1)
    colString.splice(colString.length-1,1)
    this.setState({listaDHL: coleccion})
    this.setState({DhlString: colString})
      
    if (coleccion.length === 0){
        this.setState({borrarDHL: true })
    }
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
      .then(function (res) {
        console.log("se agrego el CURSO ");
        alert.success('Se creó correctamente el nuevo CURSO');
      })
      .then(this.cancelarAgregado())
      .catch(function (error) {
        console.log(error);
        alert.error('Fallo al crear el nuevo CURSO');
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
          <h5>{this.state.profesores.map(p => p._apellido + ", " + p._nombre + " / ")}</h5>
        </div>
      );
    }
  }

  mostrarDhl() {
    if (!(this.state.DhlString.length === 0)) {
      return (
       
          <p>{this.state.DhlString.map(d => d + " / ")}</p>
        
      );
    }
  }

  seleccionarCategoria(valor) {
    this.setState({ tallerId: valor });
    const self = this;
    axios.get("api/talleres/" + valor).then(respuesta => {
      self.setState({ taller: respuesta.data })
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
              {this.mostrarDhl}
              {this.mostrarProfesores()}
            </div>
  
              <AceptarYCancelar
                acceptText={"Aceptar"}
                cancelText={"Volver"}
                cancelar={() => this.volver()}
                aceptar={(alert) => this.guardarCurso(alert)}
              >
            </AceptarYCancelar>    
                
          </div>
        </div>
      </div>
    );
  }

  manejarSeleccion(event) {
    this.setState({ dia: event.target.value })
  }

  desplegarDias() {
    return this.state.dias.map(c => (
      <option key={c} value={c}>
        {c}
      </option>
    )
    
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
          <div className="col-md-2">
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
        </div>
        <div className= "card mt-sm-2">
        <div className="card-body">
        <div className="form-group form-row">
          <div className="col-md-4">
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

          <div className="col-md-2">
            <label htmlFor="cupo">Dia:</label>
            <select
                className="form-control"
                onChange={this.manejarSeleccion.bind(this)}
                id="dias">
                {this.desplegarDias()}
            </select>

            {/* <input
              type="text"
              max="15"
              className="form-control"
              id="cupo"
              placeholder="Por Ej. Lunes"
              value={this.state.dia}
              onChange={event => this.setState({ dia: event.target.value })}
            /> */}
          </div>
          <div className="col-md-2">
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
          <div className="col-md-1 mt-4">
              <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => this.guardarDHL(this.state.dia,this.state.hora,this.state.lugar)}>
                  <span className="fa fa-plus">  </span>
              </button>
          </div>
           <div className="col-md-1 mt-4">
              <button
                  type="button"
                  className="btn btn-danger"
                  disabled = {this.state.borrarDHL}
                  onClick={() => this.borrarDHL()}>
                  <span className="fa fa-minus">  </span>
              </button>
            </div>
        </div>
        {this.mostrarDhl()}
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
          <div className="col col-md-3">
            <button
              className="btn btn-success col-12"
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
