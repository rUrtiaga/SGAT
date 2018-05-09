const Store = require('./store')
const store = Store.llenar()

//(NO ACCEDER DIRECTO A LAS PROPIEDADES)
class Taller {
    //Forma de uso Taller('UnaCategoria','UnNombre') => Crea un taller subcategoria con nombre undefined
    // Taller('Artes Manuales','Ceramica','Indigena','Tradicional') => crea taller con dos subcategorias, pueden ser N
    constructor(categoria,nombre,...subCategorias){
        this._categoria = categoria
        this._nombre = nombre
        this._subCategorias = this.stringToSubCategoria(subCategorias) //[] esto es una lista
    
    }

    /******************************
     *      Setters y getters
     ******************************/

    setCategoria(categoria){ 
        store.addCategoria(categoria)
        this._categoria = categoria}
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

    addStrSubCategoria(strSubCat) { this.stringToSubCategoria([strSubCat])}
    
    //Esta es la funcion que tranforma una lista de string a subcategorias
    stringToSubCategoria(listSubsString){
        let listSubsCats = []
        for (const subCatStr of listSubsString) {
            listSubsCats.push(new SubCategoria(subCatStr,this))
        }
        return (listSubsCats)?listSubsCats:[new SubCategoria(undefined,this)]
    }
}

class SubCategoria {
    constructor(nombre,taller){
        this._taller = taller
        this._nombre = nombre
    }
    setNombre(nombre){ this._nombre = nombre }
    getNombre(){return this._nombre}

    setCursos(cursos){this._cursos = cursos}
    getCursos(){this._cursos}

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
}

class Curso{
    constructor(cupo,subCategoria,...profesores){
        //Las colecciones tienen DNI(clave de persona), no objetos Persona
        this._alumnos = []
        this._alumnosBaja = []
        this._espera = []
        this._esperaBaja = []
        this._diasHorariosLugares = [] //coleccion de DiaHorarioLugar
        this._subCategoria = subCategoria
        this._cupo = cupo
        this._profesores = profesores
        this._anio = new Date().getFullYear() 
    }

    addAlumno(alumno){ return this._alumnos.push(alumno.getDNI())}
    addEspera(alumno){ return this._espera.push(alumno.getDNI())}    
    addAlumnoBaja(DNIalumno){return this._alumnosBaja.push(DNIalumno)}
    addEsperaBaja(DNIalumno){return this._esperaBaja.push(DNIalumno)}    
    addDiaHorarioLugar(diaHorarioLugar){return this._diasHorariosLugares.push(diaHorarioLugar)}


    removeAlumno(DNIalumno){
        this.setAlumnos(quitarDeLista(DNIalumno,this.getAlumnos()))
        this.addAlumnoBaja(DNIalumno)}
    removeEspera(DNIalumno){
        this.setEspera(quitarDeLista(DNIalumno,this.getEspera()))
        this.addEsperaBaja(DNIalumno)}


    //Se espera que pase de la lista de espera a la lista de alumnos 
    altaAlumno(DNIalumno){
        this.estaEnEspera(DNIalumno)
        this.hayCupo()
        this.addAlumno(DNIalumno)
        this.removeEspera(DNIalumno)
    }
    //se espera que inscriba a un alumno a este curso dependiendo del cupo
    inscribir(alumno){
        this.validarAdd(alumno)
        store.addPersona(alumno)
        if(this.getCantidadAlumnos() < this.getCupo()){
            this.addAlumno(alumno)
        } else {
            this.addEspera(alumno)
        }
    }

    validarAdd(persona){
        let DNIpersona = persona.getDNI()
        if (this.estaEnProf(DNIpersona) || this.estaEnAlumno(DNIpersona)){
            throw 'La persona llamada'+ persona.getNombre() +" "+ persona.getApellido() + "con DNI:"+ DNIpersona +' ya se encuentra en el curso'
        } 
    }

    estaEnProf(dni){
        return this.getProfesores().some((dniProf)=> dniProf == dni)
    }
    estaEnAlumno(dni){
        return this.getAlumnos().some((dniProf)=> dniProf == dni)    
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

    addDiaHorarioLugar(strDia,strHorario,strLugar){
        this.getDiasHorariosLugares().push(new DiaHorarioLugar(strDia,strHorario,strLugar))
    }
    /******************************
     *      Setters y getters
     ******************************/

    setAlumnos(alumnos){return this._alumnos = alumnos}
    getAlumnos() {return this._alumnos}

    setSubCategoria(subCate){return this._subCategoria = subCate}
    getSubCategoria(){return this._subCategoria}

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

    getProfesores(){return this._profesores}

    //cantidades de todo    
    getCantidadAlumnos(){return this.getAlumnos().length}
    getCantidadAlumnosBaja(){return this.getAlumnosBaja().length}
    getCantidadEspera(){return this.getEspera().length}
    getCantidadEsperaBaja(){return this.getEsperaBaja().length}
    getCantidadDHL(){return this.getDiasHorariosLugares().length}
    
}

//por ejemplo {dia:'Martes',horario:'20:00', lugar:'Casa de la cultura'}
class DiaHorarioLugar {
    constructor(dia, horario, lugar){
        this._dia = dia
        this._horario = horario
        this._lugar = lugar
    }
    getDia(){return this._dia}
    getHorario(){return this._horario}
    getLugar(){return this._lugar}
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

exports.dominio = { Taller, Persona, Curso, DiaHorarioLugar };