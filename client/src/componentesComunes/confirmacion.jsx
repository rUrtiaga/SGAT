const React = require("react");
const { Component } = require("react");
const { AceptarYCancelar } = require("./botones");

class Confirmacion extends Component {
  render() {
    return (
      <div className="container border pt-3 pb-3">
        {this.props.children}
        <AceptarYCancelar
          acceptText={"Si"}
          cancelText={"No"}
          cancelar={() => this.props.cancelar()}
          aceptar={alert => this.props.aceptar(alert)}
        />
      </div>
    );
  }
}
module.exports.Confirmacion = Confirmacion;
