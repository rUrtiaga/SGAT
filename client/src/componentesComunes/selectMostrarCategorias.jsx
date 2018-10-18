const React = require("react");

class MuestraCategorias extends React.Component {
  render() {
    return (
      <div className="col">
        <select
          value={this.props.categoriaSeleccionada}
          className="form-control"
          onChange={this.manejarSeleccion.bind(this)}
          id="categorias"
        >
          {this.desplegarCategorias()}
        </select>
      </div>
    );
  }

  manejarSeleccion(event) {
    this.props.seleccionar(event.target.value);
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
