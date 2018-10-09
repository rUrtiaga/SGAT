const React = require('react')

class NuevaSubCategoria extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nombreSubCategoria: ""
        }
    }

    render() {
        return (
            <div className="form-row mb-2 mt-2">
                 <div className="col-md-12">
                    <label htmlFor="nombreNivel">Nombre de la Nueva Sub-Categoria</label>
                 </div>
                 <div className="col-md-6">
                    <input
                        type="text"
                        className="form-control"
                        id="nombreNivel"
                        placeholder="introduzca el nombre de la SubCategoria"
                        value={this.state.nombreSubCategoria}
                        onChange={(event) => this.setState({nombreSubCategoria: event.target.value})}/>
                </div>           
                <div className="col-md-1">
                    <button
                            type="button"
                            className="btn btn-success"
                            onClick={() => this.agregarSubCategoria()}>
                           <span className="fa fa-plus">  </span>
                            </button>
                </div>
                </div>
        )
    }

    agregarSubCategoria() {
        this.props.padre.agregarSubCategoria(this.state.nombreSubCategoria)
        this.props.padre.setState({
            error: false,
            borrarSubCategorias: false
        })
        this.setState({nombreSubCategoria: ""})
        
    }   

    cancelarAgregado() {
        this.setState({nombreSubCategoria: ""})
        let subC = this.props.padre.state.subCategorias
        subC.splice(subC.length-1,1)
        this.props.padre.setState({subCategorias: subC})
        if (subC.length === 0){
            this.props.padre.setState({borrarSubCategorias: true })
        }
    }
}

exports.NuevaSubCategoria = NuevaSubCategoria