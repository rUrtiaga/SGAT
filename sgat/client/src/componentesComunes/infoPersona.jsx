const React = require('react')
const axios = require('axios')

class InfoPersona extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            infoDePersona: false
        }
    }
   
    render(){
        return(
            <React.Fragment>
                <div className="col-md-12">
                    <div className="card text-dark">
                        <div className="align-self-center card-bg-info bg-primary text-white  ">  
                            <label htmlFor="name">Datos de: </label>
                            {this.props.data.nombre}
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <label>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        )
    }    
    
}

exports.InfoPersona = InfoPersona

