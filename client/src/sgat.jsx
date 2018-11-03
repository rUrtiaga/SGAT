const React = require("react");

// variables para componentes de pantallas
const nuevoTaller = require("./nuevoTallerReact");
const nuevoCurso = require("./nuevoCurso");
const muestraTalleres = require("./talleres");
const listarAlumnos = require("./alumnos");
const nuevoAlumno = require("./nuevoAlumno");

const pantallas = {
  muestraTalleres: 1,
  nuevoTaller: 2,
  nuevoCurso: 3,
  listarAlumnos: 4,
  nuevoAlumno: 5,
  listaDeEspera: 6
};

/*MENU*/
class Sgat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pantallaActual: pantallas.muestraTalleres,
      categSeleccionada: ""
    };
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

  changeCategoria(categoria) {
    this.setState({ categSeleccionada: categoria });
  }

  mostrarNuevoAlumno() {
    this.setState({ pantallaActual: pantallas.nuevoAlumno });
  }

  listaDeEspera() {
    this.setState({ pantallaActual: pantallas.listaDeEspera });
  }
  setUltimaAccion(accion) {
    this._accionAnterior = this._ultimaAccion;
    this._ultimaAccion = accion;
  }

  //TODO refactorizar esto codigo repetido, ademas deberia ir en un componente Sgat separado
  render() {
    if (this.state.pantallaActual === pantallas.nuevoTaller) {
      this.setUltimaAccion(() => this.mostrarNuevoTaller());
      return (
        <div>
          {/* {this.menuBarra()} */}
          <nuevoTaller.CrearTaller
            rootComponent={this}
            taller={this.state.taller}
          />
        </div>
      );
    } else {
      if (this.state.pantallaActual === pantallas.nuevoCurso) {
        this.setUltimaAccion(() => this.mostrarNuevoCursor());
        return (
          <div>
            {/* {this.menuBarra()} */}
            <nuevoCurso.NuevoCurso
              rootComponent={this}
              curso={this.state.curso}
            />
          </div>
        );
      } else {
        if (this.state.pantallaActual === pantallas.listarAlumnos) {
          this.setUltimaAccion(() => this.mostrarListarAlumno());
          return (
            <div>
              {/* {this.menuBarra()} */}
              <listarAlumnos.ListarAlumnos
                idCurso={this.state.cursoId} //"5b297a332c495f18c331f41f"
                rootComponent={this}
              />
            </div>
          );
        } else {
          if (this.state.pantallaActual === pantallas.nuevoAlumno) {
            this.setUltimaAccion(() => this.mostrarNuevoAlumno());
            return (
              <div>
                {/* {this.menuBarra()} */}
                <nuevoAlumno.NuevoAlumno
                  cursoId={this.state.cursoId}
                  rootComponent={this}
                />
              </div>
            );
          } else {
            if (this.state.pantallaActual === pantallas.muestraTalleres) {
              this.setUltimaAccion(() => this.mostrarMuestraTalleres());
              return (
                <div>
                  {/* {this.menuBarra()} */}
                  <muestraTalleres.Talleres
                    rootComponent={this}
                    categoriaSeleccionada={this.state.categSeleccionada}
                    onChangeCategoria={cat => this.changeCategoria(cat)}
                  />
                </div>
              );
            } else {
              if (this.state.pantallaActual === pantallas.listaDeEspera) {
                this.setUltimaAccion(() => this.listaDeEspera());
                return (
                  <div>
                    {/* {this.menuBarra()} */}
                    <h4 className="m-sm-5 text-center">
                      {" "}
                      En construcción disculpe =({" "}
                    </h4>
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

module.exports.Sgat = Sgat;
