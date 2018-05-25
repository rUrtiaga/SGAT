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

module.exports = router;
 
