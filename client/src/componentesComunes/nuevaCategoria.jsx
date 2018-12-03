const React = require("react");
const axios = require("axios");

class NuevaCategoria extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nombreCategoria: ""
    };
  }

  render() {
    return (
      <div className="card mt-sm-2 mt-2 mb-2">
        <div className="form-row m-2">
          <div className="col-md-12">
            <label htmlFor="nombreCategoria">
              Nombre de la nueva Categoria
            </label>
          </div>
          <div className="col-md-8">
            <input
              type="text"
              className="form-control"
              id="nombreCategoria"
              placeholder="introduzca El Nombre de la Categoria"
              value={this.state.nombreCategoria}
              onChange={event =>
                this.setState({ nombreCategoria: event.target.value })
              }
            />
          </div>
          <div className="col-md-1">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => this.agregarCategoria()}
            >
              <span className="fa fa-save"> </span>
            </button>
          </div>

          <div className="col-md-1">
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => this.cancelarAgregado()}
            >
              <span className="fa fa-undo"> </span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  agregarCategoria() {
    const self = this;
    axios
      .post("api/categorias", { categoria: self.state.nombreCategoria })
      .then(function(res) {
        console.log("se agrego la categoria " + self.state.nombreCategoria);
      })
      .catch(error => {
        console.log(error);
      });

    this.props.padre.setState({
      agregaCategoria: false,
      agregadoUnico: true,
      categoria: self.state.nombreCategoria,
      categorias: [
        ...this.props.padre.state.categorias,
        self.state.nombreCategoria
      ]
    });
  }

  cancelarAgregado() {
    this.setState.nombreCategoria = "";
    this.props.padre.setState({ agregaCategoria: false });
  }
}

exports.NuevaCategoria = NuevaCategoria;
