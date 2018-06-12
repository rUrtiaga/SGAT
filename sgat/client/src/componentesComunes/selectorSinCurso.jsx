const React = require('react')
const {MuestraCategorias} = require('./selectMostrarCategorias.jsx')
const {MuestraTalleres} = require('./selectMostrarTalleres.jsx')
const {MuestraSubCategorias} = require('./selectMostrarSubCategorias.jsx')



class Selector extends React.Component{
    constructor(props){
        super(props)
        this.state = {
        }
    }

    seleccionMuestraCategorias(valor){
        this.setState({categoria:valor ,taller: null ,subCategoria:null, curso:null})
    }

    seleccionMuestraTalleres(valor){
        this.setState({ taller: valor ,subCategoria:null, curso:null})
    }

    seleccionSubCategoria(valor){
        this.setState({subCategoria:valor,curso:null})  
        this.guardarDatos() 
        } 

    guardarDatos(){
        this.props.padre.categoria(this.state.categoria)
        this.props.padre.taller(this.state.taller)
        this.props.padre.subCategoria(this.state.subCategoria)
    }

    seleccionCurso(valor){
        this.setState({ curso: valor })
    }

    render(){
        return(
            <div className="mt-3 mb-3">
                <MuestraCategorias seleccionar={(v)=>this.seleccionMuestraCategorias(v)} padre={this} />
                {this.state.categoria ? (
                  <MuestraTalleres select={this.state.categoria} seleccionar={(v)=>this.seleccionMuestraTalleres(v)} padre={this} />
                ) : null}
                {this.state.taller ? (
                  <MuestraSubCategorias select={this.state.taller} seleccionar={(v)=>this.seleccionSubCategoria(v)} padre={this} />
                ) : null}
                { //this.state.subCategoria ? (
                  //<MuestraCursos select={this.state.subCategoria} seleccionar={(v)=>this.seleccionCurso(v)} padre={this} />
                //) : null
            } 
            </div>
    )
    }
}


exports.Selector = Selector;