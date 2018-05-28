const React = require('react')
const axios = require('axios')
const {InputPersona} = require('./componentesComunes/inputPersona.jsx')

class NuevoAlumno extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            selectorCursoOculto: false,
            inputPersonaOculto: false,
            persona: {dni:1234,nombre:"juan"},
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
                {(this.state.inputPersonaOculto)? null :<InputPersona id='inputPersona' persona={this.state.persona} padre={this} onCancel={this.cancel} onAccept={this.acceptPersona}/>}
                
            </div> 
        )
    }
    //this.InputPersona.state
    cancel(){
        this.limpiar()
    }

    acceptPersona(){
        console.log('estoy en Nuevo Alumno')
        this.setState({inputPersonaOculto: true})
    }

    limpiar(){
        this.setState({curso: null})
    }

    aceptarAlumno(){

    }
}


exports.NuevoAlumno= NuevoAlumno