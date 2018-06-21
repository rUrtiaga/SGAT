const React = require('react')
const axios = require('axios')

class MuestraTalleres extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            categoria:"",
            talleres: ["Ninguno"]
        }
    }

    componentDidMount() {
        const self = this
        this.setState({categoria: this.props.padre.state.categoria})
        axios.get('api1/talleres'+this.state.categoria)
            .then((respuesta) => self.setState({talleres: respuesta.data}))
    }


    render() {
        return (
            <div className='col'>
                <select
                    className="form-control"
                    onChange={this.manejarSeleccion.bind(this)} id="categorias">{this.desplegarTalleres()}
                </select>
            </div>
        )
    }

    manejarSeleccion(event) {
        this.setState({seleccionada: event.target.value})
        this.props.padre.setState({taller: event.target.value})
    }

    desplegarTalleres() {
        return this.state.talleres.map(c => <option key={c} value={c}>{c}</option>)
    }
}

exports.MuestraTalleres = MuestraTalleres