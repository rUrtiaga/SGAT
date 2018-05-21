var express = require('express');
var router = express.Router();
let {controller} = require('../server/controller.js')

/* GET users listing.*/
router.get('/persona', function(req, res, next) {
 res.json(controller.getPersonaDNI(req.query.dni))
});

router.get('/categorias',  function(req, res, next) {
    res.json(controller.getCategorias())
});

module.exports = router;
 
