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


//todos los talleres
router.get('/talleres',function (req, res, next) {
    if(req.query.categoria){
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

//pido las subcategorias de un taller
router.get('/talleres/:id/subcategorias', function (req, res){
    res.json(controller.getSubCatDeTallerID(req.params.id))
})

//pido las subcategorias de un taller
router.get('/talleres/:id/subcategorias/:subid/cursos', function (req, res){
    res.json(controller.getCursosSubCatDeTaller(req.params.id,req.params.subid))
})


module.exports = router;
