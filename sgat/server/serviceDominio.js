const { dominio } = require("./dominio/dominio-talleres.js");
const {store} = require("./Store.js")

class ServiceDominio {
  agregarPersona(persona) {
    let persona = new dominio.Persona(
      dataPersona._dni,
      dataPersona._nombre,
      dataPersona._apellido,
      dataPersona._fechaNac,
      dataPersona._direccion,
      dataPersona._telPrincipal,
      dataPersona._mail
    );
    persona.setTelSecundario(dataPersona._telSecundario);
    persona.setComentario(dataPersona._comentario);

    store.agregarPersona(persona);
  }
  
}

exports.ServiceDominio = new ServiceDominio();
