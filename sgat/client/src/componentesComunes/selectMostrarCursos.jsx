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
      .get(
        "/api/talleres/" +
          this.props.padre.state.taller +
          "/subcategorias/" +
          this.props.select +
          "/cursos"
      )
      .then(respuesta => {
        console.log(respuesta);
        self.setState({ elementsOrError: JSON.parse(respuesta.data) });
      })
      .catch(e => console.log(e));
  }

  manejarSeleccion(event) {
    this.props.seleccionar(event.target.value);
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
        <div className='container'>{this.state.elementsOrError.map(c => <Curso curso={c} />)}</div>
      );
    }
  }
}

exports.MuestraCursos = MuestraCursos;
