const React = require("react");
const axios = require("axios");


const {
  MuestraCategorias
} = require("./componentesComunes/selectMostrarCategorias.jsx");
const { NuevaCategoria } = require("./componentesComunes/nuevaCategoria.jsx");
const {
  NuevaSubCategoria
} = require("./componentesComunes/nuevaSubCategoria.jsx");


/*CREAR TALLER*/
class CrearTaller extends React.Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();

    this.state = {
      categoria:"",
      subCategorias: [],
      agregaSubCategoria: false,
      agregaCategoria: false,
      error:false,
      disabled: false
    };
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
        <NuevaSubCategoria padre={this} myfunc={this.props.renderizarSelect} />
      );
    }
  }

  agregarSubCategoria(unaSubCategoria) {  
    this.setState({subCategorias: [... this.state.subCategorias, unaSubCategoria]})
  }

  cancelarCreacion() {
    this.setState({ error: false});
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
     //MEJORAR VALDIACION, NO HACE LO QUE DEBERIA PERO....
    if((this.state.categoria !== undefined) 
        && (this.state.nombre !== undefined) 
        && (this.state.subCategorias !== []))
        {
          this.setState({ error: true})
    }
    else{
      this.setState({ error: false});
    }

   
/*
    if ((this.state.categoria === undefined)){
      this.setState({ error: true});
    }
    else{
      this.setState({ error: false});
    }
    if ((this.state.nombre === undefined)){
      this.setState({ error: true});
    }
    else{
      this.setState({ error: false});
    }
    if(!(this.state.subCategorias === [])){
      this.setState({ error: true });
    } 
    else{
      this.setState({ error: false});
    }
    */
  }

  mostrarValidacion(){
    //this.validar()
    if (this.state.error){
      console.log(this.state.error)
    return (
      <div class="alert alert-danger mt-2">
        <strong>ERROR!</strong> DEBE COMPLETAR SI O SI TODOS LOS CAMPOS!
       </div>
    )
  }
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
