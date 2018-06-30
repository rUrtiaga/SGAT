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

  //la key y el value deben ser remplazadas por id
  //   desplegar() {
  //     return this.state.elementsOrError.map(c => (
  //       <option key={c._nombre} value={c._nombre}>
  //         {c._nombre}
  //       </option>
  //     ));
  //   }
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

/* <div className="col-md-4 text-right">
<button className="btn btn-primary">Espera</button>
<button className="btn btn-primary">Alumnos</button>
<button className="btn btn-primary">Inscribir</button>
</div> */
class Botones extends React.Component {
  render() {
    return (
      <div className="col-sm-3 text-right">
        <button
          className="btn btn-primary"
          onClick={v => this.props.seleccionar(v)}
        >
          Seleccionar
        </button>
      </div>
    );
  }
}

exports.MuestraCursos = MuestraCursos;
