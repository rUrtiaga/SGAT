
const React = require("react");
const axios = require("axios");
const { MuestraFromProps } = require("./selectMostrarTalleres.jsx");

class MuestraCategorias extends MuestraFromProps {
  constructor(props) {
    super(props);
    this.state = {
      elementsOrError: null,

      actualizo: false
    };
  }

  componentDidMount() {
    this.request();
  }

  componentDidUpdate() {
    //setTimeout(() => { this.request() },30)
}


  request() {
    const self = this;
    axios
      .get("api/categorias")
      .then(respuesta => self.setState({ elementsOrError: respuesta.data }));
  }

  manejarSeleccion(event) {
    this.setState({ seleccionada: event.target.value });
    this.props.padre.setState({ categoria: event.target.value });
  }

  desplegar() {
    return this.state.elementsOrError.map(c => (
      <option key={c} value={c}>
        {c}
      </option>
    ));
  }
}
exports.MuestraCategorias = MuestraCategorias;
