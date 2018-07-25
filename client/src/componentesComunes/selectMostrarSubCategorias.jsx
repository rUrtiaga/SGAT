const React = require("react");

class MuestraSubCategorias extends React.Component {

  manejarSeleccion(event) {
    this.props.seleccionar(event.target.value);
  }

  render() {
    return (
      <div className="col">
        <select
          className="form-control"
          onChange={this.manejarSeleccion.bind(this)}
          id="subCategorias"
        >
          {this.desplegar()}
        </select>
      </div>
    );
  }

  //la key y el value deben ser remplazadas por id
  desplegar() {
    return this.props.subCategorias.map(c => (
      <option key={c._id} value={c._id}>
        {c._subCategoria}
      </option>
    ));
  }
}

exports.MuestraSubCategorias = MuestraSubCategorias;
