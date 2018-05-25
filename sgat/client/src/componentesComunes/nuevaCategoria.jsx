const React = require('react')
const axios = require('axios')

class NuevaCategoria extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            nombreCategoria : ""
        }
    }

    render(){
        return(
            <div className='col'>
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
							<button type="button" className="btn btn-danger" onClick={() => this.cancelarAgregado()}>Cancelar</button>  
						</div>
						<div className="col-md-2">
							<button type="button" className="btn btn-primary" onClick={() => this.agregarCategoria()}>Guardar</button>
						</div>
				</div>
			</div>
            </div>
        )
    }

    agregarCategoria(){

        const self = this
        //axios.post('api/nuevaCategoria', this.state.nombreCategoria)
        
        axios.post('api/nuevaCategoria', {categoria: self.state.nombreCategoria})
            .then(function(res){
            console.log("se agrego la categoria " +  self.state.nombreCategoria)
        })
        .catch(error => {
            console.log(error)
        });
        
        this.props.padre.setState({agregaCategoria:false})

    }

    cancelarAgregado(){
        //event.target.value = ""
        this.setState.nombreCategoria = ""
        this.props.padre.setState({agregaCategoria:false})
    }

}



exports.NuevaCategoria = NuevaCategoria