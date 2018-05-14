const React = require('react')
const ReactDOM = require('react-dom')

const style3 = {
	marginTop:10,
};

class NuevoCurso extends React.Component{
    constructor(props) {
        super(props)
		this.state = { 
			categoria:"",
			taller: "",
			subcategoria: "",
			cupo: "",
			dia: "",
			hora:"",
			lugar:"",
			comentario:""
	}
	}

	//El Select TALLER deberia desplegarse una vez que seleciono la CATEGORIA, lo mismo con la SUBCATEGORIA y el TALLER.
	render() {
		return (    	
		<div className="m-4 container-fluid recuadroPantalla">
	
        <div className="card">
			<div className="card-header bg-primary text-white">
                <h3>Nuevo Curso</h3>
            </div>
		</div>

	<div className="form-group">
	<div className="form-row">	
	<div className="col-md-3">
  	<label htmlFor="Curso">Seleccione una Categoria</label>
    <div className="form-row">
        <div className="col">
			<select className="form-control" id="categorias" onChange={(event) => this.setState({ categoria: event.target.value })}>
				<option value="c1">Artes Manuales</option>
				<option value="c2">Instrumentos Musicales</option>
				<option value="c3">Tecnologias</option>
				<option value="c4">Educativas</option>
			</select> 
    	</div> 
    </div>
  </div>

  <div className="col-md-3">
  	<label htmlFor="Curso">Seleccione un Taller</label>
    <div className="form-row">
        <div className="col">
			<select className="form-control" id="talleres" onChange={(event) => this.setState({ taller: event.target.value })}>
				<option value="t1">Pintura</option>
				<option value="t2">Ceramica</option>
				<option value="t3">Tejido</option>
			</select> 
    	</div> 
    </div>
  </div>
  <div className="col-md-3">
  	<label htmlFor="Curso">Seleccione una Sub-Categoria</label>
    <div className="form-row">
        <div className="col">
			<select className="form-control" id="subcategorias" onChange={(event) => this.setState({ subcategoria: event.target.value })}>
				<option value="s1">Principiantes</option>
				<option value="s2">Intermedio</option>
				<option value="s3">Avanzado</option>
			</select> 
    	</div> 
    </div>
  </div>
  </div>
  </div>


<div className="card mb-3">
  <div className="form-group">
  <div className="col-md-1">
        <label htmlFor="cupo">Cupo:</label>
        <input type="text" className="form-control" id="cupo"
                value={this.state.cupo}
                onChange={(event) => this.setState({ cupo: event.target.value })}/>
	</div>
	<div className="col-md-3">
        <label htmlFor="cupo">Dia:</label>
        <input type="text" className="form-control" id="cupo"
                value={this.state.dia}
                onChange={(event) => this.setState({ dia: event.target.value })}/>
	</div>
	<div className="col-md-3">
        <label htmlFor="lugar">Lugar:</label>
        <input type="text" className="form-control" id="lugar"
                value={this.state.cupo}
                onChange={(event) => this.setState({ lugar: event.target.value })}/>
	</div>
	<div className="col-md-3">
        <label htmlFor="hora">Horario:</label>
        <input type="text" className="form-control" id="hora"
                value={this.state.hora}
                onChange={(event) => this.setState({ hora: event.target.value })}/>
	</div>
	<div className="col">
        <label htmlFor="comentario">Comentario:</label>
        <input type="textarea" className="form-control" id="comentario" row="3"
                value={this.state.comentario}
                onChange={(event) => this.setState({ comentario: event.target.value })}/>
	</div>
	</div>
	</div>	


	<div className="row justify-content-end" style={style3}>
        <div className="col-md-2">
            <button type="submit" className='btn btn-danger'>Agregar Docente</button>    
        </div>
		<div className="col-md-2">
            <button type="submit" className='btn btn-danger'>Cancelar</button>    
        </div>
        <div className="col-md-2">
            <button type="submit" className='btn btn-primary'>Aceptar</button>
        </div>
    </div>
	 
                       
    </div>
)}
}
	
module.exports.NuevoCurso = NuevoCurso