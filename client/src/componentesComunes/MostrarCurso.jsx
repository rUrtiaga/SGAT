const React = require("react");
const { Link } = require("react-router-dom");

class Curso extends React.Component {
  constructor(props) {
    super(props);
    let { curso } = this.props;
    this.state = {
      curso: curso,
      DHL: curso._diasHorariosLugares,
      profesores: curso._profesores,
      hayCupo: curso._hayCupo,
      anio: curso._anio
    };
  }

  nombresProfes() {
    if (this.state.profesores.length) {
      return this.state.profesores
        .map(p => p._nombre + " " + p._apellido)
        .join(", ");
    } else {
      return "Sin asignar";
    }
  }
  pluralProfesores() {
    return this.state.profesores.length > 1 ? "es" : null;
  }

  cursoLleno() {
    return this.state.hayCupo ? "" : "text-white bg-danger";
  }

  render() {
    return (
      <div className={"card mt-sm-2 mt-2 " + this.cursoLleno()}>
        <div className="card-body">
          <div className="row">
            <div className="col-sm-6">
              <h5 className="card-title ml-sm-2 mb-4">
                Profesor
                {this.pluralProfesores()}: {this.nombresProfes()}
              </h5>
            </div>
            <div className="col-sm-6 text-right">{this.props.botones}</div>
          </div>
          <DHL dhls={this.state.DHL} />
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
      <table className="table table-sm text-center mb-0">
        <tbody>
          {this.props.dhls.map(dhl => (
            <FilaDHL dhl={dhl} key={this.i++} />
          ))}
        </tbody>
      </table>
    );
  }
}

class FilaDHL extends React.Component {
  render() {
    return (
      <tr className="row">
        <td className="col-sm-4">{this.props.dhl._lugar || "Sin definir"}</td>
        <td className="col-sm-4">{this.props.dhl._dia}</td>
        <td className="col-sm-4">{this.props.dhl._horario || "Sin definir"}</td>
      </tr>
    );
  }
}

exports.Curso = Curso;
