const React = require("react");
const axios = require("axios");
const { AceptarYCancelar } = require("./botones.jsx");

class InputPersona extends React.Component {
  constructor(props) {
    super(props);
    this._persona = this.props.persona;
    this.state = {
      dni: this._persona._dni,
      nombre: this._persona._nombre,
      apellido: this._persona._apellido,
      direccion: this._persona._direccion,
      telPrincipal: this._persona._telPrincipal,
      telSecundario: this._persona._telSecundario,
      mail: this._persona._mail,
      comentario: this._persona._comentario
    };
  }

  handleChange(event) {
    try {
      // this.validate(event.target.name,event.target.value)
      this.setState({
        [event.target.name]: event.target.value
      });
    } catch (error) {
      console.log(error);
    }
  }

  handleDNI(event) {
    this.limpiar();
    this.handleChange(event);
    this.request(event.target.value);
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
      direccion: persona._direccion,
      telPrincipal: persona._telPrincipal,
      telSecundario: persona._telSecundario,
      mail: persona._mail,
      comentario: persona._comentario
    });
  }

  //esto no va, pero lo dejo por que es algo similar a lo que se va a validar
  // validate(nameEvent,value){
  //     switch (nameEvent) {
  //         case 'dni':
  //             if(value > 100000000){
  //                 throw new Error('El dni ingresado es demasiado alto')
  //             }
  //             if(value.toString().match(/[^0-9]+$/) ){
  //                 throw new Error('Ingrese solo numeros')
  //             }
  //             break;

  //         default:
  //             break;
  //     }
  // }

  render() {
    return (
      <React.Fragment>
        <div className="form-group">
          <div className="form-row">
            <div className="col">
              <label htmlFor="name">D.N.I.</label>
              <input
                type="text"
                className="form-control"
                name="dni"
                placeholder="D.N.I."
                value={this.state.dni}
                onChange={event => this.handleDNI(event)}
              />
              <small id="dniHelp" className="form-text text-muted">
                Ingrese el DNI sin puntos.
              </small>
            </div>
          </div>
        </div>

        <div className="form-group">
          <div className="form-row">
            <div className="col">
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                className="form-control"
                name="nombre"
                placeholder="introduzca Nombre"
                value={this.state.nombre}
                onChange={event => this.handleChange(event)}
              />
            </div>
            <div className="col">
              <label htmlFor="lastname">Apellido</label>
              <input
                type="text"
                className="form-control"
                name="apellido"
                placeholder="introduzca Apellido"
                value={this.state.apellido}
                onChange={event => this.handleChange(event)}
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <h4 className="mt-4 mb-4" htmlFor="contact">
            Contacto
          </h4>

          <div className="form-group">
            <label htmlFor="direc">Dirección</label>
            <input
              type="text"
              className="form-control"
              name="direccion"
              placeholder="ingrese direccion"
              value={this.state.direccion}
              onChange={event => this.handleChange(event)}
            />
          </div>
          <div className="form-row">
            <div className="col">
              <label htmlFor="pPhone">Telefono Principal</label>
              <input
                type="number"
                className="form-control"
                name="telPrincipal"
                placeholder="formato: 0224345XXXX"
                value={this.state.telPrincipal}
                onChange={event => this.handleChange(event)}
              />
            </div>
            <div className="col">
              <label htmlFor="sPhone">Secundario</label>
              <input
                type="number"
                className="form-control"
                name="telSecundario"
                placeholder="formato: 0224345XXXX"
                value={this.state.telSecundario}
                onChange={event => this.handleChange(event)}
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="exampleFormControlInput1">Correo Electronico</label>
          <input
            type="email"
            className="form-control"
            name="mail"
            placeholder="nombre@dominio.com"
            value={this.state.mail}
            onChange={event => this.handleChange(event)}
          />
        </div>

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
          aceptar={() => this.aceptarPersona()}
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
      apellido: "",
      direccion: "",
      telPrincipal: "",
      telSecundario: "",
      mail: "",
      comentario: ""
    });
  }

  aceptarPersona() {
    let self = this
    const persona = {
      _dni: parseInt(this.state.dni, 10),
      _nombre: this.state.nombre,
      _apellido: this.state.apellido,
      _direccion: this.state.direccion,
      _telPrincipal: this.state.telPrincipal,
      _telSecundario: this.state.telSecundario,
      _mail: this.state.mail,
      _comentario: this.state.comentario
    };
    if (!this.state.id) {
      axios
        .post("/api/personas", persona)
        .then(function(response) {
          //   console.log(response);
          // console.log(response.data.insertedIds);
          if (self.props.onAccept) {
            persona._id = response.data.insertedIds[0]
            self.props.onAccept(persona);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    } else {
      if (self.props.onAccept) {
        persona._id = this.state.id
        self.props.onAccept(persona);
      }
    }
    return persona;
  }
}

exports.InputPersona = InputPersona;