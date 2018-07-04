const React = require('react')
const axios = require("axios")

const {Selector} = require('./componentesComunes/selector.jsx')
const {InputPersona} = require('./componentesComunes/inputPersona.jsx')

const style3 = {
    marginTop: 10
};
const style = {
    marginTop: 20
  };

class NuevoCurso extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            profesores: [],
            profesoresId: [],
            tallerId:"",
            taller:"",
            cupo: "",
            dia: "",
            hora: "",
            lugar: "",
            comentario: "",

            inputCurso: false,
            inputPersonaOculto: false
        }
    }

    guardarCurso(){
            const self = this;
            const DHL = [{"_dia":this.state.dia,"_horario":this.state.hora,"_lugar":this.state.lugar}]
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
            }
            //console.log(curso)
            axios
                .post("/api/cursos", curso)
                .then(function(res) {
                    console.log("se agrego el CURSO " + DHL);
                })
                //.then(this.cancelarAgregado()); 
                .catch(function(error) {
                    console.log(error);
                });
    }

    cancelarAgregado() {
        this.setState({
            indice: 0,
            profesores: [],
            profesoresId: [],
            tallerId:"",
            cupo: "",
            dia: "",
            hora: "",
            lugar: "",
            comentario: "",
            inputCurso: false,
            inputPersonaOculto:false  
        })
       
    }
    agregarDocente(){
        this.setState({ inputPersonaOculto: true });
    }
    acceptPersona() {
        this.ocultarNuevaPersona()   
    }
    ocultarNuevaPersona(){
        this.setState({ inputPersonaOculto: false });
    }
    cancelarPersona(){
        this.ocultarNuevaPersona()
    }

    nuevaPersona(){
        if (this.state.inputPersonaOculto) {
            return(
            <InputPersona
              id="inputPersona"
              persona={{}}
              padre={this}
              onCancel={this.cancelarPersona.bind(this)}
              onAccept={p => this.acceptPersona(p)}
            />
            )
    }
}
    acceptPersona(persona) {
        this.agregarProfesor(persona)
        this.ocultarNuevaPersona()
    }

    agregarProfesor(persona) {
        var prof = this.state.profesores;
        var profId = this.state.profesoresId

        prof[this.state.indice] = persona
        profId[this.state.indice] = persona._Id
            this.setState({ profesor: prof });
            this.setState({ profesorId: profId });
            this.setState({indice: this.state.indice + 1});
      }

    mostrarProfesores(){
        if(!(this.state.profesoresId.length === 0)){
            return (
              <div className="card mb-2" style={style}>
              <p>Profesores:</p>
              
              <h5>{this.state.profesores.map( p => p._apellido + " ")}</h5>
              
              
              </div>
          )
        }
    }

    seleccionarCategoria(valor) {
        this.setState({ tallerId: valor });

        //const self = this;
        //axios
        //   .get("api/talleres/"+ self.state.tallerId)
        //    .then(respuesta => {
        //    self.setState({ taller: respuesta.data })
        //})      
    }

    render() {
        return (
            
            <div className="m-4 container-fluid recuadroPantalla">

                <div className="card">
                    <div className="card-header bg-primary text-white">
                        <h3>Nuevo Curso</h3>
                    </div>
                </div>
                
                <Selector padre={this} callbackNuevoCurso={c => this.seleccionarCategoria(c)} />
                
                <div className="card mb-3" style={style3}>
                    <div className="form-group">
                        <div className="col-md-1">
                            <label htmlFor="cupo">Cupo:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="cupo"
                                value={this.state.cupo}
                                onChange={(event) => this.setState({cupo: event.target.value})}/>
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="cupo">Dia:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="cupo"
                                value={this.state.dia}
                                onChange={(event) => this.setState({dia: event.target.value})}/>
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="lugar">Lugar:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="lugar"
                                value={this.state.lugar}
                                onChange={(event) => this.setState({lugar: event.target.value})}/>
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="hora">Horario:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="hora"
                                value={this.state.hora}
                                onChange={(event) => this.setState({hora: event.target.value})}/>
                        </div>
                        <div className="col">
                            <label htmlFor="comentario">Comentario:</label>
                            <input
                                type="textarea"
                                className="form-control"
                                id="comentario"
                                row="3"
                                value={this.state.comentario}
                                onChange={(event) => this.setState({comentario: event.target.value})}/>
                        </div>
                      
                            {this.mostrarProfesores()}
         
                    </div>
                </div>

                <div className="row justify-content-end" style={style3}>
                    <div className="col-md-2">
                        <button className='btn btn-danger' onClick={() => this.agregarDocente()}>Agregar Docente</button>
                    </div>
                    <div className="col-md-2">
                        <button className='btn btn-danger' onClick={() => this.cancelarAgregado()}>Cancelar</button>
                    </div>
                    <div className="col-md-2">
                        <button className='btn btn-primary' onClick={() => this.guardarCurso()}>Guardar Curso</button>
                    </div>
                </div>

            {
                this.nuevaPersona()
            }

            </div>
        )
    }
}

module.exports.NuevoCurso = NuevoCurso