const React = require('react')
const ReactDOM = require('react-dom')

    /***********************************************
    Pantallas
    ***********************************************/
    // const pantallas = {
    //     muestraTalleres: 1, nuevoTaller: 2, nuevoCurso: 3, infoAlumno: 4, listarAlumnos: 5
    // }

    /***********************************************
    Alumnos
    ***********************************************/
    /* lista de Alumnos*/
    class ListarAlumnos extends React.Component {
        constructor(props) {
           super(props)
           this.state = { docNro:"", apellido:"", nombre: "", 
           direccion:"", telefono:"", email:"", 
           listaDeAlumnos:[] }
           this._ultimaAccion = null
        }
        // mostrarListaAlumnos() {
        //     this.setState({ pantallaActual: pantallas.infoAlumnos })
        // }
               
        // mostrarFormAgregarAlumno() {
        //    this.setState({ pantallaActual: pantallas.agregarAlumno })
        // }

    render() {
        return (
            <div>
                <div className="m-4 container-fluid recuadroPantalla">
                    <div className="row">
                        <div className="col-md-11">
                            <div className="card text-dark">
                                <div className="card-header bg-primary text-white">
                                    <h3>Nuevo Curso</h3>
                                </div>
                                <div className="card-body text-dark">
                                    <div className="row">
                                        <div className="col-md-12">
                                            {this.tblAlumnos()}
                                        </div>
                                    </div>
                                    <Botonera>
                                        {this.botonStandard("Eliminar Alumno", () => this.eliminarAlumno())}
                                    </Botonera>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }   

    eliminarAlumno() {
        
        let codigo = this.state.listaDeAlumnos.filter((alum) => alum.dniNro !== alum.dniNro);
        this.setState({
            listaDeAlumnos: codigo
        });
        console.log("hola 63")
    }

    /*Tabla info de Alumno */
    tblAlumnos() {
        return (
            <table className="table table-striped">
                <thead>
                    <tr>
                        {this.encabezadoDeTabla(["", "Doc. Nro.", "Apellido", "Nombre",
                            "Dirección", "Teléfono", "e-Mail"])
                        }
                    </tr>
                </thead>
                <tbody>
                    {this.state.listaDeAlumnos.map(alumno => this.infoAlumnos(alumno))}
                </tbody>
            </table>
        )
    }

    infoAlumno(alumno) {
        const rowDatosAlumno = (
            <tr key={alumno.dniNro()}>
                <td>{alumno.dniNro()}</td>
                <td>{alumno.apellido()}</td>
                <td>{alumno.nombre()}</td>
                <td>{alumno.direccion()}</td>
                <td>{alumno.telefono()}</td>
                <td>{alumno.email()}</td>
            </tr>
        )
        return rowDatosAlumno
    }

    /** Encabezado de la Tabla */
    encabezadoDeTabla(titulos) {
        return titulos.map((titulo, ix) => (<th key={ix}>{titulo}</th>))
    }
    /** Filas - Tabla */
    datoEnFila(label, valor, anchoLabel = 3) {
        return (
            <div className="row" style={{ marginBottom: "6px" }}>
                <div className={"col-md-" + anchoLabel} style={{ fontWeight: "bold" }}>{label}</div>
                <div className={"col-md-" + (12 - anchoLabel)}>{valor}</div>
            </div>
        )
    }
    // Botón -  parámetro con valor por defecto
    botonStandard(label, accion, clasesAdicionales = "btn-info") {
        return (
            <button className={"btn " + clasesAdicionales} style={{ marginRight: "12px" }} onClick={accion}>
                {label}
            </button>
        )
    }  
}    
    
/***********************************************
    Botonera
***********************************************/
// cargo de lodash solamente lo que uso
const defaultTo = require('lodash.defaultto')
    
class Botonera extends React.Component {
    render() {
        return (
            <div className="row" style={{ marginTop: this.margenSuperior() }}>
                <div className="col-md-12">
                    {this.props.children}
                </div>
            </div>
        )
    }

    margenSuperior() { return defaultTo(this.props.marginTop, this.margenSuperiorDefault()) }

    margenSuperiorDefault() { return "30px" }
}
module.exports.Botonera = Botonera
module.exports.ListarAlumnos = ListarAlumnos
