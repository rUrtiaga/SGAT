const {dominio} = require('./dominio/dominio-talleres.js')
const {store} = require('./Store.js')

class Controller{

    // getPersonaDNI(dni){
    //     //this.verificarDNI(dni)
    //     if(store.estaPersonaDNI(dni)){
    //         return store.getPersonaDNI(dni)
    //     } else {
    //         throw new Error('El dni no se encuentra')
    //     }
    // }

    postPersona(dataPersona){
        //this.validarDatosDePersona(dataPersona)
        service.agregarPersona(dataPersona)
    }

    getCategorias(res){
        let s = store.getCategorias(res)
        console.log(s)
        return s
    }

    agregarCategoria(categoria){
        store.agregarCategoria(categoria)
    }
}

const controller = new Controller()   

exports.controller =  controller