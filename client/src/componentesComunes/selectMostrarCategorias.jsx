const React = require("react");

class MuestraCategorias extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categorias: []
    };
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
    this.props.seleccionar(event.target.value) 
  }

  desplegarCategorias() {
    return this.props.categorias.map(c => (
      <option key={c} value={c}>
        {c}
      </option>
    ));
  }
}

exports.MuestraCategorias = MuestraCategorias;

