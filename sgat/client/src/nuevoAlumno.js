const React = require('react')
const axios = require('axios')

class NuevoAlumno extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            persona: {},
            curso: null
        }
    }
    render(){
        return (
            <div className="container">
                <h3 className="mt-4 mb-4">Nueva Inscripcion</h3>
                {/*Acá deberia ir el componente que seleccionas categoria taller nivel */}
                <div className="form-group">
                    <label htmlFor="Curso">Curso</label>
                    <select className="form-control" id="cursos">
                        <option>Ceramica: Principiantes</option>
                        <option>Ceramica: Avanzados</option>
                        <option>Pintura</option>
                        <option>Tallado en madera</option>
                    </select>
                </div>
                <InputPersona id='inputPersona' persona={this.state.persona} padre={this}/>
            </div>
        )
    }
}


class InputPersona extends React.Component{
    constructor(props){
        super(props)
        this._persona = this.props.persona
        this.state = {
            dni: this._persona.dni,
            nombre: this._persona.nombre,
            apellido: this._persona.apellido,
            direccion: this._persona.direccion,
            telPrincipal: this._persona.telPrincipal,
            telSecundario: this._persona.telSecundario,
            mail: this._persona.mail,
            comentario: this._persona.comentario,
        }
    }

    handleChange(event) {
        try {
            this.validate(event.target.name,event.target.value)
            this.setState({[event.target.name] : event.target.value  });
        } catch (error) {
            console.log(error)
        }
    }

    //esto no va
    validate(nameEvent,value){
        switch (nameEvent) {
            case 'dni':
                if(value > 100000000){
                    throw new Error('El dni ingresado es demasiado alto')
                }
                if(value.toString().match(/[^0-9]+$/) ){
                    throw new Error('Ingrese solo numeros')
                }
                break;
 
            default:
                break;
        }
    }

    render(){
        return(
            <React.Fragment>
                <div className="form-group">
                    <div className="form-row">
                        <div className="col">
                            <label htmlFor="name">D.N.I.</label>
                            <input type="text" className="form-control" name="dni" placeholder="D.N.I." value={this.state.dni} onChange={(event) => this.handleChange(event)}/>
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <div className="form-row">
                        <div className="col">
                            <label htmlFor="name">Nombre</label>
                            <input type="text" className="form-control" name="nombre" placeholder="introduzca Nombre" value={this.state.nombre} onChange={(event)=> this.handleChange(event)}/>
                        </div>
                        <div className="col">
                            <label htmlFor="lastname">Apellido</label>
                            <input type="text" className="form-control" name="apellido" placeholder="introduzca Apellido" value={this.state.apellido} onChange={(event)=> this.handleChange(event)}/>
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <h4 className="mt-4 mb-4" htmlFor="contact">Contacto</h4>
                    <div  className="form-group">
                            <label htmlFor="direc">Dirección</label>
                            <input type="text" className="form-control" name="direccion" placeholder="ingrese direccion"value={this.state.direccion} onChange={(event)=> this.handleChange(event)}/>
                    </div>
                    <div className="form-row">
                        <div className="col">
                            <label htmlFor="pPhone">Telefono Principal</label>
                            <input type="number" className="form-control" name="telPrincipal" placeholder="formato: 0224345XXXX" value={this.state.telPrincipal} onChange={(event)=> this.handleChange(event)}/>
                        </div>
                        <div className="col">
                            <label htmlFor="sPhone">Secundario</label>
                            <input type="number" className="form-control" name="telSecundario" placeholder="formato: 0224345XXXX" value={this.state.telSecundario} onChange={(event)=> this.handleChange(event)}/>
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Correo Electronico</label>
                    <input type="email" className="form-control" name="mail" placeholder="nombre@dominio.com" value={this.state.mail} onChange={(event)=> this.handleChange(event)}/>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleFormControlTextarea1">Comentario</label>
                    <textarea className="form-control" name="comentario" rows="3" value={this.state.comentario} onChange={(event)=> this.handleChange(event)}></textarea>
                </div>
                <div className="row justify-content-end">
                    <div className="col-md-2">
                        <button type="submit" className='btn btn-danger' onClick={()=>this.cancel()}>Cancelar</button>
                    </div>
                    <div className="col-md-2">
                        <button type="submit" className='btn btn-primary' onClick={()=>this.aceptarAlumno()} >Aceptar</button>
                    </div>
                </div>

            </React.Fragment>
        )
    }
    cancel(){
        this.limpiar()
        this.props.padre.cancel()
    }

    limpiar(){
        this.setState({
            dni: "",
            nombre: "",
            apellido: "",
            direccion: "",
            telPrincipal: "",
            telSecundario: "",
            mail: "",
            comentario: "",
        })
    }

    aceptarAlumno(){

    }
}

exports.NuevoAlumno= NuevoAlumno
exports.InputPersona = InputPersona