const React = require("react");
const axios = require("axios");
const { AceptarYCancelar } = require("./botones.jsx");
const { Input } = require("../componentesComunes/Input.jsx");
const { validate } = require("../validateRegex.js");

class InputPersona extends React.Component {
  constructor(props) {
    super(props);
    this._persona = this.props.persona;
    this.minCaracteres = 6;
    this.state = {
      dni: this._persona._dni,
      nombre: this._persona._nombre,
      fechaNac: this._persona._fechaNac,
      apellido: this._persona._apellido,
      direccion: this._persona._direccion,
      telPrincipal: this._persona._telPrincipal,
      telSecundario: this._persona._telSecundario,
      mail: this._persona._mail,
      comentario: this._persona._comentario,
      formErrors: {}
    };
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;

    switch (fieldName) {
      case "mail":
        let emailValid = validate.email(value);
        fieldValidationErrors.mail = emailValid
          ? undefined
          : "Correo no valido, ingreselo sin espacios y respetando la convension";
        break;
      case "dni":
        let dniValid = validate.dni(value);
        fieldValidationErrors.dni = dniValid
          ? undefined
          : "D.N.I. no valido, ingrese el dni sin puntos, comas o espacios";
        break;
      case "nombre":
        fieldValidationErrors.nombre = validate.sinNumeros(value)
          ? undefined
          : "nombre no valido";
        break;
      case "apellido":
        fieldValidationErrors.apellido = validate.sinNumeros(value)
          ? undefined
          : "apellido no valido";
        break;
      case "telPrincipal":
        fieldValidationErrors.telPrincipal = validate.soloNumeros(value)
          ? undefined
          : "telefono no valido";
        break;
      case "telSecundario":
        fieldValidationErrors.telSecundario = validate.soloNumeros(value)
          ? undefined
          : "telefono no valido";
        break;
      default:
        break;
    }
    this.setState({ formErrors: fieldValidationErrors });
  }

  formValid() {
    return this.requiredFields() && !this.formErrors();
  }

  formErrors() {
    const allerrormsg = Object.keys(this.state.formErrors).map(
      key => this.state.formErrors[key]
    );
    let result = false;
    for (let index = 0; index < allerrormsg.length; index++) {
      let emsg = allerrormsg[index];
      result = result || !!emsg;
    }
    return result;
  }

  //Devuelve verdadero (trusty) si los campos requeridos estan completos
  requiredFields() {
    return (
      this.state.dni &&
      this.state.nombre &&
      this.state.apellido &&
      this.state.mail &&
      this.state.fechaNac
    );
  }

  handleChange(event) {
    try {
      const name = event.target.name;
      const value = event.target.value;
      this.setState(
        {
          [name]: value
        },
        () => this.validateField(name, value)
      );
    } catch (error) {
      console.log(error);
    }
  }

  handleDNI(event) {
    this.limpiar();
    this.handleChange(event);
    if (event.target.value.length > this.minCaracteres) {
      this.request(event.target.value);
    }
  }

  request(value) {
    let self = this;
    return axios
      .get("/api/personas?dni=" + value)
      .then(function(response) {
        if (response.data._dni) {
          self.llenarPersona(response.data);
        }
        return Promise.resolve();
      })
      .catch(error => console.log(error));
  }

  llenarPersona(persona) {
    this.setState({
      id: persona._id,
      dni: persona._dni,
      nombre: persona._nombre,
      apellido: persona._apellido,
      fechaNac: this.toDateUI(persona._fechaNac),
      direccion: persona._direccion,
      telPrincipal: persona._telPrincipal,
      telSecundario: persona._telSecundario,
      mail: persona._mail,
      comentario: persona._comentario
    });
  }

  toDateUI(isoDate) {
    return isoDate.slice(0, isoDate.indexOf("T"));
  }

