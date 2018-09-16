const React = require('react')
const axios = require('axios')

const infoPersona = require("./componentesComunes/infoPersona.jsx");

var pdfMake = require('pdfmake/build/pdfmake.js');
var pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;

/***********************************************
 Alumnos
***********************************************/
/* lista de Alumnos */
class ListarAlumnos extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            alumnoActual: null,
            cupo: null,
            listaDeAlumnos: [],
            infoDeAlumno: false,
            mostrarPanelDeAbajo: false,
            // mostrarPanelDeImpresion: false
        }
    }

    componentDidMount() {
        this.props.rootComponent.state.cursoId = undefined
        this.getDataCurso()
    }

    cerrarInfoPersona() {
        // A esta función la llamo desde el infoPersona para cerrar la pantalla 
        this.setState({ mostrarPanelDeAbajo: false })
    }

    getDataCurso() {
        let self = this
        return axios.get('/api/cursos/' + this.props.idCurso)
            .then(function (response) {
                const json = response.data

                self.setState({
                    listaDeAlumnos: json[0]._alumnos,
                    cupo: json[0]._cupo
                })
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    render() {
        let panelDeAbajo = null
        if (this.state.mostrarPanelDeAbajo) {
            // acá le paso el Alumno a la pantalla de InfoPersona
            panelDeAbajo = (<infoPersona.InfoPersona data={this.state.alumnoActual} screen={() => this.cerrarInfoPersona()} />)
        }

        return (
            <div>
                <div className="m-4 container-fluid recuadroPantalla">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card text-dark">
                                <div className="align-self-center  ">
                                    <h3> Listado de Alumnos </h3></div>
                                <div className="card-body text-dark">
                                    <div className="row">
                                        <div className="col-md-12">
                                            {this.tblAlumnos()}
                                        </div>
                                        {panelDeAbajo}
                                    </div>
                                    {this.botonStandard("Imprimir", () => this.imprimirAlumnos(), "btn-success", "fa-print")}
                                </div>
                                <h4> Alumnos Registrados {this.state.listaDeAlumnos.length} de {this.state.cupo}</h4>
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
                        {this.encabezadoDeTabla(["D.N.I. Nro.", "Apellido", "Nombre",
                            "Teléfono", "e-Mail"])
                        }
                    </tr>
                </thead>
                <tbody>
                    {this.state.listaDeAlumnos.map(alum => this.infoAlumnos(alum))
                    }
                </tbody>
            </table>
        )
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
                <td>{this.botonDetalle(alumno)}
                    {this.botonEliminar(alumno)}</td>
            </tr>
        )
        return rowDatosAlumno
    }
    
    /** --- Encabezado de la Tabla --- */
    encabezadoDeTabla(titulos) {
        return titulos.map((titulo, ix) => (<th key={ix}>{titulo}</th>))
    }
    
    /** --- Filas de la Tabla --- */
    datoEnFila(label, valor, anchoLabel = 3) {
        return (
            <div className="row" style={{ marginBottom: "6px" }}>
                <div className={"col-md-" + anchoLabel} style={{ fontWeight: "bold" }}>{label}</div>
                <div className={"col-md-" + (12 - anchoLabel)}>{valor}</div>
            </div>
        )
    }
    
    /** --- Link para Info del Alumno ---  */
    linkInfoAlumno(alumno) {
        return (
            <a href="#" onClick={() => this.mostrarDatosAlumno(alumno)}>{alumno._apellido}</a>
        )
    }
    
    mostrarDatosAlumno(unAlumno) {
        this.setState({ mostrarPanelDeAbajo: true, alumnoActual: unAlumno })
    }
    
    eliminarAlumno(alumno) {
        let codigo = this.state.listaDeAlumnos.filter((alu) => alu._dni !== alumno._dni);
        this.setState({
            listaDeAlumnos: codigo
        })
        
    }

    imprimirAlumnos() { 
        var cuerpo = [];
        var titulosLinea = ['Apellido', 'Nombre', 'Tel. Principal', 'Observaciones', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14'];

        var lAlumnos = this.state.listaDeAlumnos;

        cuerpo.push(titulosLinea);

            lAlumnos.map(alum => {
                var fila = []
                fila.push(alum._apellido);
                fila.push(alum._nombre);
                fila.push(alum._telPrincipal);
                fila.push(' ');
                fila.push(' ');
                fila.push(' ');
                fila.push(' ');
                fila.push(' ');
                fila.push(' ');
                fila.push(' ');
                fila.push(' ');
                fila.push(' ');
                fila.push(' ');
                fila.push(' ');
                fila.push(' ');
                fila.push(' ');
                fila.push(' ');
                fila.push(' ');
                
                cuerpo.push(fila);           
            });
            
        var docDefinition = {
            pageOrientation: 'landscape',
            content: [
                {
                    table: {
                        headerRows: 1,
                        widths: [100, 100, 80, 100, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15],
                        body: cuerpo
                    },
                },
            ]
        };
        pdfMake.createPdf(docDefinition).open();   
    }

    /** ---   Botones   --- */
    botonDetalle(alumno) {
        return (
            this.botonStandard("Info", () => this.mostrarDatosAlumno(alumno), "btn-info btn-xs", "fa-info")
        )
    }
    
    botonEliminar(alumno) {
        return (
            this.botonStandard("Eliminar", () => this.eliminarAlumno(alumno), "btn-danger btn-xs", "fa-close") 
        )
    }

    // Botón -  parámetro con valor por defecto
    botonStandard(label, accion, clasesAdicionales = "btn-info", glypIcon) {
        return (
            <button className={"btn " + clasesAdicionales} style={{ marginRight: "12px" }} onClick={accion}>
                <span className={"fa " + glypIcon}> {label} </span>
            </button>
        )
    }
}


module.exports.ListarAlumnos = ListarAlumnos
