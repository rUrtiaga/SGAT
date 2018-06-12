const React = require('react')
const axios = require('axios')

/***********************************************
 Alumnos
***********************************************/
/* lista de Alumnos */
class ListarAlumnos extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cupo: null,
            listaDeAlumnosKey:[],
            listaDeAlumnos:[]}
    }
    
    componentDidMount() { 
        this.getDataCurso()
    }    

    getDataCurso(){
        //provisoriamente se codea esta 
        let self = this
        axios.get( '/api/talleres/Ceramica/subcategorias/Normal/cursos')
        .then(function(response){
            const json = JSON.parse(response.data)
            self.setState({
                listaDeAlumnosKey: json[0]._alumnos,
                cupo: json[0]._cupo
            })
            return Promise.resolve(json[0]._alumnos)
        })
        .then(function(lAlumnosDni){
            self.getAlumnos(lAlumnosDni)
        })
        .catch(function (error) {
            console.log(error)
        })
    }

    getAlumnos(lAlumnosDni){
        let self = this
        lAlumnosDni.forEach(key => {
            axios.get('/api/personas/'+ key)
            .then(function (response) {
                let alumno = {
                    dni: response.data._dni,
                    nombre: response.data._nombre, apellido: response.data._apellido, 
                    telPrincipal: response.data._telPrincipal, telSecundario: response.data._telSecundario,
                    mail: response.data._mail}
                self.setState({
                    listaDeAlumnos: [...self.state.listaDeAlumnos,alumno]
                })  
            })
            .catch(function(error){
                console.log(error)
            })
        }); 
    }

    render() {
        return (
            <div>
                <div className="m-4 container-fluid recuadroPantalla">
                    <div className="row">
                        <div className="col-md-11">
                            <div className="card text-dark">
                                <div className="align-self-center card-header bg-info text-white">  
                                    <h3> Curso </h3></div>
                                    <div className="card-bg-info bg-primary text-white">
                                        <h4>Alumnos</h4>
                                    </div>
                                    <div className="card-body text-dark">
                                        <div className="row">
                                            <div className="col-md-12">
                                                {this.tblAlumnos()}
                                            </div>
                                        </div>
                                        {this.botonStandard("Imprimir", () => this.imprimirAlumnos(), "btn-success")}
                                    </div>
                                    <h4> Alumnos Registrados </h4>
                                </div>    
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }   
    
    imprimirAlumnos() { 
    }

    /*Tabla info de Alumno */
    tblAlumnos() {
        return (
            <table className="table table-striped">
                <thead>
                    <tr>
                        {this.encabezadoDeTabla(["Doc. Nro.", "Apellido", "Nombre",
                            "Teléfono", "e-Mail"])
                        }
                    </tr>
                </thead>
                <tbody>
                    {this.state.listaDeAlumnos.map( alum => this.infoAlumnos(alum))
                    }
                </tbody>
            </table>
        )
    }
    
    /*Acá completo la tabla con la info de Alumno */
    // dni, nombre, apellido, fechaNac, direccion, telPrincipal, telSecundario, mail, comentario
    infoAlumnos(alumno) {
        const rowDatosAlumno = (
            <tr key={alumno.dni}>
                <td>{alumno.dni}</td>
                <td>{this.linkInfoAlumno(alumno)}</td>
                <td>{alumno.nombre}</td>
                <td>{alumno.telPrincipal}</td>
                <td>{alumno.mail}</td>
                <td>{this.botonDetalle(alumno)} 
                {this.botonEliminar(alumno)}</td>
            </tr>
        )
        return rowDatosAlumno
    }

    /** --- Link para Info del Alumno ---  */
    linkInfoAlumno(alumno) {
        return (
            <a onClick={() => this.mostrarDatosAlumno(alumno)}>{alumno.apellido}</a>
        )
    }
    mostrarDatosAlumno(unAlumno) {
        console.log(unAlumno);
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

    /** ---   Botones   --- */
    botonDetalle(alumno) {
        return (
            <button className="btn btn-info btn-xs ml-1 mr-2" onClick={() => this.mostrarDatosAlumno(alumno)}>
                <span className="fa fa-info"> Info  </span>
            </button>
        )
    }
    botonEliminar(alumno) {
        return (
            <button className="btn btn-danger btn-xs" onClick={() => this.eliminarAlumno(alumno)}>
                <span className="fa fa-times-circle"> Eliminar </span>
            </button>
        )
    }
    eliminarAlumno(alumno) {
        let codigo = this.state.listaDeAlumnos.filter((alu) => alu.dni !== alumno.dni);
        this.setState({
            listaDeAlumnos: codigo
        })
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

module.exports.ListarAlumnos = ListarAlumnos
