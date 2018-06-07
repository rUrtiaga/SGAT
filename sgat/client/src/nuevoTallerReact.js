const React = require('react')
const {MuestraCategorias} = require('./componentesComunes/selectMostrarCategorias.jsx')


/*CREAR TALLER*/
class CrearTaller extends React.Component{
    constructor(props) {
        super(props)
		this.state = { 
			nombre:"",
			categoria: "",
			nivel: "",
			nombreCategoria: "",
			nombreNivel: "",
			agregaNivel:false,
			agregaCategoria:false
	}
	}
	mostrarDivNuevaCateg(){
		this.setState({agregaCategoria: !this.state.agregaCategoria})
	}
	ocultarDivNuevaCateg(){
		this.setState({agregaCategoria:false})
	}
	mostrarDivNuevoNivel(){
		this.setState({agregaNivel: !this.state.agregaNivel})
	}
	ocultarDivNuevoNivel(){
		this.setState({agregaNivel:false})
	}

/*PANEL PARA CREAR NIVEL*/ 


/*PANEL PARA CREAR CATEGORIA */

	nuevaCategoria(){
		if(this.state.agregaCategoria){	return (
			<div id="nuevaCategoriaDiv"  >
			<div className="form-group">
				<label htmlFor="nombreCategoria">Nombre de la nueva Categoria</label>
				<input type="text" className="form-control" id="nombreCategoria"
					value={this.state.nombreCategoria}
					onChange={(event) => this.setState({ nombreCategoria: event.target.value })}/>
			</div>
				<div className="row justify-content-end">
					<div className="col"></div>
						<div className="col-md-2">
							<button type="button" className="btn btn-danger" onClick={() => this.ocultarDivNuevaCateg()}>Cancelar</button>  
						</div>
						<div className="col-md-2">
							<button type="button" className="btn btn-primary" onClick={() => this.ocultarDivNuevaCateg()}>Guardar</button>
						</div>
				</div>
			</div>
		)}
	}

	nuevoNivel(){
			if(this.state.agregaNivel){ 
				return (
					<div id="nuevoNivelDiv">
						<div className="form-group">
							<label htmlFor="nombreNivel">Nombre del Nuevo Nivel</label>
							<input type="text" className="form-control" id="nombreNivel" value={this.state.nombre} onChange={(event)=> this.setState({ nombreNivel: event.target.value })}/>
						</div>
						<div className="row justify-content-end">
							<div className="col"></div>
							<div className="col-md-2">
								<button type="button" className="btn btn-danger" onClick={()=> this.ocultarDivNuevoNivel()}>Cancelar</button>
							</div>
							<div className="col-md-2">
								<button type="button" className="btn btn-primary" onClick={()=> this.ocultarDivNuevoNivel()}>Guardar</button>

							</div>
						</div>
					</div>
				)
	}
}
	
seleccionarCategoria(valor){
	this.setState({categoria:valor})
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
							<MuestraCategorias seleccionar={(v)=>this.seleccionarCategoria(v)} padre={this} />
							<div className="col">
								<button type="button" className="btn btn-primary" onClick={()=> this.mostrarDivNuevaCateg()}>Nueva Categoria</button>
							</div>
						</div>
						{//muestra panel de nueva categoria this.nuevaCategoria() 
						}
						<div className="form-group">
							<label htmlFor="nombreTaller">Nombre del Nuevo Taller</label>
							<input type="text" className="form-control" id="nombreTaller" value={this.state.nombre} onChange={(event)=> this.setState({ nombre: event.target.value })}/>
						</div>
						<label htmlFor="Curso">Nivel</label>
						<div className="form-row">
							<div className="col">
								<select className="form-control" id="niveles">
									<option value="principiante">Principiante</option>
									<option value="intermedio">Intermedio</option>
									<option value="avanzado">Avanzado</option>
									<option value="unico">Unico</option>
								</select>
							</div>
							<div className="col">
								<button type="button" className='btn btn-primary' onClick={()=> this.mostrarDivNuevoNivel()}>Nuevo Nivel</button>
							</div>
						</div>

						{ //muestra panel de nuevo NIVEL this.nuevoNivel() 
						}

						<div className="row justify-content-end" style={{marginTop:10}}>
							<div className="col"></div>
							<div className="col-md-2">
								<button type="submit" className='btn btn-danger'>Cancelar</button>
							</div>
							<div className="col-md-2">
								<button type="submit" className='btn btn-primary'>Aceptar</button>
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>

	)

}
}
module.exports.CrearTaller = CrearTaller