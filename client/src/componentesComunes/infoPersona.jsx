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
        const anchoLabel = 5
        return (
            <div className="card text-dark">
                <h5 className="card-header">Datos del Alumno : </h5>
                <div className="row "> 
                    <div className="align-self-center card-bg-info col-md-8" style={{
                        marginTop: "20px", marginLeft: "30px", marginBottom: "20px",
                        borderStyle: "solid", borderWidth: "2px", borderColor: "#e9ecef", borderRadius: "6px",
                        paddingTop: "6px", paddingBottom: "10px", paddingLeft: "40px", paddingRight: "20px"
                    }}>
                        <div className="row">
                            <div className="card-body ">
                            {this.datoEnFila("Apellido  : ", this.alum()._apellido, anchoLabel)}
                            {this.datoEnFila("D.N.I. :  ", this.alum()._dni, anchoLabel)}
                            {this.datoEnFila("Teléfono Ppal. :  ", this.alum()._telPrincipal, anchoLabel)}
                            {this.datoEnFila("Fecha Nac. :  ", this.alum()._fechaNac.substring(0,10), anchoLabel)}
                            {this.datoEnFila("Comentarios :  ", this.alum()._comentario, 12)}
                            </div>
                            <div className="card-body ">
                            {this.datoEnFila("Nombre :  ", this.alum()._nombre, anchoLabel)}
                            {this.datoEnFila("Dirección. :  ", this.alum()._direccion, anchoLabel)}
                            {this.datoEnFila("Teléfono Sec. :  ", this.alum()._telSecundario, anchoLabel)}
                            {this.datoEnFila("Mail :  ", this.alum()._mail, anchoLabel)}
                            </div>
                        </div>
                    </div>      
                    <div className="card-bg-info" style={{
                        marginTop: "20px", marginLeft: "30px", marginBottom: "20px"}}>
                        { this.botonStandard("Cerrar", this.screen, "btn-danger btn-xs", "fa-arrow-circle-o-left") }
                    </div>
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

    // Botón -  parámetros Label , Acción, Clases Adicionales, Icono (GlypIcon)
    botonStandard(label, accion, clasesAdicionales = "btn-info", glypIcon) {
        return (
            <button className={"btn " + clasesAdicionales} style={{ marginRight: "12px" }} onClick={accion}>
                <span className={"fa " + glypIcon}> {label} </span>
            </button>
        )
    }
}

exports.InfoPersona = InfoPersona

