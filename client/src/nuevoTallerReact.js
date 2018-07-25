const React = require("react");
const axios = require("axios");


const {MuestraCategorias} = require("./componentesComunes/selectMostrarCategorias.jsx");
const { NuevaCategoria } = require("./componentesComunes/nuevaCategoria.jsx");
const {NuevaSubCategoria} = require("./componentesComunes/nuevaSubCategoria.jsx");


/*CREAR TALLER*/
class CrearTaller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categorias: [],
      // categoria: "",
      subCategorias: [],
      agregaSubCategoria: false,
      agregaCategoria: false,
      disabled: false
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

  cancelarCreacion() {
    this.setState({ nombre: "" });
    this.setState({ categoria: "" });
    this.setState({ subCategorias: [] });
  }

  guardarTaller() {
    const self = this;
    const taller = {
      _categoria: self.state.categoria,
      _nombre: self.state.nombre,
      _subCategorias: self.state.subCategorias
    };
    this.validar()
    if ((!this.state.error)){
      axios.post("api/talleres ",taller)
      .then(function(res) {
        console.log("se agrego el taller " + self.state.nombre);
      })
      .then(this.cancelarCreacion());
    }
  }

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
seleccionarCategoria(valor) {
  this.setState({ categoria: valor });
}

validar(){
    if((this.state.categoria == false) || (this.state.nombre == false) || (this.state.subCategorias == false))
        {
          this.setState({ error: true})
        }
    else{
      this.setState({ error: false})
    }
  }

  mostrarValidacion(){
    if (this.state.error){
    return (
      <div class="alert alert-danger mt-2">
        <strong>ERROR!</strong> DEBE COMPLETAR SI O SI TODOS LOS CAMPOS!
       </div>
    )
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


  render() {
    console.log(this.state.error)
    return (
      <div className="container">
        <form>
          <h3 className="mt-4 mb-4">Nuevo Taller</h3>

          <div className="form-row">
            <div className="col">
              <label htmlFor="CategoriaTitle">Categorias</label>
              <div className="form-row">
              {
               this.mostrarMuestraCategoria()
              }
                <div className="col">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => this.mostrarDivNuevaCateg()}
                  >
                    Agregar Nueva Categoria
                  </button>
                </div>
              </div>

              {//agrega el componenete nueva categoria
              this.nuevaCategoria()}

              <div className="form-group">
                <label htmlFor="nombreTaller">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  id="nombreTaller"
                  placeholder="introduzca el nombre del Taller"
                  value={this.state.nombre}
                  onChange={event =>
                    this.setState({ nombre: event.target.value })
                  }
                />
              </div>

              {//muestra panel de nuevo NIVEL
              this.nuevaSubCategoria()}

              <div
                className="row justify-content-start mt-2"
              >
                
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
                    Guardar Taller
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
         
         {this.mostrarSubCategoriasAgregadas()}
         {this.mostrarValidacion()}
     
      </div>
    );
  }
}
module.exports.CrearTaller = CrearTaller;
