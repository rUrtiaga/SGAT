const React = require('react')
const ReactDOM = require('react-dom')

const style1 = {
	//display:Block,
  };
const style2 = {
	//display:Block,
	//marginRight: spacing
};
const style3 = {
	marginTop:10,
};



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
		console.log(this.state.agregaCategoria)
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
			<div id="nuevaCategoriaDiv" style={style1} >
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
		if(this.state.agregaNivel){	return (
			<div id="nuevoNivelDiv" style={style2}>
			<div className="form-group">
								<label htmlFor="nombreNivel">Nombre del Nuevo Nivel</label>
								<input type="text" className="form-control" id="nombreNivel"
									value={this.state.nombre}
									onChange={(event) => this.setState({ nombreNivel: event.target.value })}/>
			</div>
						<div className="row justify-content-end">
							<div className="col"></div> 
							<div className="col-md-2">
									<button type="button" className="btn btn-danger" onClick={() => this.ocultarDivNuevoNivel()}>Cancelar</button>    
								</div>
								<div className="col-md-2">
									<button type="button" className="btn btn-primary" onClick={() => this.ocultarDivNuevoNivel()}>Guardar</button>
								   
								</div>
							</div>
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
            <label htmlFor="Curso">Categoria</label>
            <div className="form-row">
            <div className="col">
                <select className="form-control" id="categorias">
                    <option value="artesManuales">Artes Manuales</option>
                    <option value="instMusicales">Instrumentos Musicales</option>
                    <option value="musicales">Musicales</option>
                    <option value="tecnologias">Tecnologias</option>
                    <option value="educativas">Educativas</option>
                    <option value="otras">Otras</option>
                </select> 
            </div>
            <div className="col">
                <button type="button" className="btn btn-primary" onClick={() => this.mostrarDivNuevaCateg()}>Nueva Categoria</button>
            </div>  
            </div>
			{
				//muestra panel de nueva categoria	
				this.nuevaCategoria()
			}

		<div className="form-group">
                                <label htmlFor="nombreTaller">Nombre del Nuevo Taller</label>
                                <input type="text" className="form-control" id="nombreTaller"
                                    value={this.state.nombre}
                                    onChange={(event) => this.setState({ nombre: event.target.value })}/>
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
                <button type="button" className='btn btn-primary' onClick={() => this.mostrarDivNuevoNivel()}>Nuevo Nivel</button>
            </div>  
            </div>
		
			{
				//muestra panel de nuevo NIVEL	
				this.nuevoNivel()
			}

            <div className="row justify-content-end" style={style3}>
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