const React = require("react");

class Input extends React.Component {
  validOrInvalid(msj) {
    return msj ? "is-invalid" : "";
  }


  render() {
    return (
      <div className={this.props.divClass}>
        <label htmlFor={this.props.htmlFor}>{this.props.label}</label>
        <input
          type={this.props.type}
          className={
            "form-control " + this.validOrInvalid(this.props.errorMsg)
          }
          name={this.props.name}
          placeholder={this.props.placeholder || this.props.label}
          value={this.props.value}
          onChange={this.props.onChange}
          min={this.props.min}
          max={this.props.max}
        />
        <div className="valid-feedback">{this.props.textOnValid}</div>
        <div className="invalid-feedback">{this.props.errorMsg}</div>
      </div>
    );
  }
}


exports.Input = Input