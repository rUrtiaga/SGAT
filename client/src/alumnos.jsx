const React = require("react")
const axios = require("axios")

const { BackButton } = require("./componentesComunes/botones")
const infoPersona = require("./componentesComunes/infoPersona")
const { Alert } = require("react-alert")
const { Link } = require("react-router-dom")

const bootbox = require("bootbox")
const pdfMake = require("pdfmake/build/pdfmake.js")
const pdfFonts = require("pdfmake/build/vfs_fonts.js")
pdfMake.vfs = pdfFonts.pdfMake.vfs

class FilaAlumno extends React.Component {
  /** --- Link para Info del Alumno ---  */
  linkInfoAlumno(alumno) {
    return (
      <button
        type="button"
        className="btn btn-link"
        onClick={() => this.mostrarDatosAlumno(alumno)}
      >
        {alumno._apellido}
      </button>
    )
  }

  render() {
    const alumno = this.props.alumno
    return (
      <tr id="infoAlum" key={alumno._dni}>
        <td>{alumno._dni}</td>
        <td>{this.linkInfoAlumno(alumno)}</td>
        <td>{alumno._nombre}</td>
        <td>{alumno._telPrincipal}</td>
        <td>{alumno._mail}</td>
        <td>{this.props.children}</td>
      </tr>
    )
  }
}

/***********************************************
 Alumnos
***********************************************/
/* lista de Alumnos */

class ListarAlumnos extends React.Component {
  constructor(props) {
    super(props)
    const stateRouter = props.location.state
    this.state = {
      idCurso: stateRouter ? stateRouter.cursoId : "",
      profesores: [],
      alumnoActual: null,
      cupo: null,
      listaDeAlumnos: [],
      nombreTaller: null,
      categoriaTaller: null,
      subCategoriaTaller: null,
      infoDeAlumno: false,
      mostrarPanelDeAbajo: false
    }
  }

  componentDidMount() {
    this.getDataCurso()
  }

  cerrarInfoPersona() {
    // A esta función la llamo desde el infoPersona para cerrar la pantalla
    this.setState({ mostrarPanelDeAbajo: false })
  }

  getDataCurso() {
    let self = this
    return axios
      .get("/api/cursos/" + this.state.idCurso)
      .then(function(response) {
        self.setDataCurso(response.data)
      })
      .catch(function(error) {
        console.log(error)
      })
  }

  setDataCurso(json) {
    this.setState({
      listaDeAlumnos: json[0]._alumnos,
      nombreTaller: json[0]._taller._nombre,
      categoriaTaller: json[0]._taller._categoria,
      subCategoriaTaller: json[0]._taller._subCategoria,
      profesores: json[0]._profesores,
      cupo: json[0]._cupo
    })
  }

  removeAlumno(alumno, alert) {
    let alumnoEliminar = alumno
    return axios
      .delete("/api/cursos/" + this.state.idCurso + "/alumnos/" + alumno._id)
      .then(function(response) {
        alert.success("Se elimino el alumno :  " + alumnoEliminar._apellido)
      })
      .catch(function(error) {
        alert.error(error.response.data.message)
        console.log("Error, no se pudo eliminar el alumno : ", error)
      })
  }

