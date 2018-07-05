const React = require('react')

class InfoPersona extends React.Component {
    constructor(props) {
        super(props)
        this.screen = this.props.screen     // con esto seteo la pantalla padre
    }

    alum(){
        return this.props.data
    }
    
    render(){
        return(
            <div className="col-md-12">
                <div className="card text-dark">  
                    {this.recuadroInfoAlumno()}   
                </div>
            </div>
        )
    }  
    
    recuadroInfoAlumno() {
        const anchoLabel = 6
        return (
            <div className="card text-dark">
                <h5 className="card-header">Datos del Alumno : </h5>
                <div className="card-body"> 
                    <div className="align-self-center card-bg-info" style={{
                        marginTop: "20px",
                        borderStyle: "solid", borderWidth: "2px", borderColor: "#e9ecef", borderRadius: "6px",
                        paddingTop: "6px", paddingBottom: "20px", paddingLeft: "30px", paddingRight: "30px"
                    }}>
                        <div className="row">
                            <div className="card-body ">
                            {this.datoEnFila("Apellido  : ", this.alum()._apellido, anchoLabel)}
                            {this.datoEnFila("D.N.I. :  ", this.alum()._dni, anchoLabel)}
                            {this.datoEnFila("Teléfono Ppal. :  ", this.alum()._telPrincipal, anchoLabel)}
                            {this.datoEnFila("Fecha Nac. :  ", this.alum()._fechaNac.substring(0,10), anchoLabel)}
                            {this.datoEnFila("Mail :  ", this.alum()._mail, anchoLabel)}
                            </div>
                            <div className="card-body ">
                            {this.datoEnFila("Nombre :  ", this.alum()._nombre, anchoLabel)}
                            {this.datoEnFila("Dirección. :  ", this.alum()._direccion, anchoLabel)}
                            {this.datoEnFila("Teléfono Sec. :  ", this.alum()._telSecundario, anchoLabel)}
                            {this.datoEnFila("Comentarios :  ", this.alum()._comentario, anchoLabel)}
                            </div>
                        </div>    
                    </div>
                    {this.botonCerrar()}
                </div>
            </div>
        )
    }
    
    datoEnFila(label, valor, anchoLabel = 4) {
        return (
            <div className="row" style={{ marginBottom: "6px" }}>
                <div className={"col-md-" + anchoLabel} style={{ fontWeight: "bold" }}>{label}</div>
                <div className={"col-md-" + (12 - anchoLabel)}>{valor}</div>
            </div>
        )
    }
    
    botonCerrar() {
        return (
            <button className="btn btn-danger btn-xs" onClick={this.screen}>  
                <span className="fa fa-arrow-circle-o-left"> Cerrar </span>
            </button>
        )
    }
}

exports.InfoPersona = InfoPersona

