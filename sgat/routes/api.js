var express = require("express");
var router = express.Router();
let { controller } = require("../server/controller.js");
const { store } = require("../server/Store.js");
const { service } = require("../server/service.js");

/**
 * Cursos
 */
router.route("/cursos").post(function(req, res, next) {
  service
    .pushCurso(req.body)
    .then(dataOK => res.status(201).send(dataOK))
    .catch(e => next(e));
});

/**
 * Talleres
 */
router
  .route("/talleres")
  .post(function(req, res, next) {
    service
      .pushTaller(req.body)
      .then(dataOK => res.status(201).send(dataOK))
      .catch(e => next(e));
  })
  .get(function(req, res, next) {
    if (req.query.categoria) {
      next();
      return;
    }
    service
      .fetchTalleres()
      .then(t => res.send(t))
      .catch(e => next(e));
  })
  .get(function(req, res, next) {
    service
      .fetchTalleresCategoria(req.query.categoria)
      .then(t => res.send(t))
      .catch(e => next(e));
  });

/* PERSONAS .*/
router
  .route("/personas")
  .get(function(req, res, next) {
    service
      .fetchPersonaDNI(req.query.dni)
      .then(p => res.send(p))
      .catch(e => next(e));
  })
  .post(function(req, res, next) {
    //validacion de string y demas aca.
    return service
      .pushPersona(req.body)
      .then(data => res.status(201).send(data))
      .catch(e => next(e));
  })
  .put(function(req, res) {
    //TODO
  });

router.get("/personas/:id", function(req, res, next) {
  service
    .fetchPersona(req.params.id)
    .then(p => res.send(p))
    .catch(e => next(e));
});

/* CATEGORIAS .*/
//Este get usa el fetch autosuficiente de STORE
router
  .route("/categorias")
  .get(function(req, res, next) {
    service
      .fetchCategorias()
      .then(cats => res.json(cats))
      .catch(e => next(e));
  })
  .post(function(req, res, next) {
    //las validaciones de strings y demas que son las misma sque de ui deben ir con un next
    service
      .doOperationOnConnection(db => {
        let categoria = req.body.categoria;
        return service
          .existCategoria(db, categoria)
          .catch(e => {
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
      .catch(e => next(e));
  });

/* Manejador de errores
    --debe ir al final del archivo--
*/

router.use(function(e, req, res, next) {
  if (e.status) {
    res.status(e.status).send({ message: e.message });
  } else {
    res.status(500).send({ message: e.message });
  }
});

module.exports = router;
