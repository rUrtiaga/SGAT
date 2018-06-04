/********************
 * DOMINIO
 ********************/

//(NO ACCEDER DIRECTO A LAS PROPIEDADES)
class Taller {
  //Forma de uso Taller('UnaCategoria','UnNombre') => Crea un taller subcategoria con nombre undefined
  // Taller('Artes Manuales','Ceramica','Indigena','Tradicional') => crea taller con dos subcategorias, pueden ser N
  constructor(categoria, nombre, ...subCategorias) {
    this._categoria = categoria;
    this._nombre = nombre;
    this._subCategorias = this.stringToSubCategoria(subCategorias); //[] esto es una lista
  }

  /******************************
   *      Setters y getters
   ******************************/

  setCategoria(categoria) {
    store.addCategoria(categoria);
    this._categoria = categoria;
  }
  getCategoria() {
    return this._categoria;
  }

  setNombre(nombre) {
    this._nombre = nombre;
  }
  getNombre() {
    return this._nombre;
  }

  setSubCategorias(subCategorias) {
    this._subCategorias = subCategorias;
  }
  getSubCategorias() {
    return this._subCategorias;
  }

  //NO IRIA
  getSubCategoria(nombre) {
    try {
      return this.getSubCategorias().find(sc => sc.getNombre() == nombre);
    } catch (error) {
      throw new Error(
        "Subcategoria " +
          nombre +
          " no se encuentra en taller " +
          this.getNombre()
      );
    }
  }

  addSubCategoria(subCategoria) {
    this._subCategorias.push(subCategoria);
  }

  addStrSubCategoria(strSubCat) {
    this.stringToSubCategoria([strSubCat]);
  }

  //Esta es la funcion que tranforma una lista de string a subcategorias
  stringToSubCategoria(listSubsString) {
    let listSubsCats = [];
    for (const subCatStr of listSubsString) {
      listSubsCats.push(new SubCategoria(subCatStr, this));
    }
    return listSubsCats != []
      ? listSubsCats
      : [new SubCategoria(undefined, this)];
  }
}

class SubCategoria {
  constructor(nombre, taller) {
    this._taller = taller;
    this._nombre = nombre;
  }
  setNombre(nombre) {
    this._nombre = nombre;
  }
  getNombre() {
    return this._nombre;
  }

  setCursos(cursos) {
    this._cursos = cursos;
  }
  getCursos() {
    this._cursos;
  }
}

