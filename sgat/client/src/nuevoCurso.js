const React = require('react')

const {Selector} = require('./componentesComunes/selector.jsx')

const style3 = {
    marginTop: 10
};

class NuevoCurso extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            categoria: "",
            taller: "",
            subcategoria: "",
            cupo: "",
            dia: "",
            hora: "",
            lugar: "",
            comentario: "",

            eligioCategoria: false,
            eligioTaller:   false,
            selectorCursoOculto: false

        }
    }

    // El Select TALLER deberia desplegarse una vez que seleciono la CATEGORIA, lo
    // mismo con la SUBCATEGORIA y el TALLER.
    render() {
        return (
            

            <div className="m-4 container-fluid recuadroPantalla">

                <div className="card">
                    <div className="card-header bg-primary text-white">
                        <h3>Nuevo Curso</h3>
                    </div>
                </div>
                
                <Selector padre={this} style={style3}/>

                
                <div className="card mb-3" style={style3}>
                    <div className="form-group">
                        <div className="col-md-1">
                            <label htmlFor="cupo">Cupo:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="cupo"
                                value={this.state.cupo}
                                onChange={(event) => this.setState({cupo: event.target.value})}/>
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="cupo">Dia:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="cupo"
                                value={this.state.dia}
                                onChange={(event) => this.setState({dia: event.target.value})}/>
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="lugar">Lugar:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="lugar"
                                value={this.state.cupo}
                                onChange={(event) => this.setState({lugar: event.target.value})}/>
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="hora">Horario:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="hora"
                                value={this.state.hora}
                                onChange={(event) => this.setState({hora: event.target.value})}/>
                        </div>
                        <div className="col">
                            <label htmlFor="comentario">Comentario:</label>
                            <input
                                type="textarea"
                                className="form-control"
                                id="comentario"
                                row="3"
                                value={this.state.comentario}
                                onChange={(event) => this.setState({comentario: event.target.value})}/>
                        </div>
                    </div>
                </div>

                <div className="row justify-content-end" style={style3}>
                    <div className="col-md-2">
                        <button className='btn btn-danger'>Agregar Docente</button>
                    </div>
                    <div className="col-md-2">
                        <button className='btn btn-danger'>Cancelar</button>
                    </div>
                    <div className="col-md-2">
                        <button className='btn btn-primary'>Aceptar</button>
                    </div>
                </div>

            </div>
        )
    }
}

module.exports.NuevoCurso = NuevoCurso