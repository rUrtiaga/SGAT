let {dominio} = require( './dominio-talleres.js' )
let {store} = require( './dominio-talleres.js')

var assert = require('assert');
console.log(store)

describe('Taller', function() { 
  it('store recien llenado ',()=> assert.equal(18,store.getTalleres().length))
   
  describe('#store.nuevoTaller()', function() {
    it('creacion - dos subcategorias', function(){   
        const cantPrev = store.getTalleres().length     
        store.addTaller(new dominio.Taller('Instrumentos','Piano','principiante', 'avanazado'))
        assert.equal(cantPrev + 1, store.getTalleres().length)
     }) 

  })

})

// describe('Persona',function () {
//     describe('nombre',function () {
//         let goodPerson = new dominio.Persona(11,'Juan','casta','12/05/1970','av 2 n 4',2243401639,'a@a.com')
//         it('nombre valido', ()=> {
//             expect(()=>goodPerson.esValida()).to.not.throw()
//         })
//         it('nombre con numero no valido', ()=> {
//             let p = new dominio.Persona(11,'juan2','casta','12/05/1970','av 2 n 4',2243401639,'a@a.com')
//             expect(()=>p.esValida()).to.throw('Nombre no valido')
//         })
//         it('apellido valido', ()=> {
//             expect(()=>goodPerson.esValida()).to.not.throw()
//         })
//         it('apellido con numero no valido', ()=> {
//             let p = new dominio.Persona(11,'juan','ca2s/ta','12/05/1970','av 2 n 4',2243401639,'a@a.com')
//             expect(()=>p.esValida()).to.throw('Apellido no valido')
//         })

//     })
// })
