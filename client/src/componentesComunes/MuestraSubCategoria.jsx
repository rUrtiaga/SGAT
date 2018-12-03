const React = require("react");

class MuestraSubCategoria extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nombreSubCategoria: this.props.subCategoria._subCategoria || "",
      idSubCategoria: this.props.subCategoria._id || "",
      mostrarEditar: false,
      nombreEditado: this.props.subCategoria._subCategoria,
      nombreViejo: this.props.subCategoria._subCategoria
    };
  }

  mostrarModificarSubCategoria() {
    this.setState({ mostrarEditar: true });
  }

  guardar() {
    this.setState({ mostrarEditar: false });
  }

  mostrarSubCategoria() {
    return (
      <div className="form-row mb-2 mt-2">
        <div className="col-md-2">
          <input
            type="text"
            className="form-control"
            placeholder="SubCategoria"
            value={this.state.nombreSubCategoria}
            onChange={event =>
              this.setState({
                nombreSubCategoria: event.target.value,
                nombreEditado: event.target.value
              })
            }
          />
        </div>
        <div className="col-md-1">
          <button
            type="button"
            className="btn btn-success"
            onClick={() => {
              this.props.guardarSubC(
                this.state.idSubCategoria,
                this.state.nombreViejo,
                this.state.nombreEditado
              );
              this.guardar();
            }}
          >
            <span className="fa fa-check"> </span>
          </button>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.state.mostrarEditar === false ? (
          <div>
            <button
              className="btn btn-link"
              onClick={() => this.mostrarModificarSubCategoria()}
            >
              {this.state.nombreSubCategoria}
            </button>
            <button
              type="button"
              className="btn btn-link"
              onClick={() =>
                this.props.quitarSubCategoria(this.state.nombreSubCategoria)
              }
            >
              <span className="fa fa-trash"> </span>
            </button>
          </div>
        ) : (
          this.mostrarSubCategoria()
        )}
      </div>
    );
  }
}

module.exports.MuestraSubCategoria = MuestraSubCategoria;