class Persona {
  constructor(dni, nombre, apellido, fechaNac, direccion, telPrincipal, mail) {
    this._dni = dni;
    this._nombre = nombre;
    this._apellido = apellido;
    this._fechaNac = fechaNac;
    this._direccion = direccion;
    this._telPrincipal = telPrincipal;
    this._mail = mail;
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
  */
    persistentJSON(){
        return JSON.stringify(this)
    }
}

class Curso {
  constructor(cupo, subCategoria, ...profesores) {
    //Las colecciones tienen DNI(clave de persona), no objetos Persona
    this._alumnos = [];
    this._alumnosBaja = [];
    this._espera = [];
    this._esperaBaja = [];
    this._diasHorariosLugares = []; //coleccion de DiaHorarioLugar
    this._subCategoria = subCategoria;
    this._cupo = cupo;
    this._profesores = profesores;
    this._anio = new Date().getFullYear();
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

  hayCupo(){
    return this.getCantidadAlumnos() < this.getCupo()
  }

  //remplazar por ID
  estaPersona(DNIpersona){
      return this.estaEnProf(DNIpersona) || this.estaEnAlumno(DNIpersona)
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

  //cantidades de todo
//   getCantidadAlumnos() {
//     return this.getAlumnos().length;
//   }
//   getCantidadAlumnosBaja() {
//     return this.getAlumnosBaja().length;
//   }
//   getCantidadEspera() {
//     return this.getEspera().length;
//   }
//   getCantidadEsperaBaja() {
//     return this.getEsperaBaja().length;
//   }
//   getCantidadDHL() {
//     return this.getDiasHorariosLugares().length;
//   }
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

function quitarDeLista(elemento, list) {
  let indice = indiceDeLista(elemento, list);
  return list.splice(indice, 1);
}

function indiceDeLista(elemento, list) {
  return list.findIndex(elemento);
}

// class Store {
//   constructor() {
//     this.categorias = [];
//     this.cursos = [];
//     this.talleres = [];
//     this.lugares = [];
//     this.personas = [];
//   }

//   addCategoria(cat) {
//     if (!this.getCategorias().some(c => cat == c)) {
//       this.categorias.push(cat);
//       //this.ordenarCategorias()
//     }
//   }
//   //Borrar Categoria deberia checkear que ningun taller la este usando.

//   addTaller(taller) {
//     this.addCategoria(taller.getCategoria());
//     this.talleres.push(taller);
//     //this.ordenarTalleres()
//     return taller;
//   }

//   addCurso(curso) {
//     // this.addLugares(curso.getDiasHorariosLugares())
//     this.cursos.push(curso);
//     // this.ordenarCursos()
//     this.agregarPersonas(curso.getProfesores());
//     this.agregarPersonas(curso.getAlumnos());
//     return curso;
//   }

//   agregarPersonas(personas) {
//     for (const persona of personas) {
//       this.agregarPersona(persona);
//     }
//   }

//   agregarPersona(persona) {
//     if (this.personas.some(p => p.getDNI() == persona.getDNI())) {
//       //remplazar datos de persona anterior
//     } else {
//       this.personas.push(persona);
//     }
//   }

//   getTalleres() {
//     return this.talleres;
//   }

//   getCategorias() {
//     return this.categorias;
//   }

//   getCategoriaLlamada(nombre) {
//     return this.categorias.find(c => c == nombre);
//   }

//   getTallerLLamado(strTaller) {
//     return this.getTalleres().find(t => t.getNombre() == strTaller);
//   }

//   getPersonas() {
//     return this.personas;
//   }
//   estaPersonaDNI(dni) {
//     return this.getPersonas().some(p => p.getDNI() == dni);
//   }
//   getPersonaDNI(dni) {
//     return this.getPersonas().find(p => p.getDNI() == dni);
//   }

//   llenar() {
//     this.categorias = ["Artes Manuales", "Instrumentos Musicales"];

//     const cat1 = this.getCategoriaLlamada("Artes Manuales");
//     const cat2 = this.getCategoriaLlamada("Instrumentos Musicales");

//     //Agrega talleres de Artes Manuales
//     let ceramica = this.addTaller(
//       new Taller(cat1, "Ceramica", "Normal", "Aborigen")
//     );
//     this.addTaller(new Taller(cat1, "Tallado En Madera"));
//     this.addTaller(new Taller(cat1, "Mimbreria"));
//     this.addTaller(new Taller(cat1, "Plateria"));
//     this.addTaller(new Taller(cat1, "Marroquineria"));
//     this.addTaller(new Taller(cat1, "Dibujo", "Normal", "Digital"));
//     this.addTaller(new Taller(cat1, "Arte Juvenil"));

//     //Agrega talleres de instrumentos Musicales
//     this.addTaller(new Taller(cat2, "Piano", "Principiantes", "Avanzados"));
//     this.addTaller(new Taller(cat2, "Bajo", "Principiantes", "Avanzados"));
//     this.addTaller(new Taller(cat2, "Guitarra", "Principiantes", "Avanzados"));
//     this.addTaller(new Taller(cat2, "Violín", "Principiantes", "Avanzados"));
//     this.addTaller(new Taller(cat2, "Viola", "Principiantes", "Avanzados"));
//     this.addTaller(
//       new Taller(cat2, "Violoncello", "Principiantes", "Avanzados")
//     );
//     this.addTaller(
//       new Taller(cat2, "Contrabajo", "Principiantes", "Avanzados")
//     );
//     this.addTaller(new Taller(cat2, "Bateria", "Principiantes", "Avanzados"));
//     this.addTaller(new Taller(cat2, "Bandoneon", "Principiantes", "Avanzados"));
//     this.addTaller(
//       new Taller(cat2, "Flauta Traversa", "Principiantes", "Avanzados")
//     );
//     this.addTaller(new Taller(cat2, "Piano", "Principiantes", "Avanzados"));

//     let prof = new Persona(
//       12345678,
//       "Juan",
//       "Perez",
//       "12/02/1980",
//       "",
//       2243451234,
//       "a@a.com"
//     );

//     let ceramicaNormalc1 = new Curso(
//       10,
//       ceramica.getSubCategoria("Normal"),
//       prof
//     );
//     ceramicaNormalc1.addDiaHorarioLugar(
//       new DiaHorarioLugar("Martes", "20:00", "Casa de La Cultura")
//     );
//     this.addCurso(ceramicaNormalc1);
//   }
// }

// var store = new Store();
// store.llenar();

module.exports.dominio = { Taller, Persona, Curso, DiaHorarioLugar };
//module.exports.store = store;

/*
carlos hace que los objetos de negocio se puedan tranformar a json haciendo metodos como basicUIJSON (que te da un JSON adaptado par ala interfaz)
y otro como persistenceJSON(que te da el json formateado a como va a ir en la base de datos)

desde el Node en la parte de interfaz web (express) cuando le pega hace un controller.addTaller({aqui json de taller}) que se encarga de hacer el new y demas
para casos simples usa directo el store, store.all().map()(taller=>taller.basicUIJSON())

En el caso de los test, le pegaria al controller y compara los json resultantes

hacer un Controller que se encargue de tranformar Json a modelo y haga las validaciones
*/
