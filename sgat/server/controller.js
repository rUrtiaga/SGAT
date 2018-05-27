const {dominio} = require('./dominio/dominio-talleres.js')
const {store} = require('./dominio/dominio-talleres.js')

class Controller{

    getPersonaDNI(dni){
        //this.verificarDNI(dni)
        if(store.estaPersonaDNI(dni)){
            return store.getPersonaDNI(dni)
        } else {
            throw new Error('El dni no se encuentra')
        }
    }

    postPersona(dataPersona){
        let persona = new dominio.Persona(dataPersona._dni,dataPersona._nombre,dataPersona._apellido,dataPersona._fechaNac,dataPersona._direccion,dataPersona._telPrincipal,dataPersona._mail)
        persona.setTelSecundario(dataPersona._telSecundario)
        persona.setComentario(dataPersona._comentario)
        store.agregarPersona(persona)
    }

    getCategorias(){
        return store.getCategorias()
    }
}

exports.controller = new Controller()    