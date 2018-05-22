const React = require('react')
const ReactDOM = require('react-dom')

const style3 = {
	marginRight:10,
};

class Talleres extends React.Component{
    constructor(props) {
        super(props)
		this.state = { 

	}
	}	
render() {
	return (
		<div><Curso rootComponent={this}/> </div>
	)

}
}

class Curso extends React.Component{
    constructor(props) {
        super(props)
		this.state = { 
			nombre:"Princimiantes",
			profesor:"Fulano de Nadie",
			cupo:20,
			dias:"Miercoles y Domingos",
			horario:"20:00",
			lugar:"casa de la cultura"
			//<Curso rootComponent={this}/>
	}
	}	
render() {
	return (
		<div class="card-body">
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