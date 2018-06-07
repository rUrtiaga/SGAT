var express = require('express');
var router = express.Router();
let {controller} = require('../server/controller.js')

/* GET users listing.*/
router.get('/personas/:dni', function (req, res, next) {
    res.json(controller.getPersonaDNI(req.params.dni))
});

router.post('/personas', function (req, res, next) {
    controller.postPersona(req.body)
    res.send(controller.getPersonaDNI(req.body._dni))
})

router.get('/categorias', function (req, res, next) {
    res.json(controller.getCategorias())
});

router.post('/categorias', function (req, res){
    controller.agregarCategoria(req.body.categoria)
})


router.get('/cursos/:n', function(req,res,next){
    res.json(controller.getCurso(req.params.n))

//todos los talleres
router.get('/talleres',function (req, res, next) {
    if(req.query.categoria || req.params.id){
        next()
        return
    }
    res.json(controller.getTalleres())
})

//pido talleres filtrado por su categoria
router.get('/talleres', function (req, res, next) {
    var categoria = req.query.categoria;
    res.json(controller.getTalleresDe(categoria))
});

//pido un taller solo
router.get('/talleres/:id', function (req, res){
    res.json(controller.getTallerID(req.params.id))
})

//pido las subacategorias de un taller
router.get('/talleres/:id/subcategorias', function (req, res){
    res.json(controller.getSubCatDeTallerID(req.params.id))

})
})
module.exports = router;
