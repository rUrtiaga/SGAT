const React = require("react");
const axios = require("axios");
const {
  MuestraCategorias
} = require("./componentesComunes/selectMostrarCategorias.jsx");
const { NuevaCategoria } = require("./componentesComunes/nuevaCategoria.jsx");
const {
  NuevaSubCategoria
} = require("./componentesComunes/nuevaSubCategoria.jsx");
const { AceptarYCancelar } = require("./componentesComunes/botones.jsx");
const {
  MuestraSubCategoria
} = require("./componentesComunes/MuestraSubCategoria.jsx");

/*CREAR TALLER*/
class CrearTaller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: "",
      categoria: "",

      categorias: [],
      subCategorias: [],
      subCategoriasConId: [],

      agregaSubCategoria: false,
      agregaCategoria: false,
      disabled: false,
      agregadoUnico: false,
      borrarSubCategorias: true,
      errorValidar: false,
      confirmacion: false,
      inputTaller: false
    };
  }

  componentDidMount() {
    this.borrarTallerEnPadre;
    this.requestCategorias();
    if (this.editarTaller) {
      this.requestTalleres();
    }
  }

  borrarTallerEnPadre() {
    this.props.rootComponent.state.taller = undefined;
  }

  componentWillMount() {
    this.setState({
      disabled: false
    });
    this.mostrarDivNuevaSubCategoria();
  }

  mostrarDivNuevaCateg() {
    this.setState({
      agregaCategoria: !this.state.agregaCategoria
    });
  }
  ocultarDivNuevaCateg() {
    this.setState({
      agregaCategoria: false
    });
  }
  mostrarDivNuevaSubCategoria() {
    this.setState({
      agregaSubCategoria: !this.state.agregaSubCategoria
    });
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
      return <NuevaSubCategoria padre={this} />;
    }
  }

  agregarSubCategoria(unaSubCategoria) {
    this.setState(
      {
        subCategorias: [...this.state.subCategorias, unaSubCategoria]
      },
      () => console.log(this.state.subCategorias)
    );
  }

  cancelarAgregado() {
    this.setState({
      nombre: ""
    });
    this.setState({
      categoria: ""
    });
    this.setState({
      subCategorias: []
    });
  }

  seleccionarCategoria(valor) {
    this.setState({
      categoria: valor
    });
  }

  confirmar(alert) {
    this.setState({
      confirmacion: true
    });
  }

  volver() {
    this.setState({
      confirmacion: false
    });
  }

  quitarSubCategoria(subcategoria) {
    let index = this.state.subCategorias.indexOf(subcategoria);
    console.log(index + subcategoria);

    let subc = [];
    subc = this.state.subCategorias.filter(i => i !== subcategoria);
    console.log(subc);
    this.setState({
      subCategorias: subc
    }); // no esta acualizando la coleccion en pantalla
  }

  //Muestra Div con las sub-categorias agregadas hasta el momento
  mostrarSubCategoriasAgregadas() {
    if (!(this.state.subCategorias.length === 0)) {
      return (
        <div className="card mb-2 mt-2">
          <p> SubCategorias Agregadas: </p>{" "}
          {this.state.subCategorias.map(subC => (
            <MuestraSubCategoria
              key={subC}
              padre={this}
              subcategoria={subC}
              quitarSubCategoria={s => this.quitarSubCategoria(s)}
            />
          ))}{" "}
        </div>
      );
    }
  }

  validar() {
    return !(this.state.nombre && this.state.subCategorias.length > 0);
  }

  mostrarMuestraCategoria() {
    return (
      <MuestraCategorias
        categoriaSeleccionada={this.state.categoria}
        seleccionar={v => this.seleccionarCategoria(v)}
        padre={this}
        categorias={this.state.categorias}
      />
    );
  }

  requestTalleres() {
    //probar si anda!
    //axios.get('/users?name=Sherlock', {

    return axios
      .get("api/talleres", {
        params: {
          categoria: this.editarTaller._categoria,
          taller: this.editarTaller._nombre
        }
      })
      .then(respuesta => {
        let subcatConId = respuesta.data.map(s => {
          return {
            _id: s._id,
            _subcategoria: s._subCategoria
          };
        });
        let subcategsinId = subcatConId.map(s => s._subcategoria);
        this.setState({
          subCategoriasConId: subcatConId,
          subCategorias: this.state.subCategorias.concat(subcategsinId)
        });
      })

      .catch(e => console.log(e));
  }

  requestCategorias() {
    return axios
      .get("api/categorias")
      .then(respuesta => {
        let catSinId = respuesta.data.map(c => c._categoria);
        this.setState({
          categorias: catSinId
        });
      })
      .then(() => this.seleccionarCategoria(this.state.categorias[0]))
      .catch(e => console.log(e));
  }

  guardarTaller(alert) {
    const self = this;
    const taller = {
      _categoria: self.state.categoria,
      _nombre: self.state.nombre,
      _subCategorias: self.state.subCategorias
    };
    this.setState({
      errorValidar: this.validar()
    });
    if (!this.state.errorValidar) {
      axios
        .post("api/talleres ", taller)
        .then(function(res) {
          alert.success("Se creó correctamente el TALLER " + taller._nombre);
          self.setState({
            confirmacion: false
          });
        })
        .then(this.cancelarAgregado())
        .catch(function(error) {
          console.log(error);
          alert.error("ERROR - " + error.response.data.message);
        });
    }
  }

  mostrarError(alert) {
    alert.error("ERROR - Campos Incompletos");
  }

  inputOConfirmacion() {
    if (!this.state.confirmacion) {
      return this.inputTaller();
    } else {
      return this.datosTallerACrear();
    }
  }

  subCategoriasOAviso() {
    if (this.state.subCategorias.length === 0) {
      return (
        <div class="alert alert-danger" role="alert">
          ERROR!: no se ha asignado ningúna SubCategoria.{" "}
        </div>
      );
    } else {
      return this.mostrarSubCategoriasAgregadas();
    }
  }

  //Muestra div con los datos del taller que esta a punto de crear
  datosTallerACrear() {
    return (
      <div>
        <div className="card mb-8 mt-2">
          <div className="form-group">
            <div className="col-md-6">
              <h5> Usted esta a punto de crear el siguiente Taller: </h5>{" "}
              <p>
                {" "}
                Nombre: <b> {this.state.nombre} </b>{" "}
              </p>{" "}
              <p>
                {" "}
                Taller: <b> {this.state.categoria} </b>{" "}
              </p>{" "}
              {this.subCategoriasOAviso()}{" "}
            </div>{" "}
            <AceptarYCancelar
              acceptText={"Aceptar"}
              cancelText={"Volver"}
              cancelar={() => this.volver()}
              aceptar={alert => this.guardarTaller(alert)}
            />{" "}
          </div>{" "}
        </div>{" "}
      </div>
    );
  }

  //div con los campos a llenar para la creacion de un taller
  inputTaller() {
    return (
      <div className="container">
        <form>
          <h3 className="mt-4 mb-4"> Nuevo Taller </h3>{" "}
          <div className="form-group">
            <label htmlFor="nombreTaller"> Nombre </label>{" "}
            <input
              type="text"
              className="form-control col-md-6 "
              id="nombreTaller"
              placeholder="introduzca el nombre del Taller"
              value={this.state.nombre}
              onChange={event => {
                this.setState({
                  nombre: event.target.value,
                  errorValidar: this.validar()
                });
              }}
            />{" "}
          </div>{" "}
          <div className="form-row">
            <div className="col">
              <label htmlFor="CategoriaTitle"> Categoria </label>{" "}
              <div className="form-row mt-2 mb-2">
                {" "}
                {this.mostrarMuestraCategoria()}{" "}
                <div className="col">
                  <button
                    type="button"
                    className="btn btn-success"
                    disabled={this.state.agregadoUnico}
                    icon="fa-plus"
                    onClick={() => this.mostrarDivNuevaCateg()}
                  >
                    <span className="fa fa-plus"> </span>{" "}
                  </button>{" "}
                </div>{" "}
              </div>{" "}
              {//agrega el componenete nueva categoria
              this.nuevaCategoria()}{" "}
              {//muestra panel de nuevo NIVEL
              this.nuevaSubCategoria()}{" "}
              {this.mostrarSubCategoriasAgregadas()}{" "}
              <AceptarYCancelar
                acceptText={"Guardar Taller"}
                cancelText={"Cancelar"}
                disabled={this.validar()}
                cancelar={() => this.cancelarAgregado()}
                aceptar={() => this.confirmar()}
              />{" "}
            </div>{" "}
          </div>{" "}
        </form>{" "}
      </div>
    );
  }

  render() {
    return <div className="container"> {this.inputOConfirmacion()} </div>;
  }
}

class EditarTaller extends CrearTaller {
  constructor(props) {
    super(props);
    this.editarTaller = this.props.location.state.taller || {};

    this.state = {
      nombre: this.editarTaller._nombre || "",
      categoria: this.editarTaller._categoria || ""
    };
  }
}

module.exports.CrearTaller = CrearTaller;
module.exports.EditarTaller = EditarTaller;
