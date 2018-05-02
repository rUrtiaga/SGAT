//TODO agregar a todos setter y getter (NO ACCEDER DIRECTO A LAS PROPIEDADES)
class Taller {
    constructor(categoria,nombre,...subCategorias){
        this._categoria = categoria
        this._nombre = nombre
        this._subCategorias = subCategorias //[] esto es una lista
    }
    setCategoria(categoria){ this._categoria = categoria}
    getCategoria() {return this._categoria}

    setNombre(nombre){ this._nombre = nombre}
    getNombre() {return this._nombre}

    setSubCategoria(subCategorias){ this._subCategorias = subCategorias}
    getSubCategoria() {return this._subCategorias}
    addSubCategoria(subCategoria) {this._subCategorias.push(subCategoria)}
}

class Persona{
    constructor(dni,nombre,apellido,fechaNac,direccion,telprincipal,telsecundario,mail,comentario){
        this._dni = dni
        this._nombre = nombre
        this._apellido = apellido
        this._fechaNac = fechaNac
        this._direccion = direccion
        this._telPrincipal = telPrincipal
        this._telSecundario = telSecundario
        this._mail = mail
        this._comentario = comentario
    }
    setDNI(dni){ this._dni = dni}
    getDNI() {return this._dni}

    setNombre(nombre){ this._nombre = nombre}
    getNombre() {return this._nombre}

    setApellido(apellido){ this._apellido = apellido}
    getApellido() {return this._apellido}

    setFechaNac(fechaNac){ this._fechaNac = fechaNac}
    getFechaNac() {return this._fechaNac}

    setDireccion(direccion){ this._direccion = direccion}
    getDireccion() {return this._direccion}

    setTelPrincipal(telPrincipal){ this._telPrincipal = telPrincipal}
    getTelPrincipal() {return this._telPrincipal}

    setTelSecundario(telSecundario){ this._telSecundario = telSecundario}
    getTelSecundario() {return this._telSecundario}

    setMail(mail){ this._mail = mail}
    getMail() {return this._mail}

    setComentario(comentario){ this._comentario = comentario}
    getComentario() {return this._comentario}
}

class Curso{
    constructor(cupo,taller,...profesores){
        this._alumnos = []
        this._alumnosBaja = []
        this._espera = []
        this._esperaBaja = []
        this._diasHorariosLugares = [] //coleccion de diaHorarioLugar
        this._taller = taller
        this._cupo = cupo
        this._profesores = profesores
        this._anio = new Date().getFullYear() 
    }
    /**********
     * Setters y getters
     */
    setAlumnos(alumnos){return this._alumnos = alumnos}
    getAlumnos() {return this._alumnos}
    addAlumno(alumno){return this._alumnos.push(alumno)}
    removeAlumno(alumno){
        this.setAlumnos(quitarDeLista(alumno,this.getAlumnos()))
        this.addAlumnoBaja(alumno)}

    setAlumnosBaja(alumnos){return this._alumnosBaja = alumnos}
    getAlumnosBaja() {return this._alumnosBaja}
    addAlumnoBaja(alumno){return this._alumnosBaja.push(alumno)}

    setEspera(alumnos){return this._espera = alumnos}
    getEspera() {return this._espera}
    addEspera(alumno){return this._espera.push(alumno)}    
    removeEspera(alumno){
        this.setEspera(quitarDeLista(alumno,this.getEspera()))
        this.addEsperaBaja(alumno)}

    setEsperaBaja(alumnos){return this._esperaBaja = alumnos}
    getEsperaBaja() {return this._esperaBaja}
    addEsperaBaja(alumno){return this._esperaBaja.push(alumno)}    

    setDiasHorariosLugares(listaDHL){return this._diasHorariosLugares = listaDHL}
    getDiasHorariosLugares() {return this._diasHorariosLugares}
    addDiaHorarioLugar(diaHorarioLugar){return this._diasHorariosLugares.push(diaHorarioLugar)}
    
    getAnio(){return this._anio}

    setCupo(cupo){ this._cupo = cupo }
    getCupo(){return this._cupo}

    //Se espera que pase de la lista de espera a la lista de alumnos (ojo checkear cupo)
    altaAlumno(alumno){
        this.estaEnEspera(alumno)
        this.hayCupo()
        this.addAlumno(alumno)
        this.removeEspera(alumno)
    }
    //se espera que inscriba a un alumno a este curso dependiendo del cupo
    inscribir(alumno){
        if(this.getCantidadAlumnos() < this.getCupo()){
            this.addAlumno(alumno)
        } else {
            this.addEspera(alumno)
        }
    }

    estaEnEspera(alumno){
        if(!this.getEspera().find((e)=> e == alumno)){
            throw 'El alumno ingresado no esta en la lista de espera'
        }
    }

    hayCupo(){
        if(this.getCupo() >= this.getCantidadAlumnos()){
            throw 'No hay cupo en este curso'
        }
    }


    //cantidades de todo    
    getCantidadAlumnos(){return this.getAlumnos().length}
    getCantidadAlumnosBaja(){return this.getAlumnosBaja().length}
    getCantidadEspera(){return this.getEspera().length}
    getCantidadEsperaBaja(){return this.getEsperaBaja().length}
    getCantidadDHL(){return this.getDiasHorariosLugares().length}
    
}

//por ejemplo {dia:'Martes',horario:'20:00', lugar:'Casa de la cultura'}
class diaHorarioLugar {
    constructor(dia, horario, lugar){
        this._dia = dia
        this._horario = horario
        this._lugar = lugar
    }
}


/**
 * Funciones Auxiliares
 */

function quitarDeLista(elemento, list){
    let indice = indiceDeLista(elemento, list)
    return list.splice(indice,1)
}

function indiceDeLista(elemento, list){
    return list.findIndex(elemento)
}