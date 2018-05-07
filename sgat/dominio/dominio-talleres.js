//TODO agregar a todos setter y getter (NO ACCEDER DIRECTO A LAS PROPIEDADES)
class Taller {
    constructor(categoria,nombre,...subCategorias){
        this._categoria = categoria
        this._nombre = nombre
        this._subCategorias = this.stringToSubCategoria(subCategorias) //[] esto es una lista
    
    }

    /******************************
     *      Setters y getters
     ******************************/

    setCategoria(categoria){ this._categoria = categoria}
    getCategoria() {return this._categoria}

    setNombre(nombre){ this._nombre = nombre}
    getNombre() {return this._nombre}

    setSubCategorias(subCategorias){ this._subCategorias = subCategorias}
    getSubCategorias() {return this._subCategorias}
    getSubCategoria(nombre){
        try {
            return this.getSubCategorias().find((sc)=>sc.nombre() == nombre)
        } catch (error) {
            throw new Error('Subcategoria '+ nombre +' no se encuentra en taller ' + this.getNombre())
        }
    }

    addSubCategoria(subCategoria) {this._subCategorias.push(subCategoria)}

    esValido(){
        if (!(this.getNombre() && this.getCategoria())){
            throw new Error('Estos campos no pueden ser vacios')
        }
    }
    stringToSubCategoria(listSubsString){
        let listSubsCats = []
        for (const subCatStr of listSubsString) {
            listSubsCats.push(new SubCategoria(subCatStr,this))
        }
        return (listSubsCats)?listSubsCats:[new SubCategoria('',this)]
    }
}

class SubCategoria {
    constructor(nombre,taller){
        this._taller = taller
        this._nombre = nombre
        this._cursos = []
    }
    setNombre(nombre){ this._nombre = nombre }
    getNombre(){return this._nombre}

    setCursos(cursos){this._cursos = cursos}
    getCursos(){this._cursos}

    addCurso(curso){this.getCursos().push(curso)}
    deleteCurso(curso){_.pull(this.getCursos(),curso)}
}

class Persona{
    constructor(dni,nombre,apellido,fechaNac,direccion,telPrincipal,mail){
        this._dni = dni
        this._nombre = nombre
        this._apellido = apellido
        this._fechaNac = fechaNac
        this._direccion = direccion
        this._telPrincipal = telPrincipal
        this._mail = mail
    }

    /******************************
     *      Setters y getters
     ******************************/

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


    esValida(){
        if(!(isAlpha(this.getNombre()))){
            throw new Error('Nombre no valido')
        }
        if(!(isAlpha(this.getApellido()))){
            throw new Error('Apellido no valido')
        }
    }
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

    addAlumno(alumno){return this._alumnos.push(alumno)}
    addEspera(alumno){return this._espera.push(alumno)}    
    addAlumnoBaja(alumno){return this._alumnosBaja.push(alumno)}
    addEsperaBaja(alumno){return this._esperaBaja.push(alumno)}    
    addDiaHorarioLugar(diaHorarioLugar){return this._diasHorariosLugares.push(diaHorarioLugar)}


    removeAlumno(alumno){
        this.setAlumnos(quitarDeLista(alumno,this.getAlumnos()))
        this.addAlumnoBaja(alumno)}
    removeEspera(alumno){
        this.setEspera(quitarDeLista(alumno,this.getEspera()))
        this.addEsperaBaja(alumno)}


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

    /******************************
     *      Setters y getters
     ******************************/

    setAlumnos(alumnos){return this._alumnos = alumnos}
    getAlumnos() {return this._alumnos}

    setAlumnosBaja(alumnos){return this._alumnosBaja = alumnos}
    getAlumnosBaja() {return this._alumnosBaja}
 
    setEspera(alumnos){return this._espera = alumnos}
    getEspera() {return this._espera}
 
    setEsperaBaja(alumnos){return this._esperaBaja = alumnos}
    getEsperaBaja() {return this._esperaBaja}

    setDiasHorariosLugares(listaDHL){return this._diasHorariosLugares = listaDHL}
    getDiasHorariosLugares() {return this._diasHorariosLugares}
    
    getAnio(){return this._anio}

    setCupo(cupo){ this._cupo = cupo }
    getCupo(){return this._cupo}

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


/***********************
 * Funciones Auxiliares
 ***********************/

function quitarDeLista(elemento, list){
    let indice = indiceDeLista(elemento, list)
    return list.splice(indice,1)
}

function indiceDeLista(elemento, list){
    return list.findIndex(elemento)
}

function isAlpha(ch){
    return ch.toLowerCase().match(/^[a-z]+$/i) !== null
}

exports.dominio = { Taller, Persona, Curso, diaHorarioLugar };