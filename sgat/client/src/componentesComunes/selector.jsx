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

    render(){
        return(
            <div>
                <MuestraCategorias padre={this} />
                {this.state.categoria ? (
                  <MuestraTalleres select={this.state.categoria} padre={this} />
                ) : null}
                {this.state.taller ? (
                  <MuestraSubCategorias select={this.state.taller} padre={this} />
                ) : null}
            </div>
    )
    }
}


exports.Selector = Selector;