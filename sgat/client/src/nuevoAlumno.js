const React = require("react");
const axios = require("axios");
const { InputPersona } = require("./componentesComunes/inputPersona.jsx");

const {Selector} = require('./componentesComunes/selector.jsx')

class NuevoAlumno extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectorCursoOculto: false,
      inputPersonaOculto: false,
      persona: {},
      curso: null
    };
  }

  render() {
    return (
      <div className="container">
        <h3 className="mt-4 mb-4">Nueva Inscripcion</h3>

        <Selector padre={this}/>
        
        {this.state.inputPersonaOculto ? null : (
          <InputPersona
            id="inputPersona"
            persona={this.state.persona}
            padre={this}
            onCancel={this.cancel}
            onAccept={this.acceptPersona.bind(this)}
          />
        )}
      </div>
    );
  }

  //this.InputPersona.state
  cancel() {
    this.limpiar();
  }

  acceptPersona() {
      console.log(this)
    this.setState({ inputPersonaOculto: true });
  }

  limpiar() {
    this.setState({ curso: null });
  }

  aceptarAlumno() {}
}

exports.NuevoAlumno = NuevoAlumno;
