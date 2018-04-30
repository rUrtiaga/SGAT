//TODO agregar a todos setter y getter (NO ACCEDER DIRECTO A LAS PROPIEDADES)
class Taller {
    constructor(categoria,nombre,subcategoria){
        this._categoria = categoria
        this._nombre = nombre
        this._subcategoria = subcategoria
    }
}

class Persona{
    constructor(dni,nombre,apellido,telprincipal,telsecundario,mail,comentario){
        this._dni = dni
        this._nombre = nombre
        this._apellido = apellido
        this._telprincipal = telprincipal
        this._telsecundario = telsecundario
        this._mail = mail
        this._comentario = comentario
    }
}

class Curso{
    constructor(cupo,taller,...profesor){
        // this._alumnos = []
        // this._alumnosBaja = []
        // this._espera = []
        // this._esperaBaja = []
        // this._diasHorariosLugares = [] //coleccion de diaHorarioLugar
        this._taller = taller
        this._cupo = cupo
        this._profesores = profesor
        this._anio = 2018 //TODO hacer que sea el año actual
    }
    bajaAlumno(alumno) {
        
    }
    bajaEspera(alumno){
        
    }
    //Se espera que pase de la lista de espera a la lista de alumnos (ojo checkear cupo)
    altaAlumno(alumno){}
    //se espera que inscriba a un alumno a este curso dependiendo del cupo
    inscribir(alumno){}

    //canitadades de todo

    
}

class diaHorarioLugar {
    constructor(dia, horario, lugar){
        this._dia = dia
        this._horario = horario
        this._lugar = lugar
    }
}
