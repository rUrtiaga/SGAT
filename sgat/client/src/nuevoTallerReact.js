const React = require("react");
const axios = require("axios");

const {
  MuestraCategorias
} = require("./componentesComunes/selectMostrarCategorias.jsx");
const { NuevaCategoria } = require("./componentesComunes/nuevaCategoria.jsx");
const {
  NuevaSubCategoria
} = require("./componentesComunes/nuevaSubCategoria.jsx");

const style = {
  marginTop: 20
};

/*CREAR TALLER*/
class CrearTaller extends React.Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();

    this.state = {
      nombre: "",
      categoria: "",
      subCategorias: [],
      indice: 0,
      agregaSubCategoria: false,
      agregaCategoria: false,

      disabled: false
    };
  }

  componentWillMount() {
    this.setState({ disabled: false });
  }

  mostrarDivNuevaCateg() {
    this.setState({
      agregaCategoria: !this.state.agregaCategoria
    });
  }
  ocultarDivNuevaCateg() {
    this.setState({ agregaCategoria: false });
  }
  mostrarDivNuevaSubCategoria() {
    this.setState({
      agregaSubCategoria: !this.state.agregaSubCategoria
    });
  }
  ocultarDivNuevaSubCategoria() {
    this.setState({ disabled: true }); // no funca
    this.setState({ agregaSubCategoria: false });
  }

  /*PANEL PARA CREAR CATEGORIA */
  nuevaCategoria() {
    if (this.state.agregaCategoria) {
      return <NuevaCategoria padre={this} />;
    }
  }
  /*PANEL PARA CREAR SUB-CATEGORIA*/
  nuevaSubCategoria() {
    if (this.state.agregaSubCategoria) {
      return (
        <NuevaSubCategoria padre={this} myfunc={this.props.renderizarSelect} />
      );
    }
  }

  agregarSubCategoria(unaSubCategoria) {
    var valores = this.state.subCategorias;
    valores[this.state.indice] = unaSubCategoria
      this.setState({ subCategorias: valores });
    this.setState({
      indice: this.state.indice + 1
    });
  }

  devolverListadoSubCategorias() {
    const listItems = this.state.subCategorias.map(sub => (
      <span>, {sub} </span>
    ));
    return listItems;
  }

  cancelarCreacion() {
    this.setState({ nombre: "" });
    this.setState({ categoria: "" });
    this.setState({ subCategorias: [] });
  }

  nuevoNivel() {
    if (this.state.agregaNivel) {
      return (
        <div id="nuevoNivelDiv">
          <div className="form-group">
            <label htmlFor="nombreNivel">Nombre del Nuevo Nivel</label>
            <input
              type="text"
              className="form-control"
              id="nombreNivel"
              value={this.state.nombre}
              onChange={event =>
                this.setState({ nombreNivel: event.target.value })
              }
            />
          </div>
          <div className="row justify-content-end">
            <div className="col" />
            <div className="col-md-2">
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => this.ocultarDivNuevoNivel()}
              >
                Cancelar
              </button>
            </div>
            <div className="col-md-2">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => this.ocultarDivNuevoNivel()}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      );
    }
  }

  seleccionarCategoria(valor) {
    this.setState({ categoria: valor });
  }

  guardarTaller() {
    const self = this;

    const taller = {
      _categoria: self.state.categoria,
      _nombre: self.state.nombre,
      _subCategorias: self.state.subCategorias
    };

    axios.post("api1/taller ", taller).then(function(res) {
      console.log("se agrego el taller " + self.state.nombre);
    });
  }

  render() {
    return (
      <div className="container">
        <form>
          <h3>Nuevo Taller</h3>

          <div className="form-row">
            <div className="col">
              <label htmlFor="CategoriaTitle">Categorias</label>
              <div className="form-row">
                <MuestraCategorias
                  seleccionar={v => this.seleccionarCategoria(v)}
                  padre={this}
                />
                <div className="col">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => this.mostrarDivNuevaCateg()}
                  >
                    Nueva Categoria
                  </button>
                </div>
              </div>

              {//agrega el componenete nueva categoria
              this.nuevaCategoria()}

              <div className="form-group">
                <label htmlFor="nombreTaller">Nombre del Nuevo Taller</label>
                <input
                  type="text"
                  className="form-control"
                  id="nombreTaller"
                  value={this.state.nombre}
                  onChange={event =>
                    this.setState({ nombre: event.target.value })
                  }
                />
              </div>

              {//muestra panel de nuevo NIVEL
              this.nuevaSubCategoria()}

              <div
                className="row justify-content-start"
                style={{
                  marginTop: 10
                }}
              >
                <div className="col-md-2">
                  <button
                    type="button"
                    className="btn btn-info"
                    disabled={this.state.disabled}
                    onClick={() => this.mostrarDivNuevaSubCategoria()}
                  >
                    Agregar Sub-Categoria
                  </button>
                </div>
                <div className="col-md-2">
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => this.cancelarCreacion()}
                  >
                    Cancelar
                  </button>
                </div>
                <div className="col-md-2">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => this.guardarTaller()}
                  >
                    Aceptar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>

        <div className="card mb-2" style={style}>
          <p>Esta por Crear el Siguiente Taller:</p>
          <p>Categoria:</p>
          <h4>{this.state.categoria}</h4>
          <p>Nombre:</p>
          <h4>{this.state.nombre}</h4>
          <p>SubCategorias:</p>
          <h4>{this.state.subCategorias}</h4>
        </div>
      </div>
    );
  }
}
module.exports.CrearTaller = CrearTaller;
