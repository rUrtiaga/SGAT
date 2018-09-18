const { SgatError } = require("../extras/SgatError");

const { ObjectID } = require("mongodb");

/********************
 * DOMINIO
 ********************/

//(NO ACCEDER DIRECTO A LAS PROPIEDADES)
class Taller {
  // Forma de uso Taller('UnaCategoria','UnNombre') => Crea un taller subcategoria con nombre undefined
  // Taller('Artes Manuales','Ceramica','Indigena','Tradicional') => crea taller con dos subcategorias, pueden ser N
  constructor(dataTaller, subCategoria) {
    this._categoria = dataTaller._categoria;
    this._nombre = dataTaller._nombre;
    this._subCategoria = subCategoria;
  }

  /******************************
   *      Setters y getters
   ******************************/

  // setCategoria(categoria) {
  //   store.addCategoria(categoria);
  //   this._categoria = categoria;
  // }

  getCategoria() {
    return this._categoria;
  }

  setNombre(nombre) {
    this._nombre = nombre;
  }
  getNombre() {
    return this._nombre;
  }

  setSubCategoria(subCategoria) {
    this._subCategoria = subCategoria;
  }
  getSubCategoria() {
    return this._subCategoria;
  }

  // addSubCategoria(subCategoria) {
  //   this._subCategorias.push(subCategoria);
  // }

  // addStrSubCategoria(strSubCat) {
  //   this.stringToSubCategoria([strSubCat]);
  // }

  //Esta es la funcion que tranforma una lista de string a subcategorias
  // stringToSubCategoria(listSubsString) {
  //   let listSubsCats = [];
  //   for (const subCatStr of listSubsString) {
  //     listSubsCats.push(new SubCategoria(subCatStr));
  //   }
  //   return listSubsCats !== []
  //     ? listSubsCats
  //     : [new SubCategoria('UNICO', this)];
  // }
}

// class SubCategoria {
//   constructor(nombre) {
//     this._id = new ObjectID();
//     this._nombre = nombre;
//     this._cursos = []
//   }
//   setNombre(nombre) {
//     this._nombre = nombre;
//   }
//   getNombre() {
//     return this._nombre;
//   }

//   setCursos(cursos) {
//     this._cursos = cursos;
//   }
//   getCursos() {
//     this._cursos;
//   }
// }

class Persona {
  constructor(dataPersona) {
    this._dni = dataPersona._dni;
    this._nombre = dataPersona._nombre;
    this._apellido = dataPersona._apellido;
    this._fechaNac = dataPersona._fechaNac;
    this._direccion = dataPersona._direccion;
    this._telPrincipal = dataPersona._telPrincipal;
    this._telSecundario = dataPersona._telSecundario;
    this._mail = dataPersona._mail;
    this._comentario = dataPersona._comentario;
  }

  /******************************
   *      Setters y getters
   ******************************/

  setDNI(dni) {
    this._dni = dni;
  }
  getDNI() {
    return this._dni;
  }

  setNombre(nombre) {
    this._nombre = nombre;
  }
  getNombre() {
    return this._nombre;
  }

  setApellido(apellido) {
    this._apellido = apellido;
  }
  getApellido() {
    return this._apellido;
  }

  setFechaNac(fechaNac) {
    this._fechaNac = fechaNac;
  }
  getFechaNac() {
    return this._fechaNac;
  }

  setDireccion(direccion) {
    this._direccion = direccion;
  }
  getDireccion() {
    return this._direccion;
  }

  setTelPrincipal(telPrincipal) {
    this._telPrincipal = telPrincipal;
  }
  getTelPrincipal() {
    return this._telPrincipal;
  }

  setTelSecundario(telSecundario) {
    this._telSecundario = telSecundario;
  }
  getTelSecundario() {
    return this._telSecundario;
  }

  setMail(mail) {
    this._mail = mail;
  }
  getMail() {
    return this._mail;
  }

