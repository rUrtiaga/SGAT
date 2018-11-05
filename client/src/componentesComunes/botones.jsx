const React = require("react");
const { Alert } = require("react-alert");

class AceptarYCancelar extends React.Component {
  render() {
    return (
      <div className="row justify-content-end">
        {this.props.children}
        <div className="col-md-2 mt-2 mt-md-0">
          <button
            id="cancelar"
            className="btn btn-danger col-12"
            onClick={() => this.props.cancelar()}
          >
            {this.props.cancelText}
          </button>
        </div>
        <div className="col-md-2">
          <Alert>
            {alert => (
              <button
                id="aceptar"
                className="btn btn-primary col-12"
                onClick={() => this.props.aceptar(alert)}
                disabled={this.props.disabled}
              >
                {this.props.acceptText}
              </button>
            )}
          </Alert>
        </div>
      </div>
    );
  }
}

class BackButton extends React.Component {
  render() {
    return (
      <button
        className={"btn btn-success mr-3 "}
        onClick={this.props.history.goBack}
<<<<<<< HEAD
      >
        <span className={"fa fa-arrow-circle-left"}>Atrás</span>
=======
        >
        <span className={"fa fa-arrow-circle-left"}>
          Atrás
        </span>
>>>>>>> Boton inscribir alumno en listado de Alumnos
      </button>
    );
  }

}

exports.BackButton = BackButton;
exports.AceptarYCancelar = AceptarYCancelar;
