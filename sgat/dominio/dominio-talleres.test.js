let {dominio} = require( './dominio-talleres.js' )
let {Store} = require ( './store.js')

var assert = require('assert');
let chai = require('chai')
let expect = chai.expect


describe('Taller', function() { 
  describe('Taller no valido', function(){
    it('campo vacio - assert error',  ()=>
        expect(function(){
            let t = new dominio.Taller()
            t.esValido()
        }).to.throw('Estos campos no pueden ser vacios')
    )
    })
  let store = new Store()
  it('deberia ser vacio store nuevo',()=> assert.equal(0,store.getTalleres().length))
   
  describe('#store.nuevoTaller()', function() {
    it('creacion - dos subcategorias', function(){        
        store.nuevoTaller('Instrumentos','Piano','principiante', 'avanazado')
        assert.equal(1,store.getTalleres().length)
     })
     it('creacion - datos malos FAIL',  ()=>
            expect(function(){
                store.nuevoTaller('a')
            }).to.throw('Estos campos no pueden ser vacios')
     )
     
  })

})

describe('Persona',function () {
    describe('nombre',function () {
        let goodPerson = new dominio.Persona(11,'Juan','casta','12/05/1970','av 2 n 4',2243401639,'a@a.com')
        it('nombre valido', ()=> {
            expect(()=>goodPerson.esValida()).to.not.throw()
        })
        it('nombre con numero no valido', ()=> {
            let p = new dominio.Persona(11,'juan2','casta','12/05/1970','av 2 n 4',2243401639,'a@a.com')
            expect(()=>p.esValida()).to.throw('Nombre no valido')
        })
        it('apellido valido', ()=> {
            expect(()=>goodPerson.esValida()).to.not.throw()
        })
        it('apellido con numero no valido', ()=> {
            let p = new dominio.Persona(11,'juan','ca2s/ta','12/05/1970','av 2 n 4',2243401639,'a@a.com')
            expect(()=>p.esValida()).to.throw('Apellido no valido')
        })

    })
})