  setComentario(comentario) {
    this._comentario = comentario;
  }
  getComentario() {
    return this._comentario;
  }

  /*
    JSON
      no usado por ahora
  */
  persistentJSON() {
    return JSON.stringify(this);
  }

  basicUIJSON() {
    //TODO
    return JSON.stringify(this);
  }
}

class Curso {
  constructor(dataCurso) {
    //Las colecciones tienen clave de persona, no objetos Persona
    this._alumnos = [];
    this._alumnosBaja = [];
    this._espera = [];
    this._esperaBaja = [];
    this._diasHorariosLugares = toDHL(dataCurso._diasHorariosLugares); //coleccion de DiaHorarioLugar
    this._tallerID = ObjectID(dataCurso._tallerID);
    this._comentario = dataCurso._comentario;
    this._cupo = dataCurso._cupo;
    this._profesores = dataCurso._profesores.map(p => new ObjectID(p)); 
    this._anio = new Date().getFullYear();
  }

  
  /**
   * STATIC
   *
   */
  static estaRepetidoPersona(dataCurso, idPersona) {
    if (dataCurso._alumnos.some(pOid => pOid.toString() == idPersona) || dataCurso._profesores.some(pOid=> pOid.toString() == idPersona)){
        return Promise.reject(
            new SgatError("Esta persona ya se encuentra en el curso", 409)
       );
    }
    return Promise.resolve();
  }

  // Función que revisa que el alumno este en la lista de alumnos, 
  //   y no se encuentre en la lista de Alumnos de BAJA
    static sePuedeBorrarAlumno(dataCurso, idPersona) {
        if (dataCurso._alumnos.some(pOid => pOid.toString() == idPersona) &&  
            !dataCurso._alumnosBaja.some(pOid=> pOid.toString() == idPersona)){ 
                return Promise.resolve()
            };
        return Promise.error ("No se puede eliminar el alumno", 400)
    }

  addAlumno(alumno) {
    return this._alumnos.push(alumno.getDNI());
  }
  addEspera(alumno) {
    return this._espera.push(alumno.getDNI());
  }
  addAlumnoBaja(DNIalumno) {
    return this._alumnosBaja.push(DNIalumno);
  }
  addEsperaBaja(DNIalumno) {
    return this._esperaBaja.push(DNIalumno);
  }
  addDiaHorarioLugar(diaHorarioLugar) {
    return this._diasHorariosLugares.push(diaHorarioLugar);
  }

  removeAlumno(DNIalumno) {
    this.setAlumnos(quitarDeLista(DNIalumno, this.getAlumnos()));
    this.addAlumnoBaja(DNIalumno);
  }
  removeEspera(DNIalumno) {
    this.setEspera(quitarDeLista(DNIalumno, this.getEspera()));
    this.addEsperaBaja(DNIalumno);
  }

  //Se espera que pase de la lista de espera a la lista de alumnos
  altaAlumno(DNIalumno) {
    this.estaEnEspera(DNIalumno);
    this.hayCupo();
    this.addAlumno(DNIalumno);
    this.removeEspera(DNIalumno);
  }
  //se espera que inscriba a un alumno a este curso dependiendo del cupo
  //ESTO VA EN SERVICIO
  inscribir(alumno) {
    this.validarAdd(alumno);
    //store.addPersona(alumno);
    if (this.hayCupo()) {
      this.addAlumno(alumno);
    } else {
      this.addEspera(alumno);
    }
  }

  hayCupo() {
    return this.getCantidadAlumnos() < this.getCupo();
  }

  //remplazar por ID
  estaPersona(DNIpersona) {
    return this.estaEnProf(DNIpersona) || this.estaEnAlumno(DNIpersona);
  }

  validarAdd(persona) {
    let DNIpersona = persona.getDNI();
    if (this.estaPersona(DNIpersona)) {
      throw "La persona llamada" +
        persona.getNombre() +
        " " +
        persona.getApellido() +
        "con DNI:" +
        DNIpersona +
        " ya se encuentra en el curso";
    }
  }

