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

router.get('/cursos/:n', function(req,res,next){
    res.json(controller.getCurso(req.params.n))
})

module.exports = router;
 
