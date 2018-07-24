
const React = require("react");
const axios = require("axios");

class MuestraCategorias extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categorias: []
    };
  }

  componentDidMount() {
    this.request()
  }

  request(){
    const self = this;
    return axios
      .get("api/categorias")
      .then(respuesta => {
        let catSinId = respuesta.data.map(c=> c._categoria)
        self.setState({ categorias: catSinId })
        //self.props.padre({categorias: self.state.categorias})
      })
      .then(()=>this.props.seleccionar(this.state.categorias[0]))
  }


  render() {
    return (
      <div className="col">
        <select
          className="form-control"
          onChange={this.manejarSeleccion.bind(this)}
          id="categorias">
          {this.desplegarCategorias()}
        </select>
      </div>
    );
  }

  manejarSeleccion(event) {
    this.props.seleccionar(event.target.value) 
  }

  desplegarCategorias() {
    let categorias =  (this.props.categorias)? [...this.state.categorias,...this.props.categorias]: this.state.categorias
    return categorias.map(c => (
      <option key={c} value={c}>
        {c}
      </option>
    ));
  }
}

exports.MuestraCategorias = MuestraCategorias;

