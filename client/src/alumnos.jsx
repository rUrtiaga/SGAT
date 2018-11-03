const React = require("react");
const axios = require("axios");

const infoPersona = require("./componentesComunes/infoPersona");
const { Alert } = require("react-alert");

const bootbox = require("bootbox");
const pdfMake = require("pdfmake/build/pdfmake.js");
const pdfFonts = require("pdfmake/build/vfs_fonts.js");
pdfMake.vfs = pdfFonts.pdfMake.vfs;

/***********************************************
 Alumnos
***********************************************/
/* lista de Alumnos */
class ListarAlumnos extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    const params = props.match.params;
    this.state = {
      idCurso: params ? params.id : "",
      alumnoActual: null,
      cupo: null,
      listaDeAlumnos: [],
      nombreTaller: null,
      categoriaTaller: null,
      subCategoriaTaller: null,
      infoDeAlumno: false,
      mostrarPanelDeAbajo: false
    };
  }

  componentDidMount() {
    // this.props.rootComponent.state.cursoId = undefined;
    this.getDataCurso();
  }

  cerrarInfoPersona() {
    // A esta función la llamo desde el infoPersona para cerrar la pantalla
    this.setState({ mostrarPanelDeAbajo: false });
  }

  getDataCurso() {
    let self = this;
    return axios
      .get("/api/cursos/" + this.state.idCurso)
      .then(function(response) {
        const json = response.data;

        self.setState({
          listaDeAlumnos: json[0]._alumnos,
          nombreTaller: json[0]._taller._nombre,
          categoriaTaller: json[0]._taller._categoria,
          subCategoriaTaller: json[0]._taller._subCategoria,
          cupo: json[0]._cupo
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  removeAlumno(alumno, alert) {
    let alumnoEliminar = alumno;
    return axios
      .delete("/api/cursos/" + this.state.idCurso + "/alumnos/" + alumno._id)
      .then(function(response) {
        alert.success("Se elimino el alumno :  " + alumnoEliminar._apellido);
      })
      .catch(function(error) {
        alert.error(error.response.data.message);
        console.log("Error, no se pudo eliminar el alumno : ", error);
      });
  }

  render() {
    let panelDeAbajo = null;
    if (this.state.mostrarPanelDeAbajo) {
      // acá le paso el Alumno a la pantalla de InfoPersona
      panelDeAbajo = (
        <infoPersona.InfoPersona
          data={this.state.alumnoActual}
          screen={() => this.cerrarInfoPersona()}
        />
      );
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

                  {this.botonStandard(
                    "Volver",
                    () => this.volver(),
                    "btn-success",
                    "fa-chevron-left"
                  )}
                  {this.botonStandard(
                    "Imprimir",
                    () => this.imprimirAlumnos(),
                    "btn-success",
                    "fa-print"
                  )}
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
    );
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
          {this.state.listaDeAlumnos.map(alum => this.infoAlumnos(alum))}
        </tbody>
      </table>
    );
  }
  volver() {
    this.props.rootComponent.setState({ pantallaActual: 1 });
  }

  /*Acá completo la tabla con la info de Alumno */
  // dni, nombre, apellido, fechaNac, direccion, telPrincipal, telSecundario, mail, comentario
  infoAlumnos(alumno) {
    const rowDatosAlumno = (
      <tr id="infoAlum" key={alumno._dni}>
        <td>{alumno._dni}</td>
        <td>{this.linkInfoAlumno(alumno)}</td>
        <td>{alumno._nombre}</td>
        <td>{alumno._telPrincipal}</td>
        <td>{alumno._mail}</td>
        <td>
          {this.botonDetalle(alumno)}
          {this.botonEliminar(alumno)}
        </td>
      </tr>
    );
    return rowDatosAlumno;
  }

  /** --- Encabezado de la Tabla --- */
  encabezadoDeTabla(titulos) {
    return titulos.map((titulo, ix) => <th key={ix}>{titulo}</th>);
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
    );
  }

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
    );
  }

  mostrarDatosAlumno(unAlumno) {
    this.setState({ mostrarPanelDeAbajo: true, alumnoActual: unAlumno });
  }

  eliminarAlumno(alumno, alert) {
    // este es el metodo que genera la ventana de confirmación y llama al metodo eliminar
    let self = this;
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
    });
  }

  confirmaEliminar(alumno, alert) {
    // Este es el metodo que hace la eliminación del Alumno
    let codigo = this.state.listaDeAlumnos.filter(
      alu => alu._dni !== alumno._dni
    );
    this.setState({ listaDeAlumnos: codigo });
    this.removeAlumno(alumno, alert);
  }

  imprimirAlumnos() {
    var cuerpo = [];
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
    ];
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
    ];
    var lAlumnos = this.state.listaDeAlumnos;

    var tituloPpal = this.state.categoriaTaller;
    cuerpo.push(titulosLinea1);
    cuerpo.push(titulosLinea2);

    lAlumnos.map(alum => {
      var fila = [];
      fila.push(alum._apellido);
      fila.push(alum._nombre);
      fila.push(alum._telPrincipal);
      fila.push(" ");
      fila.push(" ");
      fila.push(" ");
      fila.push(" ");
      fila.push(" ");
      fila.push(" ");
      fila.push(" ");
      fila.push(" ");
      fila.push(" ");
      fila.push(" ");
      fila.push(" ");
      fila.push(" ");
      fila.push(" ");
      fila.push(" ");
      fila.push(" ");
      return cuerpo.push(fila);
    });

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
    };
    pdfMake.createPdf(docDefinition).open();
  }

  /** ---   Botones   --- */
  botonDetalle(alumno) {
    return this.botonStandard(
      "Info",
      () => this.mostrarDatosAlumno(alumno),
      "btn-info btn-xs",
      "fa-info"
    );
  }

  botonEliminar(alumno) {
    return this.botonStandard(
      "Eliminar",
      alert => this.eliminarAlumno(alumno, alert),
      "btn-danger btn-xs",
      "fa-close"
    );
  }
  // Botón -  parámetro con valor por defecto
  botonStandard(label, accion, clasesAdicionales = "btn-info", glypIcon) {
    return (
      <Alert>
        {alert => (
          <button
            className={"btn " + clasesAdicionales}
            style={{ marginRight: "12px" }}
            onClick={() => accion(alert)}
          >
            <span className={"fa " + glypIcon}> {label} </span>
          </button>
        )}
      </Alert>
    );
  }
}

module.exports.ListarAlumnos = ListarAlumnos;
