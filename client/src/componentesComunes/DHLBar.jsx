const React = require("react");

class DHLBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dias: [
        "Lunes",
        "Martes",
        "Miercoles",
        "Jueves",
        "Viernes",
        "Sabado",
        "Domingo"
      ],
      editar: this.props.editar || false,
      dia: this.props.dia || "Lunes",
      horario: this.props.horario || "",
      lugar: this.props.lugar || ""
    };
  }

  limpiar() {
    this.setState({
      dia: "Lunes",
      horario: "",
      lugar: ""
    });
  }

  desplegarDias() {
    return this.state.dias.map(c => (
      <option key={c} value={c}>
        {c}
      </option>
    ));
  }

  manejarSeleccion(event) {
    this.setState({
      dia: event.target.value
    });
  }

  aceptarDHL() {
    if (this.props.editarDHL) {
      this.props.editarDHL({
        _dia: this.state.dia,
        _horario: this.state.horario,
        _lugar: this.state.lugar
      });
      this.setState({ editar: false });
    } else {
      this.props.guardarDHL({
        _dia: this.state.dia,
        _horario: this.state.horario,
        _lugar: this.state.lugar
      });
      this.limpiar();
    }
  }

  render() {
    if (this.state.editar) {
      return (
        <div className="form-group form-row">
          <div className="col-md-7">
            <input
              type="text"
              max="30"
              className="form-control"
              id="lugar"
              placeholder="Por Ej. Casa de la Cultura"
              value={this.state.lugar}
              onChange={event =>
                this.setState({
                  lugar: event.target.value
                })
              }
            />{" "}
          </div>
          <div className="col-md-2">
            <select
              className="form-control"
              value={this.state.dia}
              onChange={this.manejarSeleccion.bind(this)}
              id="dias"
            >
              {this.desplegarDias()}{" "}
            </select>{" "}
          </div>{" "}
          <div className="col-10 col-md-2">
            <input
              type="time"
              className="form-control"
              id="hora"
              placeholder="00:00"
              value={this.state.horario}
              onChange={event =>
                this.setState({
                  horario: event.target.value
                })
              }
            />{" "}
          </div>{" "}
          <div className="col-1 col-md-1">
            <button
              type="button"
              className="btn btn-success"
              onClick={() => this.aceptarDHL()}
            >
              {this.props.editar ? (
                <span className="fa fa-plus"> </span>
              ) : (
                <span className="fa fa-check"> </span>
              )}
            </button>{" "}
          </div>{" "}
        </div>
      );
    } else {
      return (
        <React.Fragment>
          <div className="row">
            <div className="col-md-7">
              <span className="text-center" htmlFor="lugar">
                {this.state.lugar || "Sin Definir"}
              </span>
            </div>
            <div className="text-center" className="col-md-2">
              <span htmlFor="cupo">{this.state.dia} </span>
            </div>
            <div className="col-md-2">
              <span className="text-center" htmlFor="hora">
                {this.state.horario || "Sin Definir"}
              </span>
            </div>
            <div className="col-sm-1">
              <button
                type="button"
                className="btn btn-link col-md-6"
                onClick={() => this.setState({ editar: true })}
              >
                <span className="fa fa-pencil"> </span>
              </button>
              <button
                type="button"
                className="btn btn-link col-md-6"
                onClick={() => this.props.borrarDHL()}
              >
                <span className="fa fa-minus"> </span>
              </button>
            </div>
          </div>
        </React.Fragment>
      );
    }
  }
}

module.exports.DHLBar = DHLBar;
