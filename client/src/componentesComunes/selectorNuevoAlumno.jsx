const axios = require("axios");
const _ = require("lodash");
const { Selector } = require("./selector");

class SelectorNuevoAlumno extends Selector {
  constructor(props) {
    super(props);
  }

  requestTalleres() {
    const self = this;
    return axios
      .get("api/talleres")
      .then(respuesta => {
        self.setState({ talleresFull: respuesta.data });
      })
      .then(() => {
        let categorias = _.uniq(self.state.talleresFull.map(o => o._categoria));
        return self.setState({ categorias });
      })
      .then(() => {
        if (this.state.subCategoriaId) {
          let t = this.tallerConId(this.state.subCategoriaId);
          this.setState({
            talleres: this.talleresDeCategoria(t._categoria),
            subCategorias: this.subcategoriasDeTaller(t._nombre, t._categoria),
            categoria: t._categoria,
            tallerName: t._nombre,
            curso: null
          });
        } else {
          this.seleccionMuestraCategorias(this.state.categorias[0]);
        }
      })
      .catch(e => console.log(e));
  }
}

exports.SelectorNuevoAlumno = SelectorNuevoAlumno;
