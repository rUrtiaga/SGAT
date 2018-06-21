const React = require('react')
const axios = require('axios')

const infoPersona = require("./componentesComunes/infoPersona.jsx");

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
            listaDeAlumnos:[],
            infoDeAlumno: false }
    }
    
    mostrarTrInfoAlumno() {
        this.setState({
            infoDeAlumno: !this.state.infoDeAlumno
        });
    }
    ocultarTrInfoAlumno() {
        this.setState({ infoDeAlumno: false });
    }

    componentDidMount() { 
        this.getDataCurso()
    }    

    getDataCurso(){
        //provisoriamente se codea esta 
        let self = this
        return axios.get( '/api/talleres/Ceramica/subcategorias/Normal/cursos')
        .then(function(response){
            const json = JSON.parse(response.data)      // para Test hay que comentar esta linea
            // const json = response.data               // para Test hay que descomentar
            self.setState({
                listaDeAlumnosKey: json[0]._alumnos,
                cupo: json[0]._cupo
            })
            return Promise.resolve(json[0]._alumnos)
        })
        .then(function (lAlumnosDni) {
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
                    _dni: response.data._dni,
                    _nombre: response.data._nombre, _apellido: response.data._apellido, 
                    _telPrincipal: response.data._telPrincipal,
                    _mail: response.data._mail}
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
                                <div className="align-self-center card-bg-info bg-primary text-white  ">  
                                    <h3> Acá va el nombre del Curso </h3></div>
                                <div className="card-body text-black">
                                        <h4>Listado de Alumnos</h4>
                                </div>
                                <div className="card-body text-dark">
                                    <div className="row">
                                        <div className="col-md-12">
                                            {this.tblAlumnos()}
                                        </div>
                                    </div>
                                    {this.botonStandard("Imprimir", () => this.imprimirAlumnos(), "btn-success")}
                                </div>
                                <h4> Alumnos Registrados {this.state.listaDeAlumnos.length} de {this.state.cupo}</h4>
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

    /** --- Link para Info del Alumno ---  */
    linkInfoAlumno(alumno) {
        return (
            <a href="#" onClick={() => this.mostrarDatosAlumno(alumno)}>{alumno._apellido}</a>
        )
    }
    mostrarDatosAlumno(unAlumno) {
        console.log(unAlumno);
        console.log(this);
        this.props.infoPersona
        
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
                <span className="fa fa-close"> Eliminar </span>
            </button>
        )
    }
    eliminarAlumno(alumno) {
        let codigo = this.state.listaDeAlumnos.filter((alu) => alu._dni !== alumno._dni);
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
