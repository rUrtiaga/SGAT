const React = require("react");

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
    return (
      <div className="card mt-sm-2 ">
        <div className="card-body">
          <div className="row">
            <div className="col-sm-7">
              <h5 className="card-title ml-sm-2 mb-4">
                Prof/s: {this.nombresProfes()}
              </h5>
            </div>
            <div className="col-sm-5 text-right">{this.props.botones}</div>
          </div>
          <div className="container">
            <DHL dhls={this.state.DHL} />
          </div>
        </div>
      </div>
    );
  }
}

class DHL extends React.Component {
  constructor(props) {
    super(props);
    this.i = 0;
  }
  render() {
    return (
      <div className="container">
        <table className="table table-sm text-center">
          <tbody>
            {this.props.dhls.map(dhl => <FilaDHL dhl={dhl} key={this.i++} />)}
          </tbody>
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

exports.Curso = Curso;
