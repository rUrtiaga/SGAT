const React = require('react')
const ReactDOM = require('react-dom')


// variables para componentes de pantallas
const nuevoTaller = require('./nuevoTallerReact')
const nuevoCurso = require('./nuevoCurso')
const muestraTalleres = require('./talleres')

const pantallas = { 
    muestraTalleres: 1, nuevoTaller: 2, nuevoCurso: 3, listarAlumnos: 4
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
    
    mostrarNuevoCurso(){
        this.setState({ pantallaActual: pantallas.nuevoCurso})
    }

    mostrarListarAlumno() {
        this.setState({ pantallaActual: pantallas.listarAlumnos })
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
                        <a className="nav-link" href="#" onClick={() =>this.mostrarMuestraTalleres()}>Talleres</a>
                    </li>
                    <li className="nav-item dropdown ">
                        <a className="nav-link dropdown-toggle" href="#"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Inscribir</a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <a className="dropdown-item" href="#">Pre-Inscripto</a>
                            <a className="dropdown-item" href="#" onClick={() => this.mostrarListarAlumno()}>Nuevo Alumno</a>
                        </div>
                    </li>
                    <li className="nav-item dropdown active">
                        <a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Nuevo
                        </a>
                        <div className="dropdown-menu" aria-labelledby="#">
                        <a className="dropdown-item" href="#" onClick={() =>this.mostrarNuevoTaller()}>Taller</a>
                        <a className="dropdown-item" href="#"  onClick={() =>this.mostrarNuevoCurso()}>Curso</a>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>        
        )
    }

    //ESTO VA EN CURSO   onClick={() =>this.mostrarCurso()}

    render(){
        if (this.state.pantallaActual === pantallas.nuevoTaller) {
            this.setUltimaAccion(() => this.mostrarNuevoTaller())
            return (
                <div>
                    {this.menuBarra()}
                        <nuevoTaller.CrearTaller rootComponent={this}/>   
                </div>
            )
        }
        else {if (this.state.pantallaActual === pantallas.nuevoCurso) {
            this.setUltimaAccion(() => this.mostrarNuevoCursor())
            return (
                <div>
                    {this.menuBarra()}
                        <nuevoCurso.NuevoCurso rootComponent={this}/>   
                </div>
            )
        } else {if (this.state.pantallaActual === pantallas.listarAlumnos) {
            this.setUltimaAccion(() => this.mostrarListarAlumno())
            return (
                <div>
                    {this.menuBarra()}
                        <listarAlumnos.ListarAlumnos rootComponent={this}/>   
                </div>
            )
        }else {if (this.state.pantallaActual === pantallas.muestraTalleres) {
            this.setUltimaAccion(() => this.mostrarMuestraTalleres())
            return (
                <div>
                    {this.menuBarra()}
                        <muestraTalleres.Talleres rootComponent={this}/>   
                </div>
            )
        }
    }
        }
        }       
    }
}

/***********************************************
    Conexión con HTML
 ***********************************************/
/*
ESTO VA EN EL RENDER
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
        


 ReactDOM.render(
    <Menu />,
    document.getElementById('reactPage')
);
*/
module.exports.Menu = Menu