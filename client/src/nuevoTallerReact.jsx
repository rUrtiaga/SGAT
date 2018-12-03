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

//  -- **COMPONENTE PARA CREAR UN TALLER!!!!!!!!!!** --

/*CREAR TALLER*/
class CrearTaller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tituloPagina: " Crear ",
      nombre: "",
      categoria: "",
      tengoTallerAEditar: false,
      mostrarSubcategorias: false,
      categorias: [],
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
        subCategoriasConId: [
          ...this.state.subCategoriasConId,
          {
            _subCategoria: unaSubCategoria
          }
        ],
        mostrarSubcategorias: true
      },
      () => console.log(this.state.subCategoriasConId)
    );
  }

  cancelarAgregado() {
    this.props.history.push("/talleres/");
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
    //let index = this.state.subCategoriasConId.indexOf(s => s._subCategoria);
    let subc = [];
    subc = this.state.subCategoriasConId.filter(
      i => i._subCategoria !== subcategoria
    );
    this.setState({
      subCategoriasConId: subc
    });
  }
  guardarSubCategoria(id, nameViejo, name) {
    console.log(nameViejo + name);
    let subc = [];
    if (id) {
      subc = this.state.subCategoriasConId.map(function(s) {
        if (s._id === id) {
          s._id, (s._subCategoria = name);
        }
        return s;
      });
    } else {
      subc = this.state.subCategoriasConId.map(function(s) {
        if (s._subCategoria === nameViejo) {
          s._id, (s._subCategoria = name);
        }
        return s;
      });
    }
    this.setState({
      subCategoriasConId: subc
    });
  }

  //Muestra Div con las sub-categorias agregadas hasta el momento
  mostrarSubCategoriasAgregadas() {
    if (this.state.mostrarSubcategorias) {
      return (
        <div className="card mb-2 mt-2">
          <p> SubCategorias Agregadas: </p>{" "}
          {this.state.subCategoriasConId.map(subC => (
            <MuestraSubCategoria
              key={subC + Math.random()}
              padre={this}
              subCategoria={subC}
              quitarSubCategoria={s => this.quitarSubCategoria(s)}
              guardarSubC={(i, v, n) => this.guardarSubCategoria(i, v, n)}
            />
          ))}{" "}
        </div>
      );
    }
  }

  validar() {
    return !(this.state.nombre && this.state.subCategoriasConId);
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

  requestCategorias() {
    return axios
      .get("api/categorias")
      .then(respuesta => {
        let catSinId = respuesta.data.map(c => c._categoria);
        this.setState({
          categorias: catSinId
        });
        this.setState({
          categoria: catSinId[0]
        });
      })
      .catch(e => console.log(e));
  }

  guardarTallerAxios(self, taller, alert) {
    axios
      .post("api/talleres ", taller)
      .then(function(res) {
        self.props.history.push("/talleres/");
        alert.success("Se creó correctamente el TALLER " + taller._nombre);
      })
      .then(this.cancelarAgregado())
      .catch(function(error) {
        console.log(error);
        alert.error("ERROR - " + error.response.data.message);
      });
  }

  guardarTaller(alert) {
    const self = this;
    const taller = {
      _categoria: self.state.categoria,
      _nombre: self.state.nombre,
      _subCategoriasConId: self.state.subCategoriasConId
    };

    this.setState({
      errorValidar: this.validar()
    });
    //if (!this.state.errorValidar) { //COMENTADO XQ EL EDITAR TALLER CHOCA CON ESTO

    this.guardarTallerAxios(self, taller, alert);
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
    if (this.state.subCategoriasConId.length === 0) {
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
              <h5>
                {" "}
                Usted esta a punto de {this.state.tituloPagina} el siguiente
                Taller:{" "}
              </h5>{" "}
              <p>
                {" "}
                Nombre: <b> {this.state.nombre} </b>{" "}
              </p>{" "}
              <p>
                {" "}
                Categoria: <b> {this.state.categoria} </b>{" "}
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
          <h3 className="mt-4 mb-4"> {this.state.tituloPagina} Taller </h3>{" "}
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

//  -- ** COMPONENTE PARA EDITAR UN TALLER!!!!!!!!!!** --

class EditarTaller extends CrearTaller {
  constructor(props) {
    super(props);
    this.editarTaller = this.props.location.state.taller || {};
    console.log(this.editarTaller);
    this.state = {
      tituloPagina: " Editar ",
      nombre: this.editarTaller._nombre || "",
      categoria: this.editarTaller._categoria || "",

      mostrarSubcategorias: false,
      categorias: [],
      subCategoriasConId: []
    };
  }

  componentDidMount() {
    this.borrarTallerEnPadre;
    this.requestCategorias();
    this.requestTalleres();
  }

  requestTalleres() {
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
            _subCategoria: s._subCategoria
          };
        });

        this.setState({
          subCategoriasConId: this.state.subCategoriasConId.concat(subcatConId),
          mostrarSubcategorias: true
        });
      })

      .catch(e => console.log(e));
  }

  guardarTallerAxios(self, taller, alert) {
    axios
      .put("api/talleres ", taller)
      .then(function(res) {
        self.props.history.push("/talleres/");
        alert.success("Se actualizo correctamente el TALLER " + taller._nombre);
      })
      .then(this.cancelarAgregado())
      .catch(function(error) {
        console.log(error);
        alert.error("ERROR - " + error.response.data.message);
      });
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
      .catch(e => console.log(e));
  }
}

module.exports.CrearTaller = CrearTaller;
module.exports.EditarTaller = EditarTaller;
