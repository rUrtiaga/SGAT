var express = require("express");
var router = express.Router();
let { controller } = require("../server/controller.js");
const { store } = require("../server/Store.js");
const { service } = require("../server/service.js");

/* PERSONAS .*/
router.route("/personas").get(function(req, res) {
  service
    .fetchPersonaDNI(req.query.dni)
    .then(p => res.send(p))
    .catch(e => {
      res.status(500).send({ message: e.message || "Ocurrió un error" });
    });
}).post(function (req,res) {
    service.pushPersona(req.body)
     .then(data=> res.send(data))
     .catch(e=>res.send(e))
}).put(function(req,res){
    //TODO
})

router.get("/personas/:id", function(req, res, next) {
  service
    .fetchPersona(req.params.id)
    .then(p => res.send(p))
    .catch(e => {
      if (e.code == 404) {
        res.status(404).send({ message: e.message });
      } else {
        res.status(500).send({ message: e.message || "Ocurrió un error" });
      }
    });
});

/* CATEGORIAS .*/
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
          e.code = 409;
          return Promise.reject(e);
        })
        .then(() => {
          return service.pushCategoria(db, categoria);
        })
        .then(status => {
          res.status(201).json(status);
          return Promise.resolve();
        });
    })
    .catch(e => {
      if (e.code == 409) {
        res.status(409).json({ message: e.message });
      } else {
        res.status(500).send({ message: e.message || "Ocurrió un error" });
      }
    });
});

module.exports = router;
