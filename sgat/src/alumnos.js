const React = require('react')

// cargo de lodash solamente lo que uso
//const defaultTo = require('lodash.defaultto')


/***********************************************
    Pantallas
 ***********************************************/
//    const pantallas = {
//            muestraTalleres: 1, nuevoTaller: 2, nuevoCurso: 3, nuevoAlumno: 4
//    }


/***********************************************
    Alumnos
 ***********************************************/
/*Crear un Alumno*/
class CrearAlumno extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            docNro: "", apellido: "", nombre: "",
            direccion: "", telefono: "", email: "",
            listaDeAlumnos: [], agregaAlumno: true
        }
        this._ultimaAccion = null
    }
    render() {
        return (
            <div>
                <div className="m-4 container-fluid recuadroPantalla">
                    <div className="row">
                        <div className="col-md-11">
                            <div className="card text-dark">
                                <div className="card-header bg-primary text-white">
                                    <h3>Alumnos</h3>
                                </div>
                                <div className="card-body text-dark">
                                    <div className="row">
                                        <div className="col-md-12">
                                            {this.tblAlumnos()}
                                        </div>
                                    </div>
                                    <Botonera>
                                        {this.botonStandard("Nuevo Alumno", () => this.agregarAlumno())}
                                    </Botonera>
                                </div>
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
module.exports.CrearAlumno = CrearAlumno