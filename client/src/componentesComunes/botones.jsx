const React = require("react");

class AceptarYCancelar extends React.Component {
  render() {
    return (
      <div className="row justify-content-end">
        <div className="col-md-2">
          <button
            id="cancelar"
            className="btn btn-danger"
            onClick={() => this.props.cancelar()}
          >
            Cancelar
          </button>
        </div>
        <div className="col-md-2">
          <button
            id="aceptar"
            className="btn btn-primary"
            onClick={() => this.props.aceptar()}
          >
            Aceptar
          </button>
        </div>
      </div>
    );
  }
}

exports.AceptarYCancelar = AceptarYCancelar;
