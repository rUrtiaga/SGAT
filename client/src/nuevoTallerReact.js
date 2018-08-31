const React = require("react");
const axios = require("axios");
const {MuestraCategorias} = require("./componentesComunes/selectMostrarCategorias.jsx");
const { NuevaCategoria } = require("./componentesComunes/nuevaCategoria.jsx");
const {NuevaSubCategoria} = require("./componentesComunes/nuevaSubCategoria.jsx");
const { AceptarYCancelar } = require("./componentesComunes/botones.jsx");
const { Alert } = require('react-alert');



/*CREAR TALLER*/
class CrearTaller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: "",
      categorias: [],
      // categoria: "",
      subCategorias: [],
      agregaSubCategoria: false,
      agregaCategoria: false,
      disabled: false,
      agregadoUnico:false,
      borrarSubCategorias:true,
      errorValidar: false,
      confirmacion:false,
      inputTaller: false
    };
  }

  componentDidMount(){
    this.requestCategorias()
  }

  componentWillMount() {
    this.setState({ disabled: false });
    this.mostrarDivNuevaSubCategoria()
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
        <NuevaSubCategoria padre={this}  />
      );
    }
  }

  agregarSubCategoria(unaSubCategoria) {  
    this.setState({subCategorias: [... this.state.subCategorias, unaSubCategoria]})
  }

  cancelarAgregado() {
    this.setState({ nombre: "" });
    this.setState({ categoria: "" });
    this.setState({ subCategorias: [] });
  }

  seleccionarCategoria(valor) {
    this.setState({ categoria: valor });
  }

  confirmar(alert) {
    this.validar()
    if (this.state.error === true){
      this.mostrarError(alert)
    }
    else{
      this.setState({ confirmacion: !this.state.confirmacion });
    }
  }

  volver() {
    this.setState({ confirmacion: false });
  }

 
//Muestra Div con las sub-categorias agregadas hasta el momento
  mostrarSubCategoriasAgregadas(){
    if(!(this.state.subCategorias.length === 0)){
      return (
        <div className="card mb-2 mt-2" >
        <p>SubCategorias Agregadas:</p>
        <h4>{this.state.subCategorias.map( subC => subC + " ")}</h4>
        </div>
    )
  }
}


validar(){
    if((this.state.categoria == false) || (this.state.nombre == false) || (this.state.subCategorias == false))
        {
          this.setState({ errorValidar: true})
          console.log("entro al if")
        }
    else{
      this.setState({ errorValidar: false})
    }
  
  }


  mostrarMuestraCategoria(){
      return (
        <MuestraCategorias
        seleccionar={v => this.seleccionarCategoria(v)}
        padre={this}
        categorias={this.state.categorias}
        />
      )
  }

  requestCategorias(){
    return axios
      .get("api/categorias")
      .then(respuesta => {
        let catSinId = respuesta.data.map(c=> c._categoria)
        this.setState({ categorias: catSinId })
      })
      .then(()=>this.seleccionarCategoria(this.state.categorias[0]))
      .catch(e=> console.log(e))
  }

  guardarTaller(alert) {
    const self = this;
    const taller = {
      _categoria: self.state.categoria,
      _nombre: self.state.nombre,
      _subCategorias: self.state.subCategorias
    };
    this.validar()
    if ((!this.state.errorValidar)){
      axios
      .post("api/talleres ",taller)
      .then(function(res) {
        console.log("se agrego el taller " + self.state.nombre);
        alert.success('Se creó correctamente el TALLER ' + taller._nombre);
        self.setState({confirmacion: false})
      })
      .then(this.cancelarAgregado())
      .catch(function (error) {
        console.log(error);
        alert.error('Fallo al crear el nuevo TALLER');
      });
    }
  }

  mostrarError(alert){
    alert.error('ERROR - Campos Incompletos');
  }

  inputOConfirmacion() {
    console.log(this.state.errorValidar)

    if (this.state.confirmacion === false) {
      return this.inputTaller();
    } else {
        if (this.state.errorValidar){
          //this.mostrarError(alert) ME GUSTARIA MOSTRAR UN ALERT PERO NO ME SALIO COMO.... 
          console.log("hubo un error, campos vacios")
          this.setState({confirmacion: false})
        }
        else { return this.datosTallerACrear()};
    }
  }

//Muestra div con los datos del taller que esta a punto de crear
  datosTallerACrear() {
    return (
      <div>
        <div className="card mb-8 mt-2">
          <div className="form-group">
            <div className="col-md-6">
              <h5>Usted esta a punto de crear el siguiente Taller:</h5>
              <p>
                {" "}
                Nombre: <b>{this.state.nombre}</b>
              </p>
              <p>
                {" "}
                Taller: <b>{this.state.categoria}</b>
              </p>
              {this.mostrarSubCategoriasAgregadas()}

            </div>
  
              <AceptarYCancelar
                acceptText={"Aceptar"}
                cancelText={"Volver"}
                cancelar={() => this.volver()}
                aceptar={(alert) => this.guardarTaller(alert)}
              >
            </AceptarYCancelar>    
                
          </div>
        </div>
      </div>
    );
  }

  //div con los campos a llenar para la creacion de un taller
  inputTaller(){
    return (
      <div className="container">
        <form>
          <h3 className="mt-4 mb-4">Nuevo Taller</h3>

          <div className="form-group">
                <label htmlFor="nombreTaller">Nombre</label>  
                <input
                  type="text"
                  className="form-control col-md-6 "
                  id="nombreTaller"
                  placeholder="introduzca el nombre del Taller"
                  value={this.state.nombre}
                  onChange={event =>
                    this.setState({ nombre: event.target.value })
                  }
                />
              </div>

          <div className="form-row" >
            <div className="col">
              <label htmlFor="CategoriaTitle">Categoria</label>
              <div className="form-row mt-2 mb-2">
              {
               this.mostrarMuestraCategoria()
              }
                <div className="col">
                  <button
                    type="button"
                    className="btn btn-success"
                    disabled = {this.state.agregadoUnico}
                    icon="fa-plus"
                    onClick={() => this.mostrarDivNuevaCateg()}
                  > 
                  <span className="fa fa-plus">  </span> 
                  </button>
                </div>
              </div>

              {//agrega el componenete nueva categoria
              this.nuevaCategoria()}

              

              {//muestra panel de nuevo NIVEL
              this.nuevaSubCategoria()}
              {this.mostrarSubCategoriasAgregadas()}
              <AceptarYCancelar
                  acceptText={"Guardar Taller"}
                  cancelText={"Cancelar"}
                  cancelar={() => this.cancelarAgregado()}
                  aceptar={() => this.confirmar()}
                >
              </AceptarYCancelar>
              </div>
          </div>
        </form>

      </div>
    );
  }

  render() {
    return(
          <div className="container">
            <h3 className="mt-4 mb-4">Nuevo Taller</h3>
            {this.inputOConfirmacion()}
          </div>
    )
  }
}
module.exports.CrearTaller = CrearTaller;
