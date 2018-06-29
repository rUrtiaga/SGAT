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
		//provisoriamente se codea esta 
		let self = this
		return axios.get('/api1/talleres')
			.then(function (response) {
				const json = JSON.parse(response.data)
				self.setState({
					listaDeTalleres: json._talleres,
					cupo: json[0]._cupo
				})
				return Promise.resolve(json._talleres)
			})
			.catch(function (error) {
				console.log(error)
			})
	}

	render() {
		return (
			<div>
				<Curso rootComponent={this}/> 
				<div className="container mt-3">
					<div className="row">
						<div className="col-md-2">
							<div className="col-md-12">
								{this.tblTalleres()}
							</div>
						</div>
					</div>
				</div>	
			</div>
		)
	}
	tblTalleres(){
		return (
			<table className="table table-striped">
				<thead>
					<tr>
						Taller de:
					</tr>
				</thead>
				<tbody>
					{/* { this.state.listaDeTalleres.map(taller => this.nombreTaller(taller)) } */}
				</tbody>
			</table>
		)
	}
	nombreTaller(unTaller){
		const rowNombreTaller = (
			<tr id="nombre" key={unTaller._nombre}>
				<td>{unTaller._nombre}</td>
			</tr>
		)
		return rowNombreTaller
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
					<div className="card-body">
						<h5 className="card-title"> {this.state.nombre} </h5>
							<div className="row">
							<div className="col-md-8">
								<p className="card-text">Prof: 
								<span> {this.state.profesor}</span> Cupo: 
								<span>{this.state.cupo}</span> Dias: 
								<span>{this.state.dias}</span> Horario: 
								<span>{this.state.horario}</span> Lugar: 
								<span>{this.state.lugar}</span>
								</p>
							</div>
							
							<div className="col-md-4">
								<button className="btn btn-primary" style={style3} disabled> Espera </button>
								<button className="btn btn-primary" style={style3}> Alumnos </button>
								<button className="btn btn-primary" style={style3}> Inscribir </button>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}



module.exports.Talleres = Talleres