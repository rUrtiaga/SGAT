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

module.exports = router;
 
