const React = require('react')

/***********************************************
    Alumnos
 ***********************************************/
class Alumno {
    constructor(dni, nombre, apellido, fechaNac, direccion, telPrincipal, telSecundario, mail, comentario) {
        this._dni = dni
        this._nombre = nombre
        this._apellido = apellido
        this._fechaNac = fechaNac
        this._direccion = direccion
        this._telPrincipal = telPrincipal
        this._telSecundario = telSecundario
        this._mail = mail
        this._comentario = comentario
    }

    /******************************
      *      Setters y getters
    ******************************/

    setDni(dni) { this._dni = dni }
    getDni() { return this._dni }

    setApellido(apellido) { this._apellido = apellido }
    getApellido() { return this._apellido }

    setNombre(nombre) { this._nombre = nombre }
    getNombre() { return this._nombre }

    setFechaNac(fechaNac) { this._fechaNac = fechaNac }
    getFechaNac() { return this._fechaNac }

    setDireccion(direccion) { this._direccion = direccion }
    getDireccion() { return this._direccion }

    setTelPrincipal(telPrincipal) { this._telPrincipal = telPrincipal }
    getTelPrincipal() { return this._telPrincipal }

    setTelSecundario(telSecundario) { this._telSecundario = telSecundario }
    getTelSecundario() { return this._telSecundario }

    setMail(mail) { this._mail = mail }
    getMail() { return this._mail }

    setComentario(comentario) { this._comentario = comentario }
    getComentario() { return this._comentario }
}
const juan = new Alumno("12345281", "Juan", "Perez", "100359", "Laprida 44", "452345", "451234", "jperez@yopmail", "nada")
const pedro = new Alumno("11280292", "Pedro", "Perez", "120664", "Saavedra 344", "454567", "452345", "pedro.perez@yopmail", "otro")
const jose = new Alumno("13245213", "Jose", "Alvarez", "210865", "Paso 440", "457890", "453456", "jalvarez@topmail", "hola")
const ana = new Alumno("21451224", "Ana", "Alvarez", "240973", "Paso 460", "450987", "454567", "anaalvarez@topmail", "bue")
const lili = new Alumno("21245235", "Liliana", "Castelli", "291178", "Paz 840", "452460", "450000", "lilicas@hopmail", "Profe")
const lista = [juan, pedro, jose, ana, lili]

/***********************************************
 Alumnos
    ***********************************************/
/* lista de Alumnos*/
class ListarAlumnos extends React.Component {
    constructor(props) {
        super(props)
        this.state = { listaDeAlumnos:[], indexAlumno: null }
    }
    

    componentDidMount() { this.setState({ listaDeAlumnos: lista }) }    

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
                                    {this.botonStandard("Imprimir", () => this.imprimirAlumnos())}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }   
    
    imprimirAlumnos() { 
        console.log(lista)
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
                    {this.state.listaDeAlumnos.map( alum => this.infoAlumnos(alum))}
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
                <td>{alumno.getApellido()}</td>
                <td>{alumno.getNombre()}</td>
                <td>{alumno.getTelPrincipal()}</td>
                <td>{alumno.getMail()}</td>
                
                <td>{this.botonDetalle(alumno)}</td>
                <td>{this.botonEliminar(alumno)}</td>
            
            </tr>
        )
        return rowDatosAlumno
    }

    eliminarAlumno(alumno) {
        let codigo = this.state.listaDeAlumnos.filter((alu) => alu.getDni() !== alumno.getDni());
        this.setState({
            listaDeAlumnos: codigo
        })
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
    botonEliminar(alumno) {
        return (

            <button className="btn btn-danger btn-xs" onClick={() => this.eliminarAlumno(alumno)}>
                      
                <span className="fa fa-times-circle"> Eliminar </span>
            </button>

        )
    }
    botonDetalle(alumno) {
        return (
            <button className="btn btn-info btn-xs" onClick={() => this.mostrarDatosAlumno(alumno)}>

                <span className="fa fa-info"> Info  </span> 

            </button>
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

module.exports.ListarAlumnos = ListarAlumnos
