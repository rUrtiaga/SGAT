var express = require('express');
var router = express.Router();
let {controller} = require('../server/controller.js')
const {store} = require('../server/Store.js')
const {service} = require('../server/service.js')


/* GET users listing.*/
// router.get('/personas/:dni', function(req, res, next) {
//   res.json(controller.getPersonaDNI(req.params.dni))
// });

router.post('/personas', function(req,res,next){
    controller.postPersona(req.body)
    res.send(controller.getPersonaDNI(req.body._dni))
})

//Este get usa el fetch autosuficiente de STORE
router.get('/categorias',  function(req, res, next) {
    service.fetchCategorias()
     .then((cats) => res.json(cats))
});

router.post('/categorias', function (req, res){
    service.pushCategoria(req.body.categoria)
        .then((status) => res.send(status))
        // .catch((e)=> res.send(e))
})

module.exports = router;
 
