const {dominio} = require('./dominio/dominio-talleres-v1.js')
const {store} = require('./dominio/dominio-talleres-v1.js')

function talleresToJSON(talleres){
   return (JSON.stringify(talleres, function( key, value) {
        if(key == '_taller') {
            //TODO cambiar por id, o re ver la estructura
          return value._nombre;
        } else {
          return value;
        };
    }))
}

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

    getTalleres(){
        return talleresToJSON(store.getTalleres())
    }
    getTalleresDe(categoria){
       let talleresFiltrados = store.getTalleres().filter(t =>t.getCategoria() == categoria)
        return talleresToJSON(talleresFiltrados)
    }

    getTallerID(id){
        return talleresToJSON([store.getTallerLLamado(id)])
    }

    getSubCatDeTallerID(id){
        return talleresToJSON( store.getTallerLLamado(id).getSubCategorias() )
    }

    getCursosSubCatDeTaller(idt,idsub){
        return talleresToJSON( store.cursos )
    }
    
    agregarCategoria(categoria){
        store.addCategoria(categoria)
    }

    pushAlumno(idCurso,idPersona){
        let a = store.getPersonaDNI(idPersona)
        store.getCurso(idCurso).addAlumno(a)
    }
}

exports.controller = new Controller()    