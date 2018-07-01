const React = require("react");
const { MuestraCategorias } = require("./selectMostrarCategorias.jsx");
const { MuestraTalleres } = require("./selectMostrarTalleres.jsx");
const { MuestraSubCategorias } = require("./selectMostrarSubCategorias.jsx");
const { MuestraCursos } = require("./selectMostrarCursos.jsx");

class Selector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  seleccionMuestraCategorias(valor) {
    this.setState({
      categoria: valor,
      taller: null,
      subCategoria: null,
      curso: null
    });
  }

  seleccionMuestraTalleres(valor, talleres) {
    this.setState({ taller: valor, subCategoria: null, curso: null });
  }

  seleccionSubCategoria(valor) {
    if(this.props.callbackNuevoCurso){
      this.props.callbackNuevoCurso(valor)
    }
    this.setState({ subCategoria: valor, curso: null });
  }

  seleccionCurso(valor) {
    this.props.onSelect(valor);
    this.setState({ curso: valor });
  }

  render() {
    return (
      <div className="mt-3 mb-3">
        <div>
          <h6 className="ml-3">Categoria</h6>
          <MuestraCategorias
            seleccionar={v => this.seleccionMuestraCategorias(v)}
            padre={this}
          />
        </div>

        {this.state.categoria ? (
          <div>
            <h6 className="ml-3 mt-2">Taller</h6>
            <MuestraTalleres
              select={this.state.categoria}
              seleccionar={v => this.seleccionMuestraTalleres(v)}
              padre={this}
            />
          </div>
        ) : null}
        {this.state.taller ? (
          <div>
            <h6 className="ml-3 mt-2">Tipo de curso</h6>
            <MuestraSubCategorias
              categoria={this.state.categoria}
              select={this.state.taller}
              seleccionar={v => this.seleccionSubCategoria(v)}
              padre={this}
            />
          </div>
        ) : null}
        {this.state.subCategoria && !this.props.callbackNuevoCurso ? (
          <div>
            <h6 className="ml-3 mt-2">Cursos</h6>
            <MuestraCursos
              select={this.state.subCategoria}
              seleccionar={v => this.seleccionCurso(v)}
              padre={this}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

exports.Selector = Selector;
