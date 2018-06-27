
const React = require("react");
const axios = require("axios");

class MuestraCategorias extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categorias: []
    };
  }

  componentDidMount() {
    const self = this;
    axios
      .get("api1/categorias")
      .then(respuesta => self.setState({ categorias: respuesta.data }))
      .then(()=>this.props.seleccionar(this.state.categorias[0]))
  }

  render() {
    return (
      <div className="col">
        <select
          className="form-control"
          onChange={this.manejarSeleccion.bind(this)}
          id="categorias">
          {this.desplegarCategorias()}
        </select>
      </div>
    );
  }

  manejarSeleccion(event) {
    // this.setState({ seleccionada: event.target.value });
    // this.props.padre.setState({ categoria: event.target.value });
    this.props.seleccionar(event.target.value) 
  }

  desplegarCategorias() {
    return this.state.categorias.map(c => (
      <option key={c} value={c}>
        {c}
      </option>
    ));
  }
}

exports.MuestraCategorias = MuestraCategorias;

