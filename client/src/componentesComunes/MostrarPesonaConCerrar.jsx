const React = require("react");

class MostrarPersona extends React.Component {
  constructor(props) {
    super(props);
    let persona = this.props.persona;
    this.state = {
      persona: persona
    };
  }

  render() {
    return (
      <React.Fragment>
        <label>
          {this.state.persona._nombre + " " + this.state.persona._apellido}
        </label>
        <button className="btn btn-link" onClick={this.props.delete}>
          <span className={"fa fa-close"} />
        </button>
      </React.Fragment>
    );
  }
}

module.exports.MostrarPersona = MostrarPersona;