  render() {
    return (
      <React.Fragment>
        <div className="form-group">
          <h4 className="mt-4 mb-4" htmlFor="contact">
            Datos de la Persona
          </h4>
          <div className="form-row">
            <Input
              divClass="col-12 col-md-6"
              htmlFor="dni"
              label="D.N.I."
              type="number"
              name="dni"
              value={this.state.dni}
              onChange={event => this.handleDNI(event)}
              errorMsg={this.state.formErrors.dni}
              min="1000000"
              max="99999999"
            />
            <Input
              divClass="col-12 col-md-6"
              label="Fecha de Nacimiento"
              htmlFor="date"
              type="date"
              name="fechaNac"
              value={this.state.fechaNac}
              onChange={event => this.handleChange(event)}
              errorMsg={this.state.formErrors.fechaNac}
              min={this.fecha(130)}
              max={this.fecha(3)}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="form-row">
            <Input
              divClass="col-12 col-md-6"
              label="Nombre"
              htmlFor="name"
              type="text"
              name="nombre"
              value={this.state.nombre}
              onChange={event => this.handleChange(event)}
              errorMsg={this.state.formErrors.nombre}
            />
            <Input
              divClass="col-12 col-md-6"
              label="Apellido"
              type="text"
              name="apellido"
              placeholder="introduzca Apellido"
              value={this.state.apellido}
              onChange={event => this.handleChange(event)}
              errorMsg={this.state.formErrors.apellido}
            />
          </div>
        </div>
        <div className="form-group">
          <h5 className="mt-4 mb-4" htmlFor="contact">
            Contacto
          </h5>

          <Input
            label="Dirección"
            type="text"
            name="direccion"
            placeholder="ingrese dirección"
            value={this.state.direccion}
            onChange={event => this.handleChange(event)}
            errorMsg={this.state.formErrors.direccion}
          />
          <div className="form-row">
            <Input
              divClass="col-12 col-md-6"
              label="Teléfono Principal"
              type="number"
              name="telPrincipal"
              placeholder="formato: 0224345XXXX"
              value={this.state.telPrincipal}
              onChange={event => this.handleChange(event)}
              errorMsg={this.state.formErrors.telPrincipal}
            />
            <Input
              divClass="col-12 col-md-6"
              label="Teléfono Secundario"
              type="number"
              name="telSecundario"
              placeholder="formato: 0224345XXXX"
              value={this.state.telSecundario}
              onChange={event => this.handleChange(event)}
              errorMsg={this.state.formErrors.telSecundario}
            />
          </div>
        </div>
        <Input
          label="Correo electrónico"
          htmlFor="mail"
          type="email"
          name="mail"
          value={this.state.mail}
          onChange={event => this.handleChange(event)}
          errorMsg={this.state.formErrors.mail}
        />
        <div className="form-group">
          <label htmlFor="exampleFormControlTextarea1">Comentario</label>
          <textarea
            className="form-control"
            name="comentario"
            rows="3"
            value={this.state.comentario}
            onChange={event => this.handleChange(event)}
          />
        </div>
        <AceptarYCancelar
          acceptText={"Aceptar"}
          cancelText={"Cancelar"}
          disabled={!this.formValid()}
          aceptar={alert => this.aceptarPersona(alert)}
          cancelar={() => this.cancel()}
        />
      </React.Fragment>
    );
  }

  cancel() {
    this.limpiar();
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  }

  limpiar() {
    this.setState({
      id: "",
      dni: "",
      nombre: "",
      fechaNac: "",
      apellido: "",
      direccion: "",
      telPrincipal: "",
      telSecundario: "",
      mail: "",
      comentario: ""
    });
  }

  fecha(resta) {
    let fecha = new Date();
    let anioRestado = fecha.getFullYear() - resta;
    return anioRestado + "-" + "01" + "-" + "01";
  }

  aceptarPersona(alert) {
    let self = this;
    const persona = {
      _dni: parseInt(this.state.dni, 10),
      _nombre: this.state.nombre,
      _apellido: this.state.apellido,
      _fechaNac: new Date(this.state.fechaNac),
      _direccion: this.state.direccion,
      _telPrincipal: this.state.telPrincipal,
      _telSecundario: this.state.telSecundario,
      _mail: this.state.mail,
      _comentario: this.state.comentario
    };
    if (!this.state.id) {
      return axios
        .post("/api/personas", persona)
        .then(function(response) {
          persona._id = response.data.insertedIds[0];
          self.props.onAccept(persona);
          alert.success(
            "Se creó correctamente " + persona._apellido + " " + persona._nombre
          );
        })
        .catch(function(error) {
          let listErrors = error.response.data.listElementos;
          alert.error(
            "Falló al crear " + persona._apellido + " " + persona._nombre
          );
          alert.error(
            error.response.data.message
          )
          if (listErrors) {
            listErrors.forEach(campoError => {
              alert.error("Campo " + campoError + " no es valido.");
            });
          }
        });
    } else {
      persona._id = this.state.id;
      self.props.onAccept(persona);
    }
  }
}

exports.InputPersona = InputPersona;
