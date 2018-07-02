const React = require('react')
const axios = require('axios')

const style3 = { marginRight:10 };

class Talleres extends React.Component{
    constructor(props) {
        super(props)
		this.state = {
			cupo: null,
			listaDeTalleres:[] 
		}
	}	

	componentDidMount() {
		this.getDataTaller()
	}

	getDataTaller() {
		let self = this
		return axios.get('/api/talleres')
			.then(function (response) {
				const json = response.data
				self.setState({
					listaDeTalleres: json,
					cupo: json[0]._cupo
				})
				return Promise.resolve(json)
			})
			.catch(function (error) {
				console.log(error)
			})
	}

	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-3">
						<div className="col-md-12">
							{this.tblTalleres()}
						</div>
					</div>
					<div className="col-md-9">
						<div className="bs-docs-sections">
							{/* <a id="install" href="#install" class="anchor"> */}
								{/* <span class="anchor-icon">#</span> */}
								{/* Install */}
   							{/* </a> */}
						</div>
						<Curso rootComponent={this}/> 
					</div>	
				</div>
			</div>
		)
	}
	tblTalleres(){
		return(
			<table className = "table table-striped" >
				<thead>
					<tr>
						{this.encabezadoDeLaTabla(["Talleres"])}
					</tr>
				</thead>
				<tbody className="table table-bordered">
					{ this.state.listaDeTalleres.map(taller => this.nombreDeTaller(taller)) }
				</tbody>
			</table>
		)
	}

	/** --- Datos de la Tabla --- */
	// Aca completo la tabla con los datos del taller
	nombreDeTaller(unTaller){
		console.log(unTaller);
		const rowDatosDelTaller = (
			<tr id="infoTaller" key={unTaller._nombre}>
				<td>{unTaller._nombre}</td>
				<td>{unTaller._categoria}</td>
				<td>{unTaller._subCategoria}</td>
			</tr>
		)
		return rowDatosDelTaller
	}

	/** --- Encabezado de la Tabla --- */
	// Acá le doy formato a los titulos de la tabla 
	encabezadoDeLaTabla(titulos) {
		return titulos.map((titulo, x) => (<th key={x}>{titulo}</th>))
	}
}

class Curso extends React.Component{
    constructor(props) {
        super(props)
		this.state = { 
			nombre:"P",
			profesor:"F",
			cupo:20,
			dias:"Miercoles y Domingos",
			horario:"20:00",
			lugar:"casa de la cultura"
			//<Curso rootComponent={this}/>
		}
	}	
	render() {
		return (
			<div className="card-body">			
				<div className="card mb-3">
					<div className="row">
						<div className="card-body">
							<h5 className="card-title"> {this.state.nombre} </h5>
							<div className="col-md-7">
								<p className="card-text">Prof: 
								<span> {this.state.profesor}</span> Cupo: 
								<span>{this.state.cupo}</span> Dias: 
								<span>{this.state.dias}</span> Horario: 
								<span>{this.state.horario}</span> Lugar: 
								<span>{this.state.lugar}</span>
								</p>
							</div>
							
							<div className="col-md-5">
								<button className="btn btn-primary" style={style3} disabled>
									<span className="fa fa-hourglass"> En espera </span> 
								</button>
								<button className="btn btn-primary" style={style3} onClick={() => this.alumnos(this)}> 
									<span className="fa fa-user"> Alumnos </span> 
								</button>
								<button className="btn btn-primary" style={style3}>
									<span className="fa fa-pencil"> Inscribir </span>  
								</button>
							</div>
						</div>	
					</div>
				</div>
			</div>
		)
	}
	alumnos(unTaller){
		console.log(unTaller);
		
	}
}



module.exports.Talleres = Talleres