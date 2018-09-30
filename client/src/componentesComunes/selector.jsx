const React = require("react");
const axios = require("axios");
const _ = require("lodash");
const { MuestraCategorias } = require("./selectMostrarCategorias.jsx");
const { MuestraTalleres } = require("./selectMostrarTalleres.jsx");
const { MuestraSubCategorias } = require("./selectMostrarSubCategorias.jsx");
const { MuestraCursos } = require("./selectMostrarCursos.jsx");

class Selector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categorias: []
    };
  }

  componentDidMount() {
    this.requestTalleres();
  }

  requestTalleres() {
    const self = this;
    axios
      .get("api/talleres")
      .then(respuesta => {
        self.setState({ talleresFull: respuesta.data });
      })
      .then(() => {
        let categorias = _.uniq(self.state.talleresFull.map(o => o._categoria));
        self.setState({ categorias });
      })
      .then(() => this.seleccionMuestraCategorias(this.state.categorias[0]))
      .catch(e => console.log(e));
  }

  seleccionMuestraCategorias(valor) {
    this.setState({
      talleres: this.talleresDeCategoria(valor),
      categoria: valor,
      taller: null,
      subCategoria: null,
      curso: null
    },()=>this.seleccionMuestraTalleres(this.state.talleres[0]))
  }

  talleresDeCategoria(categoriaStr) {
    return _.uniq(
      this.state.talleresFull
        .filter(tfull => tfull._categoria === categoriaStr)
        .map(tf => tf._nombre)
    );
  }

  seleccionMuestraTalleres(valor) {
    this.setState({
      subCategorias: this.subcategoriasDeTaller(valor),
      taller: valor,
      subCategoria: null,
      curso: null
    },()=>this.seleccionSubCategoria(this.state.subCategorias[0]._id));
  }

  subcategoriasDeTaller(tallerStr){
    return  this.state.talleresFull
    .filter(tfull => tfull._categoria === this.state.categoria && tfull._nombre === tallerStr)
  }

  seleccionSubCategoria(valor) {
    this.setState({ subCategoria: valor, curso: null });
    if (this.props.callbackNuevoCurso) {
      this.props.callbackNuevoCurso(valor);
    }
  }

  seleccionCurso(valor) {
    this.props.onSelect(valor);
    this.setState({ curso: valor });
  }
  

  render() {
    return (
      <div className="row mt-3 mb-3">
        <div className="col-md-4">
          <h6 className="ml-3">Categoría</h6>
          <MuestraCategorias
            seleccionar={v => this.seleccionMuestraCategorias(v)}
            categorias={this.state.categorias}
            padre={this}
          />
        </div>

        {this.state.categoria ? (
          <div className="col-md-4">
            <h6 className="ml-3">Taller</h6>
            <MuestraTalleres
              seleccionar={v => this.seleccionMuestraTalleres(v)}
              talleres={this.state.talleres}
              padre={this}
            />
          </div>
        ) : null}
        {this.state.taller ? (
          <div className="col-md-4">
            <h6 className="ml-3">Tipo de curso</h6>
            <MuestraSubCategorias
              subCategorias={this.state.subCategorias}
              seleccionar={v => this.seleccionSubCategoria(v)}
              padre={this}
            />
          </div>
        ) : null}
        {this.state.subCategoria && !this.props.callbackNuevoCurso ? (
          <div className="col-md-12">
            <h6 className="ml-3 mt-2">Cursos</h6>
            <MuestraCursos
              select={this.state.subCategoria}
              seleccionar={v => this.seleccionCurso(v)}
              padre={this}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

exports.Selector = Selector;
