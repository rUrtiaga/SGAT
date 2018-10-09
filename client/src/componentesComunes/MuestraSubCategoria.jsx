const React = require("react");

class MuestraSubCategoria extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nombreSubCategoria: this.props.subcategoria,
      mostrarEditar: false
    };
  }

  mostrarModificarSubCategoria() {
    this.setState({ mostrarEditar: true });
  }

  cancelar() {
    this.setState({ mostrarEditar: false });
  }

  guardar() {
    //this.props.aceptar()
  }

  mostrarSubCategoria() {
    if (this.state.mostrarEditar === true) {
      return (
        <div className="form-row mb-2 mt-2">
          <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              placeholder="SubCategoria"
              value={this.state.nombreSubCategoria}
              onChange={event =>
                this.setState({ nombreSubCategoria: event.target.value })
              }
            />
          </div>
          <div className="col-md-1">
            <button
              type="button"
              className="btn btn-success"
              onClick={() => this.guardar()}
            >
              <span className="fa fa-plus"> </span>
            </button>
          </div>
          <div className="col-md-1">
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => this.cancelar()}
            >
              <span className="fa fa-minus"> </span>
            </button>
          </div>
        </div>
      );
    }
    return <div />;
  }

  render() {
    return (
      <div>
        <button
          className="btn btn-link"
          onClick={() => this.mostrarModificarSubCategoria()}
        >
          {this.state.nombreSubCategoria}
        </button>
        {this.mostrarSubCategoria()}
      </div>
    );
  }
}

exports.MuestraSubCategoria = MuestraSubCategoria;
