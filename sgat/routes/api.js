var express = require("express");
var router = express.Router();
let { controller } = require("../server/controller.js");
const { store } = require("../server/Store.js");
const { service } = require("../server/service.js");

/* GET users listing.*/
router.get('/personas', function(req, res, next) {
    // res.json(controller.getPersonaDNI(req.query.dni))
    console.log(req.query.dni)
    service.fetchPersonaDNI(req.query.dni).then(p => res.json(p[0]))
  });

// router.get('/personas/:id', function(req, res, next) {
//   res.json(controller.getPersonaDNI(req.params.id))
// });

// router.post("/personas", function(req, res, next) {
//   controller.postPersona(req.body);
//   res.send(controller.getPersonaDNI(req.body._dni));
// });

//Este get usa el fetch autosuficiente de STORE
router.get("/categorias", function(req, res, next) {
  service.fetchCategorias().then(cats => res.json(cats));
});

router.post("/categorias", function(req, res) {
  //las validaciones de strings y demas que son las misma sque de ui deben ir con un next
  service
    .doOperationOnConnection(db => {
      let categoria = req.body.categoria;
      return service
        .existCategoria(db, categoria)
        .catch(e => {
          e.code=10
          return Promise.reject(e)
        })
        .then(() => {
          return service.pushCategoria(db, categoria);
        })
        .then(status => {
          res.status(201).json(status);
          return Promise.resolve();
        })
    }).catch(e => {
        if(e.code == 10){
            res.status(409).json({ message: e.message });
        } else {
            res.status(500).send({ message: e.message || "Ocurrió un error" });
        }
      })
    
    
  //   service
  //     .pushCategoria(req.body.categoria)
  //     .then(status => res.status(201).json(status))
  //     .catch(e => {
  //         console.log(e)
  //       res.status(409).json({ message: e.message });
  //     });
});

// function categoriasValidatorDominio(req,res,next,cat) {

// }

module.exports = router;
