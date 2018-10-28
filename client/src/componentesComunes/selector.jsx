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
      categorias: [],
      subCategoriaId: this.props.subCategoriaId
    };
  }

  componentDidMount() {
    this.requestTalleres();
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

  tallerConId(id) {
    return this.state.talleresFull.find(t => t._id === id);
  }

  seleccionMuestraCategorias(valor) {
    this.setState(
      {
        talleres: this.talleresDeCategoria(valor),
        categoria: valor,
        tallerName: null,
        subCategoriaId: null,
        curso: null
      },
      () => this.seleccionMuestraTalleres(this.state.talleres[0])
    );
  }

  talleresDeCategoria(categoriaStr) {
    return _.uniq(
      this.state.talleresFull
        .filter(tfull => tfull._categoria === categoriaStr)
        .map(tf => tf._nombre)
    );
  }

  seleccionMuestraTalleres(valor) {
    this.setState(
      {
        subCategorias: this.subcategoriasDeTaller(valor),
        tallerName: valor,
        subCategoriaId: null,
        curso: null
      },
      () => this.seleccionSubCategoriaId(this.state.subCategorias[0]._id)
    );
  }

  subcategoriasDeTaller(tallerStr, categoria) {
    return this.state.talleresFull.filter(
      tfull =>
        tfull._categoria === (this.state.categoria || categoria) &&
        tfull._nombre === tallerStr
    );
  }

  seleccionSubCategoriaId(id) {
    this.setState({ subCategoriaId: id, curso: null });
    if (this.props.callbackNuevoCurso) {
      this.props.callbackNuevoCurso(id);
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
            categoriaSeleccionada={this.state.categoria}
            seleccionar={v => this.seleccionMuestraCategorias(v)}
            categorias={this.state.categorias}
            padre={this}
          />
        </div>

        {this.state.categoria ? (
          <div className="col-md-4">
            <h6 className="ml-3">Taller</h6>
            <MuestraTalleres
              tallerSeleccionado={this.state.tallerName}
              seleccionar={v => this.seleccionMuestraTalleres(v)}
              talleres={this.state.talleres}
              padre={this}
            />
          </div>
        ) : null}
        {this.state.tallerName ? (
          <div className="col-md-4">
            <h6 className="ml-3">Tipo de curso</h6>
            <MuestraSubCategorias
              subCategoriaSeleccionada={this.state.subCategoriaId}
              subCategorias={this.state.subCategorias}
              seleccionar={v => this.seleccionSubCategoriaId(v)}
              padre={this}
            />
          </div>
        ) : null}
        {this.state.subCategoriaId && !this.props.callbackNuevoCurso ? (
          <div className="col-md-12">
            <h6 className="ml-3 mt-2">Cursada/s</h6>
            <MuestraCursos
              select={this.state.subCategoriaId}
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
