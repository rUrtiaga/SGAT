const React = require("react");
const axios = require("axios");

class Curso extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cupo: this.props.curso._cupo,
      DHL: this.props.curso._diasHorariosLugares,
      profesores: this.props.curso._profesores,
      anio: this.props.curso._anio
    };
  }

  nombresProfes() {
    return this.state.profesores.map(p => p._nombre + " " + p._apellido + ", ");
  }

  render() {
    return(<div className="card mt-sm-2 ">
      <div className="card-body">
        <div className="row">
          <div className="col-sm-9">
            <h5 className="card-title ml-sm-2">
              Prof/s: {this.nombresProfes()}
            </h5>
          </div>
          <Botones />
        </div>
        {/* <p className="card-text ml-sm-4"> y si escribo aca que pasa</p> */}
        <div className="container">
          <DHL dhls={this.state.DHL} />
        </div>
      </div>
    </div>)
  }
}

class DHL extends React.Component {
  render() {
    return (
      <div className="container">
        <table className="table table-sm text-center">
          {this.props.dhls.map(dhl => <FilaDHL dhl={dhl} />)}
        </table>
      </div>
    );
  }
}

class FilaDHL extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.dhl._dia}</td>
        <td>{this.props.dhl._horario}</td>
        <td>{this.props.dhl._lugar}</td>
      </tr>
    );
  }
}

class Botones extends React.Component {
  render() {
    if (this.props.pantalla) {
      return (
        <div className="col-md-4 text-right">
          <button className="btn btn-primary">Espera</button>
          <button className="btn btn-primary">Alumnos</button>
          <button className="btn btn-primary">Inscribir</button>
        </div>
      );
    } else {
      return (
        <div className="col-sm-3 text-right">
          <button className="btn btn-primary">Seleccionar</button>
        </div>
      );
    }
  }
}

exports.Curso = Curso;
