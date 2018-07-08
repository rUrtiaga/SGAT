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
            <div id="nuevoNivelDiv">
                <div className="form-group">
                    <label htmlFor="nombreNivel">Nombre de la Nueva Sub-Categoria</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nombreNivel"
                        placeholder="introduzca el nombre de la SubCategoria"
                        value={this.state.nombreSubCategoria}
                        onChange={(event) => this.setState({nombreSubCategoria: event.target.value})}/>
                </div>
                <div className="row justify-content-end">
                    <div className="col"></div>
                    
                    <div className="col-md-2">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => this.agregarSubCategoria()}>Agregar Sub-Categoria</button>

                    </div>

                    <div className="col-md-2">
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => this.cancelarAgregado()}>Borrar Sub-Categorias</button>
                    </div>
                </div>
            </div>
        )
    }

    agregarSubCategoria() {
        this
            .props
            .padre
            .agregarSubCategoria(this.state.nombreSubCategoria)
            this.props.padre.setState({error: false})
        this.setState({nombreSubCategoria: ""})
        
    }   

    cancelarAgregado() {
        this.setState({nombreSubCategoria: ""})
        this.props.padre.setState({subCategorias: ""})
    }
}

exports.NuevaSubCategoria = NuevaSubCategoria