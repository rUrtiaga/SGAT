const React = require("react");

class MuestraSubCategorias extends React.Component {
  manejarSeleccion(event) {
    this.props.seleccionar(event.target.value);
  }

  render() {
    return (
      <div className="col">
        <select
          value={this.props.subCategoriaSeleccionada}
          className="form-control"
          onChange={this.manejarSeleccion.bind(this)}
          id="subCategorias"
        >
          {this.desplegar()}
        </select>
      </div>
    );
  }

  desplegar() {
    return this.props.subCategorias.map(c => (
      <option key={c._id} value={c._id}>
        {c._subCategoria}
      </option>
    ));
  }
}

exports.MuestraSubCategorias = MuestraSubCategorias;
