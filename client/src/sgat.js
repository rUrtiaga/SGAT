const React = require("react");

// variables para componentes de pantallas
const nuevoTaller = require("./nuevoTallerReact");
const nuevoCurso = require("./nuevoCurso");
const muestraTalleres = require("./talleres");
const listarAlumnos = require("./alumnos");
const nuevoAlumno = require("./nuevoAlumno");
const infoPersona = require("./componentesComunes/infoPersona");

const pantallas = {
  muestraTalleres: 1,
  nuevoTaller: 2,
  nuevoCurso: 3,
  listarAlumnos: 4,
  nuevoAlumno: 5,
  infoPersona: 6
};

/*MENU*/
class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pantallaActual: pantallas.muestraTalleres };
    this._cursoActual = null;
    this._ultimaAccion = null;
  }

  mostrarMuestraTalleres() {
    this.setState({ pantallaActual: pantallas.muestraTalleres });
  }

  mostrarNuevoTaller() {
    this.setState({ pantallaActual: pantallas.nuevoTaller });
  }

  mostrarNuevoCurso() {
    this.setState({ pantallaActual: pantallas.nuevoCurso });
  }

  mostrarListarAlumno() {
    this.setState({ pantallaActual: pantallas.listarAlumnos });
  }

  mostrarNuevoAlumno() {
    this.setState({ pantallaActual: pantallas.nuevoAlumno });
  }

  mostrarDatosPersona() {
    this.setState({ pantallaActual: pantallas.infoPersona });
  }
  setUltimaAccion(accion) {
    this._accionAnterior = this._ultimaAccion;
    this._ultimaAccion = accion;
  }

  menuBarra() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary ">
        <a className="navbar-brand bg-primary text-white " href="/">
          S. G. A. T.
        </a>
        {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button> */}
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            {/* <li className="nav-item ">
                        <a className="nav-link">Inicio<span className="sr-only"></span></a>
                    </li> */}
            <li className="nav-item active">
              <a
                className="nav-link"
                onClick={() => this.mostrarMuestraTalleres()}
              >
                Talleres
              </a>
            </li>
            <li className="nav-item dropdown ">
              <a
                className="nav-link dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Inscribir
              </a>
              <div
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <a
                  className="dropdown-item"
                  onClick={() => this.mostrarNuevoAlumno()}
                >
                  Nuevo Alumno
                </a>
                {/*TODO esto es temporal*/}
                <a
                  className="dropdown-item"
                  onClick={() => this.mostrarListarAlumno()}
                >
                  Listar Alumnos temp
                </a>
                <a
                  className="dropdown-item"
                  onClick={() => this.mostrarDatosPersona()}
                >
                  Mostrar Info Persona temp
                </a>
              </div>
            </li>
            <li className="nav-item dropdown ">
              <a
                className="nav-link dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Nuevo
              </a>
              <div className="dropdown-menu" aria-labelledby="#">
                <a
                  className="dropdown-item"
                  onClick={() => this.mostrarNuevoTaller()}
                >
                  Taller
                </a>
                <a
                  className="dropdown-item"
                  onClick={() => this.mostrarNuevoCurso()}
                >
                  Curso
                </a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    );
  }

  //TODO refactorizar esto codigo repetido, ademas deberia ir en un componente Sgat separado
  render() {
    if (this.state.pantallaActual === pantallas.nuevoTaller) {
      this.setUltimaAccion(() => this.mostrarNuevoTaller());
      return (
        <div>
          {this.menuBarra()}
          <nuevoTaller.CrearTaller rootComponent={this} />
        </div>
      );
    } else {
      if (this.state.pantallaActual === pantallas.nuevoCurso) {
        this.setUltimaAccion(() => this.mostrarNuevoCursor());
        return (
          <div>
            {this.menuBarra()}
            <nuevoCurso.NuevoCurso rootComponent={this} />
          </div>
        );
      } else {
        if (this.state.pantallaActual === pantallas.listarAlumnos) {
          this.setUltimaAccion(() => this.mostrarListarAlumno());
          return (
            <div>
              {this.menuBarra()}
              <listarAlumnos.ListarAlumnos
                idCurso={"5b297a332c495f18c331f41f"}
                rootComponent={this}
              />
            </div>
          );
        } else {
          if (this.state.pantallaActual === pantallas.nuevoAlumno) {
            this.setUltimaAccion(() => this.mostrarNuevoAlumno());
            return (
              <div>
                {this.menuBarra()}
                <nuevoAlumno.NuevoAlumno rootComponent={this} />
              </div>
            );
          } else {
            if (this.state.pantallaActual === pantallas.muestraTalleres) {
              this.setUltimaAccion(() => this.mostrarMuestraTalleres());
              return (
                <div>
                  {this.menuBarra()}
                  <muestraTalleres.Talleres rootComponent={this} />
                </div>
              );
            } else {
              if (this.state.pantallaActual === pantallas.infoPersona) {
                this.setUltimaAccion(() => this.mostrarDatosPersona());
                return (
                  <div>
                    {this.menuBarra()}
                    <infoPersona.InfoPersona rootComponent={this} />
                  </div>
                );
              }
            }
          }
        }
      }
    }
  }
}

module.exports.Menu = Menu;
