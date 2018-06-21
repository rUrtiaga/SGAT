const React = require("react");
const axios = require("axios");
const {MuestraFromProps} = require('./selectMostrarTalleres.jsx')

class MuestraSubCategorias extends MuestraFromProps {
    constructor(props) {
        super(props);
        this.state = {};
      }
    
      request() {
        const self = this;
        axios
          .get("api1/talleres/"+ this.props.select +"/subcategorias" )
          .then(respuesta =>{
            self.setState({ elementsOrError: JSON.parse(respuesta.data)})
          });
      }
    
      manejarSeleccion(event) {
        this.props.seleccionar( event.target.value )
      }
    
      //la key y el value deben ser remplazadas por id
      desplegar() {
        return this.state.elementsOrError.map(c => (
          <option key={c._nombre} value={c._nombre}>
            {c._nombre}
          </option>
        ));
      }
}


exports.MuestraSubCategorias = MuestraSubCategorias;