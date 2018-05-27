const React = require('react')
const axios = require('axios')

class NuevaSubCategoria extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            nombreSubCategoria : ""
        }
    }

    render(){
        return(
            <div id="nuevoNivelDiv">
            <div className="form-group">
                <label htmlFor="nombreNivel">Nombre de la Nueva Sub-Categoria</label>
                <input type="text" className="form-control" id="nombreNivel" value={this.state.nombreSubCategoria} onChange={(event)=> this.setState({ nombreSubCategoria: event.target.value })}/>
            </div>
            <div className="row justify-content-end">
                <div className="col"></div>
                <div className="col-md-2">
                    <button type="button" className="btn btn-danger" onClick={() => this.cancelarAgregado()}>Cancelar</button>
                </div>
                <div className="col-md-2">
                    <button type="button" className="btn btn-primary" onClick={()=> this.agregarSubCategoria()}>Guardar</button>

                </div>
            </div>
        </div>
        )
    }

    agregarSubCategoria(){
        const self = this
       
       // axios.post('api/categorias', {categoria: self.state.nombreCategoria})
       //     .then(function(res){
       //     console.log("se agrego la categoria " +  self.state.nombreCategoria)
       // })
       // .catch(error => {
       //     console.log(error)
       // });
       
        this.props.padre.agregarSubCategoria(this.state.nombreSubCategoria)
        this.props.padre.setState({agregaSubCategoria:false})    
    }

    cancelarAgregado(){
        this.setState.nombreSubCategoria = ""
        this.props.padre.setState({agregaSubCategoria:false})
    }
}

exports.NuevaSubCategoria = NuevaSubCategoria