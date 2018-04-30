const React = require('react')
const ReactDOM = require('react-dom')


// variables para componentes de pantallas
const nuevoTaller = require('./nuevoTallerReact')


const pantallas = { 
    muestraTalleres: 1, nuevoTaller: 2, nuevoCurso: 3
}

/*MENU*/
class Menu extends React.Component {
    constructor(props) {
        super(props)
        this.state = { pantallaActual: pantallas.nuevoTaller }
        this._cursoActual = null
        this._ultimaAccion = null
    }

    mostrarMuestraTalleres() {
        this.setState({ pantallaActual: pantallas.muestraTalleres })
    }

    mostrarNuevoTaller() {
        this.setState({ pantallaActual: pantallas.nuevoTaller })
    }
    
    mostrarCurso(){
        this.setState({ pantallaActual: pantallas.nuevoCurso})
    }

    setUltimaAccion(accion) {
        this._accionAnterior = this._ultimaAccion
        this._ultimaAccion = accion
    }

    menuBarra(){
        return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <a className="navbar-brand" href="#" >S.G.A.T.</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    <li className="nav-item ">
                        <a className="nav-link" href="#">Inicio<span className="sr-only"></span></a>
                    </li>
                    <li className="nav-item ">
                        <a className="nav-link" href="#">Talleres</a>
                    </li>
                    <li className="nav-item dropdown ">
                        <a className="nav-link dropdown-toggle" href="#"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Inscribir</a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <a className="dropdown-item" href="#">Pre-Inscripto</a>
                            <a className="dropdown-item" href="#">Nueva Inscripcion</a>
                        </div>
                    </li>
                    <li className="nav-item dropdown active">
                        <a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Nuevo
                        </a>
                        <div className="dropdown-menu" aria-labelledby="#">
                        <a className="dropdown-item" href="#" onClick={() =>this.mostrarNuevoTaller()}>Taller</a>
                        <a className="dropdown-item" href="#" onClick={() =>this.mostrarCurso()}>Curso</a>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>        
        )
    }


    render(){
        if (this.state.pantallaActual === pantallas.nuevoTaller) {
            this.setUltimaAccion(() => this.mostrarNuevoTaller())
            return (
                <div>
                    {this.menuBarra()}
                    <div className="container" style={{marginLeft: "20px", marginRight: "20px"}}>
                        <nuevoTaller.CrearTaller rootComponent={this}/>   
                    </div>
                </div>
            )
        }
        if (this.state.pantallaActual === pantallas.nuevoCurso) {
            this.setUltimaAccion(() => this.mostrarNuevoTaller())
            return (
                <div>
                    {this.menuBarra()}
                    <div className="container" style={{marginLeft: "20px", marginRight: "20px"}}>
                        <nuevoCurso.CrearCurso rootComponent={this}/>   
                    </div>
                </div>
            )
        }           
    }
}

/***********************************************
    Conexión con HTML
 ***********************************************/
/*
 ReactDOM.render(
    <Menu />,
    document.getElementById('reactPage')
);
*/
module.exports.Menu = Menu