  estaEnProf(dni) {
    return this.getProfesores().some(dniProf => dniProf == dni);
  }
  estaEnAlumno(dni) {
    return this.getAlumnos().some(dniProf => dniProf == dni);
  }

  //duda donde va
  estaEnEspera(alumno) {
    if (!this.getEspera().find(e => e == alumno)) {
      throw "El alumno ingresado no esta en la lista de espera";
    }
  }

  hayCupo() {
    if (this.getCupo() >= this.getCantidadAlumnos()) {
      throw "No hay cupo en este curso";
    }
  }

  addDiaHorarioLugar(strDia, strHorario, strLugar) {
    this.getDiasHorariosLugares().push(
      new DiaHorarioLugar(strDia, strHorario, strLugar)
    );
  }

  /******************************
   *      Setters y getters
   ******************************/

  setAlumnos(alumnos) {
    return (this._alumnos = alumnos);
  }
  getAlumnos() {
    return this._alumnos;
  }

  setCategoria(cate) {
    return (this._categoria = cate);
  }
  getCategoria() {
    return this._categoria;
  }

  setSubCategoria(subCate) {
    return (this._subCategoria = subCate);
  }
  getSubCategoria() {
    return this._subCategoria;
  }

  setAlumnosBaja(alumnos) {
    return (this._alumnosBaja = alumnos);
  }
  getAlumnosBaja() {
    return this._alumnosBaja;
  }

  setEspera(alumnos) {
    return (this._espera = alumnos);
  }
  getEspera() {
    return this._espera;
  }

  setComentario(comentario) {
    return (this._comentario = comentario);
  }
  getComentario() {
    return this._comentario;
  }

  setEsperaBaja(alumnos) {
    return (this._esperaBaja = alumnos);
  }
  getEsperaBaja() {
    return this._esperaBaja;
  }

  setDiasHorariosLugares(listaDHL) {
    return (this._diasHorariosLugares = listaDHL);
  }
  getDiasHorariosLugares() {
    return this._diasHorariosLugares;
  }

  getAnio() {
    return this._anio;
  }

  setCupo(cupo) {
    this._cupo = cupo;
  }

  getCupo() {
    return this._cupo;
  }

  getProfesores() {
    return this._profesores;
  }
}

//por ejemplo {dia:'Martes',horario:'20:00', lugar:'Casa de la cultura'}
class DiaHorarioLugar {
  constructor(dia, horario, lugar) {
    this._dia = dia;
    this._horario = horario;
    this._lugar = lugar;
  }
  getDia() {
    return this._dia;
  }
  getHorario() {
    return this._horario;
  }
  getLugar() {
    return this._lugar;
  }
}

/***********************
 * Funciones Auxiliares
 ***********************/

function toDHL(listJsonDHL) {
  return listJsonDHL.map(
    dhlJSON =>
      new DiaHorarioLugar(dhlJSON._dia, dhlJSON._horario, dhlJSON._lugar)
  );
}

function quitarDeLista(elemento, list) {
  let indice = indiceDeLista(elemento, list);
  return list.splice(indice, 1);
}

function indiceDeLista(elemento, list) {
  return list.findIndex(elemento);
}

module.exports = { Taller, Persona, Curso, DiaHorarioLugar };

/*
carlos hace que los objetos de negocio se puedan tranformar a json haciendo metodos como basicUIJSON (que te da un JSON adaptado par ala interfaz)
y otro como persistenceJSON(que te da el json formateado a como va a ir en la base de datos)

desde el Node en la parte de interfaz web (express) cuando le pega hace un controller.addTaller({aqui json de taller}) que se encarga de hacer el new y demas
para casos simples usa directo el store, store.all().map()(taller=>taller.basicUIJSON())

En el caso de los test, le pegaria al controller y compara los json resultantes

hacer un Controller que se encargue de tranformar Json a modelo y haga las validaciones
*/
