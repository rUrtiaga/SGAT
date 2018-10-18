const React = require("react");

/*Este componente requiere:
     request() que guarda lo que trae del servidor parseado en  "elementsOrError"
     manejarSeleccion(event) que tiene el comportamiento de cual selecciona
     desplegar() que mapea a un option la lista de elementos a mostrar
     */
class MuestraFromProps extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.select !== prevState.prevSelect) {
      return {
        prevSelect: nextProps.select,
        elementsOrError: null
      };
    }
    return null;
  }

  componentDidMount() {
    this.request();
  }

  componentDidUpdate(nextProps, prevState) {
    if (this.state.elementsOrError === null) {
      this.request();
    }
  }

  render() {
    if (this.state.elementsOrError === null) {
      return (
        <div className="col">
          <select className="form-control" id="Talleres">
            <option value={null} disabled>
              Aguarde
            </option>
          </select>
        </div>
      );
    } else {
      return (
        <div className="col">
          <select
            className="form-control"
            onChange={this.manejarSeleccion.bind(this)}
            id="Talleres"
          >
            {this.desplegar()}
          </select>
        </div>
      );
    }
  }
}

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

exports.MuestraFromProps = MuestraFromProps;
exports.MuestraTalleres = MuestraTalleres;
