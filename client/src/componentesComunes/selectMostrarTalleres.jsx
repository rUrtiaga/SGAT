const React = require("react");

class MuestraTalleres extends React.Component {
  manejarSeleccion(event) {
    this.props.seleccionar(event.target.value);
  }

  render() {
    return (
      <div className="col">
        <select
          value={this.props.tallerSeleccionado}
          className="form-control"
          onChange={this.manejarSeleccion.bind(this)}
          id="Talleres"
        >
          {this.desplegar()}
        </select>
      </div>
    );
  }

  desplegar() {
    return this.props.talleres.map(c => (
      <option key={c} value={c}>
        {c}
      </option>
    ));
  }
}

exports.MuestraTalleres = MuestraTalleres;
