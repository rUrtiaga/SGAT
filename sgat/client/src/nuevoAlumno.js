const React = require('react')
const axios = require('axios')
const {InputPersona} = require('./componentesComunes/inputPersona.jsx')

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
    //this.InputPersona.state
    cancel(){
        this.limpiar()
    }

    limpiar(){
        this.setState({curso: null})
    }

    aceptarAlumno(){

    }
}


exports.NuevoAlumno= NuevoAlumno