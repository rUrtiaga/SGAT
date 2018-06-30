const React = require("react");
const axios = require("axios");
const { MuestraFromProps } = require("./selectMostrarTalleres.jsx");

class MuestraSubCategorias extends MuestraFromProps {
  constructor(props) {
    super(props);
    this.state = {};
  }

  request() {
    const self = this;
    axios
      .get(
        "api/talleres?categoria=" +
          this.props.categoria +
          "&taller=" +
          this.props.select
      )
      .then(respuesta => {
        self.setState({ elementsOrError: respuesta.data });
      })
      .then(() => this.props.seleccionar(this.state.elementsOrError[0]._id));
  }

  manejarSeleccion(event) {
    this.props.seleccionar(event.target.value);
  }

  //la key y el value deben ser remplazadas por id
  desplegar() {
    return this.state.elementsOrError.map(c => (
      <option key={c._id} value={c._id}>
        {c._subCategoria}
      </option>
    ));
  }
}

exports.MuestraSubCategorias = MuestraSubCategorias;
