const React = require("react");

class AceptarYCancelar extends React.Component {
  render() {
    return (
      <div className="row justify-content-end">
        <div className="col-md-2">
          <button
            id="cancelar"
            className="btn btn-danger col-12"
            onClick={() => this.props.cancelar()}
          >
            {this.props.cancelText}
          </button>
        </div>
        <div className="col-md-2">
          <button
            id="aceptar"
            className="btn btn-primary col-12"
            onClick={() => this.props.aceptar()}
          >
            {this.props.acceptText}
          </button>
        </div>
      </div>
    );
  }
}

exports.AceptarYCancelar = AceptarYCancelar;
