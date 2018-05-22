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


const juan = new Alumno("12345280", "Juan", "Perez", "100359", "Laprida 44", "452345", "", "jperez@yopmail", "nada")
const pedro = new Alumno("11280280", "Pedro", "Perez", "120664", "Saavedra 344", "454567", "", "pedro.perez@yopmail", "otro")
const jose = new Alumno("13245280", "Jose", "Alvarez", "210865", "Paso 440", "457890", "", "jalvarez@topmail", "hola")
const ana = new Alumno("21451280", "Ana", "Alvarez", "240973", "Paso 460", "450987", "", "anaalvarez@topmail", "bue")
const lili = new Alumno("21245280", "Liliana", "Castelli", "291178", "Paz 840", "452460", "450000", "lilicas@hopmail", "Profe")
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
                                    <Botonera>
                                        {/* {this.botonStandard("Eliminar Alumno", () => this.eliminarAlumno())} */}
                                        {this.botonStandard("Imprimir", () => this.imprimirAlumnos())}
                                    </Botonera>
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
                        {this.encabezadoDeTabla(["", "Doc. Nro.", "Apellido", "Nombre",
                            "Dirección", "Teléfono", "e-Mail"])
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
                <td>{this.botonDetalle(alumno)}</td>
                <td>{alumno.getDni()}</td>
                <td>{alumno.getApellido()}</td>
                <td>{alumno.getNombre()}</td>
                <td>{alumno.getDireccion()}</td>
                <td>{alumno.getTelPrincipal()}</td>
                <td>{alumno.getMail()}</td>
                <td>{this.botonEliminar(alumno)}</td>
            </tr>
        )
        return rowDatosAlumno
    }
    
    eliminarAlumno() {
        // let codigo = this.state.listaDeAlumnos.filter((alum) => alum.dniNro !== alum.dniNro);
        // this.setState({
        //     listaDeAlumnos: codigo
        // });
        console.log("Eliminar Linea 90")
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
    /** ---   Botones   --- */
    botonEliminar(alumno) {
        return (
            <button className="btn btn-danger btn-xs" onClick={() => this.mostrarDatosAlumno(alumno)}>
                Eliminar
        </button>
        )
    }
    botonDetalle(alumno) {
        return (
            <button className="btn btn-info btn-xs" onClick={() => this.mostrarDatosAlumno(alumno)}>
                Detalle
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

module.exports.ListarAlumnos = ListarAlumnos
