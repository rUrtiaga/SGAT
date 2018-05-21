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
}

exports.controller = new Controller()    