  render() {
    let panelDeAbajo = null
    if (this.state.mostrarPanelDeAbajo) {
      // acá le paso el Alumno a la pantalla de InfoPersona
      panelDeAbajo = (
        <infoPersona.InfoPersona
          data={this.state.alumnoActual}
          screen={() => this.cerrarInfoPersona()}
        />
      )
    }

    return (
      <div>
        <div id="container" className="m-4 container-fluid recuadroPantalla">
          <div className="row">
            <div id="recuadro externo" className="col-md-11">
              <div className="card text-dark">
                <div id="titulos" className="align-self-center  ">
                  <h4> {this.state.categoriaTaller} </h4>
                </div>

                <div className="row justify-content-center">
                  <div id="subTitulos_0" className="align-self-center">
                    <h5>
                      {" "}
                      {this.state.nombreTaller}
                      {" - "}{" "}
                    </h5>
                  </div>
                  <div id="subTitulos_2" className="align-self-center">
                    <h5>
                      {" "}
                      {" - "}
                      {this.state.subCategoriaTaller}{" "}
                    </h5>
                  </div>
                </div>

                <div className="card-body text-dark">
                  <div className="row">
                    <div className="col-md-12">{this.tblAlumnos()}</div>
                    {panelDeAbajo}
                  </div>

                  <BackButton {...this.props} />

                  {this.botonStandard(
                    "Imprimir",
                    alert => this.imprimirAlumnos(alert),
                    "btn-success mr-3",
                    "fa-print"
                  )}

                  <Link
                    className="btn btn-primary md-1"
                    to={{
                      pathname: "/agregarAlumno/",
                      state: { cursoId: this.state.idCurso }
                    }}
                  >
                    <span className={"fa fa-edit"} /> Inscribir
                  </Link>
                </div>
                <h4>
                  {" "}
                  Alumnos Registrados {this.state.listaDeAlumnos.length} de{" "}
                  {this.state.cupo}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  /*Tabla info de Alumno */
  tblAlumnos() {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            {this.encabezadoDeTabla([
              "D.N.I. Nro.",
              "Apellido",
              "Nombre",
              "Teléfono",
              "e-Mail"
            ])}
          </tr>
        </thead>
        <tbody>
          {this.state.listaDeAlumnos.map(alum => (
            <FilaAlumno alumno={alum} key={alum._id}>
              {this.botones(alum)}
            </FilaAlumno>
          ))}
        </tbody>
      </table>
    )
  }

  botones(alum) {
    return (
      <React.Fragment>
        {this.botonDetalle(alum)}
        {this.botonEliminar(alum)}
      </React.Fragment>
    )
  }

  /** --- Encabezado de la Tabla --- */
  encabezadoDeTabla(titulos) {
    return titulos.map((titulo, ix) => <th key={ix}>{titulo}</th>)
  }

  /** --- Filas de la Tabla --- */
  datoEnFila(label, valor, anchoLabel = 3) {
    return (
      <div className="row" style={{ marginBottom: "6px" }}>
        <div className={"col-md-" + anchoLabel} style={{ fontWeight: "bold" }}>
          {label}
        </div>
        <div className={"col-md-" + (12 - anchoLabel)}>{valor}</div>
      </div>
    )
  }

  mostrarDatosAlumno(unAlumno) {
    this.setState({ mostrarPanelDeAbajo: true, alumnoActual: unAlumno })
  }

  eliminarAlumno(alumno, alert) {
    // este es el metodo que genera la ventana de confirmación y llama al metodo eliminar
    let self = this
    bootbox.dialog({
      message: "Va a eliminar a " + alumno._apellido + "  esta seguro ? ",
      buttons: {
        cancel: {
          label: "No",
          className: "btn-danger",
          callback: result => {}
        },
        confirm: {
          label: "Si",
          className: "btn-success",
          callback: result => self.confirmaEliminar(alumno, alert)
        }
      }
    })
  }

  confirmaEliminar(alumno, alert) {
    // Este es el metodo que hace la eliminación del Alumno
    let codigo = this.state.listaDeAlumnos.filter(
      alu => alu._dni !== alumno._dni
    )
    this.setState({ listaDeAlumnos: codigo })
    this.removeAlumno(alumno, alert)
  }

  imprimirAlumnos(alert) {
    var cuerpo = []
    var titulosLinea1 = [
      { text: "Apellido", bold: true },
      { text: "Nombre", bold: true },
      { text: "Tel. Principal", bold: true },
      " Asistencias ",
      "  ",
      "  ",
      "  ",
      "  ",
      "  ",
      "  ",
      "  ",
      "  ",
      "  ",
      "  ",
      "  ",
      "  ",
      "  ",
      "  "
    ]
    var titulosLinea2 = [
      "        ",
      "      ",
      "              ",
      "  ",
      "  ",
      "  ",
      "  ",
      "  ",
      "  ",
      "  ",
      "  ",
      "  ",
      "  ",
      "  ",
      "  ",
      "  ",
      "  ",
      "  "
    ]

    var tituloPpal = `${this.state.categoriaTaller} - ${this.state.nombreTaller} - ${this.state.subCategoriaTaller}`
    let subTitulo = `Profesor/es: ${this.state.profesores
      .map(p => p._apellido + ", " + p._nombre)
      .join(" - ")}`
    cuerpo.push(titulosLinea1)
    cuerpo.push(titulosLinea2)

    this.state.listaDeAlumnos.forEach(alum => {
      var fila = []
      fila.push(alum._apellido)
      fila.push(alum._nombre)
      fila.push(alum._telPrincipal)
      fila.push(" ")
      fila.push(" ")
      fila.push(" ")
      fila.push(" ")
      fila.push(" ")
      fila.push(" ")
      fila.push(" ")
      fila.push(" ")
      fila.push(" ")
      fila.push(" ")
      fila.push(" ")
      fila.push(" ")
      fila.push(" ")
      fila.push(" ")
      fila.push(" ")
      return cuerpo.push(fila)
    })

    var docDefinition = {
      pageOrientation: "landscape",
      content: [
        {
          text: tituloPpal,
          style: "header",
          bold: true,
          alignment: "center",
          fontSize: 20
        },
        {
          text: subTitulo,
          alignment: "center",
          fontSize: 13
        },
        {
          table: {
            headerRows: 2,
            widths: [
              100,
              100,
              80,
              100,
              15,
              15,
              15,
              15,
              15,
              15,
              15,
              15,
              15,
              15,
              15,
              15,
              15,
              15
            ],
            body: cuerpo
          }
        }
      ]
    }
    pdfMake.createPdf(docDefinition).open()
    alert.info("Recuerde tener habilitado para ventanas emergentes")
  }

  /** ---   Botones   --- */
  botonDetalle(alumno) {
    return this.botonStandard(
      "Info",
      () => this.mostrarDatosAlumno(alumno),
      "btn-info mr-3",
      "fa-info"
    )
  }

  botonEliminar(alumno) {
    return this.botonStandard(
      "Eliminar",
      alert => this.eliminarAlumno(alumno, alert),
      "btn-danger mr-3",
      "fa-close"
    )
  }
  // Botón -  parámetro con valor por defecto
  // botonStandard(label, accion, clasesAdicionales = "btn-info mr-3", glypIcon) {
  botonStandard(label, accion, clasesAdicionales, glyphIcon) {
    return (
      <Alert>
        {alert => (
          <button
            className={"btn " + clasesAdicionales}
            // style={{ marginRight: "12px" }}
            onClick={() => accion(alert)}
          >
            <span className={"fa " + glyphIcon}> {label} </span>
          </button>
        )}
      </Alert>
    )
  }
}

module.exports.ListarAlumnos = ListarAlumnos
