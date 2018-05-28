var express = require('express');
var router = express.Router();
let {controller} = require('../server/controller.js')

/* GET users listing.*/
router.get('/persona/:dni', function(req, res, next) {
 res.json(controller.getPersonaDNI(req.params.dni))
});

router.get('/categorias',  function(req, res, next) {
    res.json(controller.getCategorias())
});

router.post('/categorias', function (req, res){
    controller.agregarCategoria(req.body.categoria)
})

router.post('/taller', function (req, res){
        
    controller.agregarTaller(req.body.categoria, req.body.nombre, req.body.subCategorias)
    console.log("se agrego el taller " + req.body.nombre)
})

module.exports = router;
 
