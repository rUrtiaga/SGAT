const React = require('react')
// const axios = require('axios')

// const formattedDate = Moment(date).format("LL");
// Outputs as "February 17, 2017"


class InfoPersona extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            infoDePersona: false
        }
        this.alum = this.props.data
    }

    render(){
        return(
            <div className="col-md-12">
                <div className="card text-dark">
                    <div className="align-self-center card-bg-info bg-primary text-white col-md-10 ">  
                        <label htmlFor="name">Datos del Alumno : </label>  
                            {this.alum._apellido}
                            {this.recuadroInfoAlumno()}   
                    </div>
                </div>
            </div>
        )
    }  
    recuadroInfoAlumno() {
        const anchoLabel = 60
        return (
            <div style={{
                marginTop: "20px",
                borderStyle: "solid", borderWidth: "2px", borderColor: "black", borderRadius: "6px",
                paddingTop: "6px", paddingBottom: "20px", paddingLeft: "30px", paddingRight: "30px"
            }}>
                {this.datoEnFila("Apellido  : ", this.alum._apellido, anchoLabel)}
                {this.datoEnFila("Nombre :  ", this.alum._nombre, anchoLabel)}
                {this.datoEnFila("D.N.I. :  ", this.alum._dni, anchoLabel)}
                {this.datoEnFila("Fecha Nac. :  ", this.alum._fechaNac, anchoLabel)}
                {this.datoEnFila("Dirección. :  ", this.alum._direccion, anchoLabel)}
                {this.datoEnFila("Teléfono Ppal. :  ", this.alum._telPrincipal, anchoLabel)}
                {this.datoEnFila("Teléfono Sec. :  ", this.alum._telSecundario, anchoLabel)}
                {this.datoEnFila("Mail :  ", this.alum._mail, anchoLabel)}
            </div>
        )
    }
    datoEnFila(label, valor, anchoLabel = 40) {
        return (
            <div className="row" style={{ marginBottom: "6px" }}>
                <div className={"col-md-" + anchoLabel} style={{ fontWeight: "bold" }}>{label}</div>
                <div className={"col-md-" + (12 - anchoLabel)}>{valor}</div>
            </div>
        )
    }
    
}

exports.InfoPersona = InfoPersona

