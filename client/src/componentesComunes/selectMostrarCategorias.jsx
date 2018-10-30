const React = require("react");

class MuestraCategorias extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categ: this.props.categoriaSeleccionada
    };
  }

  render() {
    return (
      <div className="col">
        <select
          value={this.state.categ}
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
    this.setState({ categ: this.props.seleccionar(event.target.value) });
  }

  seleccionarCategoriaInicial() {
    this.setState({
      categ: this.props.categoriaSeleccionada
    });
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
