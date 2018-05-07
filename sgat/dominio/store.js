let {dominio} = require( './dominio-talleres.js' )
let Taller = dominio.Taller
let Curso = dominio.Curso
let DHL = dominio.diaHorarioLugar
let Persona = dominio.Persona

class Store {
    constructor(){
        this.categorias = ['Artes Manuales','Instrumentos Musicales']
        this.cursos = []
        this.talleres = []
    }
    
    // nuevoTaller(categoria,nombre,...subcategorias){
    //     let taller = new Taller(categoria,nombre,...subcategorias)
    //     this.addTaller(taller)
    //     return taller
    // }

    addCategoria(cat){
        if(!this.getCategorias().some((c)=> cat == c)){
            this.categorias.push(cat)
            //this.ordenarCategorias()
        }
    }

    addTaller(taller){
        taller.esValido()
        this.addCategoria(taller.getCategoria())
        this.talleres.push(taller)
        return taller
    }
    
    getTalleres(){ return this.talleres }

    getCategorias(){return this.categorias}

    getCategoriaLlamada(nombre){return this.categorias.find((c)=> c == nombre)}

    llenar(){
        const cat1 = this.getCategoriaLlamada('Artes Manuales')
        const cat2 = this.getCategoriaLlamada('Instrumentos Musicales')
        
        //Agrega talleres de Artes Manuales
        let ceramica = this.addTaller(new Taller(cat1,'Ceramica','Normal','Aborigen'))
        this.addTaller(new Taller(cat1,'Tallado En Madera'))
        this.addTaller(new Taller(cat1,'Mimbreria'))
        this.addTaller(new Taller(cat1,'Plateria'))
        this.addTaller(new Taller(cat1,'Marroquineria'))
        this.addTaller(new Taller(cat1,'Dibujo', 'Normal', 'Digital'))
        this.addTaller(new Taller(cat1,'Arte Juvenil'))

        //Agrega talleres de instrumentos Musicales
        this.addTaller(new Taller(cat2,'Piano','Principiantes','Avanzados'))
        this.addTaller(new Taller(cat2,'Bajo','Principiantes','Avanzados'))
        this.addTaller(new Taller(cat2,'Guitarra','Principiantes','Avanzados'))
        this.addTaller(new Taller(cat2,'Violín','Principiantes','Avanzados'))
        this.addTaller(new Taller(cat2,'Viola','Principiantes','Avanzados'))
        this.addTaller(new Taller(cat2,'Violoncello','Principiantes','Avanzados'))
        this.addTaller(new Taller(cat2,'Contrabajo','Principiantes','Avanzados'))
        this.addTaller(new Taller(cat2,'Bateria','Principiantes','Avanzados'))
        this.addTaller(new Taller(cat2,'Bandoneon','Principiantes','Avanzados'))
        this.addTaller(new Taller(cat2,'Flauta Traversa','Principiantes','Avanzados'))
        this.addTaller(new Taller(cat2,'Piano','Principiantes','Avanzados'))
    
        let prof1 = new Persona(12345678,'Juan','Perez','12/02/1980','',2243451234,'a@a.com')
        this.addCurso(new Curso(10,ceramica.getSubCategoria('Normal'),prof1))
    }
}


exports.Store = Store

