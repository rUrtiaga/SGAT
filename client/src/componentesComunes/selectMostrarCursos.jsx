const React = require("react");
const axios = require("axios");
const { Curso } = require("./MostrarCurso.jsx");

/*Este componente requiere:
     request() que guarda lo que trae del servidor parseado en  "elementsOrError"
     manejarSeleccion(event) que tiene el comportamiento de cual selecciona
     desplegar() que mapea a un option la lista de elementos a mostrar
     */
class MuestraFromProps extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.select !== prevState.prevSelect) {
      return {
        prevSelect: nextProps.select,
        elementsOrError: null
      };
    }
    return null;
  }

  componentDidMount() {
    this.request();
  }

  componentDidUpdate(nextProps, prevState) {
    if (this.state.elementsOrError === null) {
      this.request();
    }
  }

  render() {
    if (this.state.elementsOrError === null) {
      return (
        <div className="col">
          <select className="form-control" id="Talleres">
            <option value={null} disabled>
              Aguarde
            </option>
          </select>
        </div>
      );
    } else {
      return (
        <div className="col">
          <select
            className="form-control"
            onChange={this.manejarSeleccion.bind(this)}
            id="Talleres"
          >
            {this.desplegar()}
          </select>
        </div>
      );
    }
  }
}

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
