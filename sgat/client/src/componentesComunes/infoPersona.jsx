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
                <div className="form-group">
                    <div className="form-row">
                        <div className="col">
                            <label htmlFor="name">D.N.I.</label>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        )
    }    
    
}

exports.InfoPersona = InfoPersona

