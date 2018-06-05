// import {Persona} from "../../server/dominio/dominio-talleres"   // no funciona porque el server esta fuera del alcance

const React = require('react')
const axios = require('axios')

/***********************************************
    Alumnos
 ***********************************************/

 //Esta clase se esta usando desde aca, se deberia importar la Persona de dominio,
// class Persona {
//     constructor(dni, nombre, apellido, fechaNac, direccion, telPrincipal, telSecundario, mail, comentario) {
//         this._dni = dni
//         this._nombre = nombre
//         this._apellido = apellido
//         this._fechaNac = fechaNac
//         this._direccion = direccion
//         this._telPrincipal = telPrincipal
//         this._telSecundario = telSecundario
//         this._mail = mail
//         this._comentario = comentario
//     }

//     /******************************
//       *      Setters y getters
//     ******************************/

//     setDni(dni) { this._dni = dni }
//     getDni() { return this._dni }

//     setApellido(apellido) { this._apellido = apellido }
//     getApellido() { return this._apellido }

//     setNombre(nombre) { this._nombre = nombre }
//     getNombre() { return this._nombre }

//     setFechaNac(fechaNac) { this._fechaNac = fechaNac }
//     getFechaNac() { return this._fechaNac }

//     setDireccion(direccion) { this._direccion = direccion }
//     getDireccion() { return this._direccion }

//     setTelPrincipal(telPrincipal) { this._telPrincipal = telPrincipal }
//     getTelPrincipal() { return this._telPrincipal }

//     setTelSecundario(telSecundario) { this._telSecundario = telSecundario }
//     getTelSecundario() { return this._telSecundario }

//     setMail(mail) { this._mail = mail }
//     getMail() { return this._mail }

//     setComentario(comentario) { this._comentario = comentario }
//     getComentario() { return this._comentario }
// }

/***********************************************
 Alumnos
    ***********************************************/
/* lista de Alumnos*/
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
        let self = this
        axios.get('/api/cursos/0')
        .then(function(response){
            const json = JSON.parse(response.data)
            self.setState({
                listaDeAlumnosKey: json._alumnos,
                cupo: json._cupo
            })
            console.log(json._alumnos +" Cupo " + json._cupo)
            return Promise.resolve(json._alumnos)
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
                let alumno = new Persona(response.data._dni, 
                    response.data._nombre, response.data._apellido, 
                    response.data._telPrincipal)
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
            <tr key={alumno.getDni()}>
                <td>{alumno.getDni()}</td>
                <td>{this.linkInfoAlumno(alumno)}</td>
                <td>{alumno.getNombre()}</td>
                <td>{alumno.getTelPrincipal()}</td>
                <td>{alumno.getMail()}</td>
                
                <td>{this.botonDetalle(alumno)} 
                {this.botonEliminar(alumno)}</td>
            </tr>
        )
        return rowDatosAlumno
    }

    /** --- Link para Info del Alumno ---  */
    linkInfoAlumno(alumno) {
        return (
            <a href="#" onClick={() => this.mostrarDatosAlumno(alumno)}>{alumno.getApellido()}</a>
        )
    }
    mostrarDatosAlumno(unAlumno) {
        console.log(unAlumno.getApellido());
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
            <button className="btn btn-info btn-xs ml-1 mr-1" onClick={() => this.mostrarDatosAlumno(alumno)}>
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
        let codigo = this.state.listaDeAlumnos.filter((alu) => alu.getDni() !== alumno.getDni());
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
