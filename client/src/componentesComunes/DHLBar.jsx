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
      dia: "" || this.props.dia,
      horario: "" || this.props.horario,
      lugar: "" || this.props.lugar
    };
  }

  desplegarDias() {
    return this.state.dias.map(c => (
      <option key={c} value={c}>
        {" "}
        {c}{" "}
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
      this.props.guardarDHL(this.state.dia, this.state.hora, this.state.lugar);
    }
  }

  render() {
    if (this.state.editar) {
      return (
        <div className="form-group form-row">
          <div className="col-md-4">
            <label htmlFor="lugar"> Lugar: </label>{" "}
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
            <label htmlFor="cupo"> Dia: </label>{" "}
            <select
              className="form-control"
              value={this.state.dia}
              onChange={this.manejarSeleccion.bind(this)}
              id="dias"
            >
              {this.desplegarDias()}{" "}
            </select>{" "}
          </div>{" "}
          <div className="col-md-2">
            <label htmlFor="hora"> Horario: </label>{" "}
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
          <div className="col-md-1 mt-4">
            <button
              type="button"
              className="btn btn-success"
              onClick={() => this.aceptarDHL()}
            >
              <span className="fa fa-plus"> </span>{" "}
            </button>{" "}
          </div>{" "}
        </div>
      );
    } else {
      return (
        <React.Fragment>
          <button
            type="button"
            className="btn btn-link col-sm-11"
            onClick={() => this.setState({ editar: true })}
          >
            {this.state.lugar +
              " - " +
              this.state.dia +
              " - " +
              this.state.horario}
          </button>
          <button
            type="button"
            className="btn btn-link col-sm-1"
            onClick={() => this.props.borrarDHL()}
          >
            <span className="fa fa-minus"> </span>{" "}
          </button>{" "}
        </React.Fragment>
      );
    }
  }
}

module.exports.DHLBar = DHLBar;
