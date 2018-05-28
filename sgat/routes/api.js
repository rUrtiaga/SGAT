var express = require('express');
var router = express.Router();
let {controller} = require('../server/controller.js')

/* GET users listing.*/
router.get('/personas/:dni', function(req, res, next) {
  res.json(controller.getPersonaDNI(req.params.dni))
});

router.post('/personas', function(req,res,next){
    controller.postPersona(req.body)
    res.send(controller.getPersonaDNI(req.body._dni))
})

router.get('/categorias',  function(req, res, next) {
    res.json(controller.getCategorias())
});

router.post('/categorias', function (req, res){
    controller.agregarCategoria(req.body.categoria)
})

router.post('/taller', function (req, res){
    controller.agregarTaller(req.body)
    console.log("se agrego el taller " + req.body._categoria + req.body._nombre + req.body._subCategorias)
})

module.exports = router;
 
