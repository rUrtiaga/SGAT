const React = require("react");
const axios = require("axios");
const { MuestraFromProps } = require("./selectMostrarTalleres.jsx");
const { Curso } = require("./MostrarCurso.jsx");

class MuestraCursos extends MuestraFromProps {
  constructor(props) {
    super(props);
    this.state = {};
  }

  request() {
    const self = this;
    return axios
      .get("/api/talleres/" + this.props.select + "/cursos")
      .then(respuesta => {
        self.setState({ elementsOrError: respuesta.data });
      })
      .catch(e => console.log(e));
  }

  manejarSeleccion(value) {
    this.props.seleccionar(value);
  }

  render() {
    if (this.state.elementsOrError === null) {
      return null;
    } else {
      return (
        <div className="container">
          {this.state.elementsOrError.map(c => (
            <Curso
              key={c._id}
              curso={c}
              botones={<Botones seleccionar={() => this.manejarSeleccion(c)} />}
            />
          ))}
        </div>
      );
    }
  }
}

class Botones extends React.Component {
  render() {
    return (
        <button
          className="btn btn-primary col-12 col-md-4"
          onClick={v => this.props.seleccionar(v)}
        >
          Seleccionar
        </button>
    );
  }
}

exports.MuestraCursos = MuestraCursos;
