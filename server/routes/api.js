var express = require("express");
var router = express.Router();
const {
  service
} = require("../service/service.js");
const {
  validator
} = require("../service/validator.js");

/**
 * Cursos
 */

router.route("/cursosCompletos").get(function (req, res, next) {
  service
    .fetchCursosCompletos()
    .then(cursos => res.send(cursos))
    .catch(e => next(e));
});

router
  .route("/cursos")
  .post(function (req, res, next) {
    service
      .pushCurso(req.body)
      .then(dataOK => res.status(201).send(dataOK))
      .catch(e => next(e));
  })
  .get(function (req, res, next) {
    if (req.query.tallerID) {
      next();
      return;
    }
    service
      .fetchCursos()
      .then(cursos => res.send(cursos))
      .catch(e => next(e));
  })
  .get(function (req, res, next) {
    service
      .fetchCursosTaller(req.query.tallerID)
      .then(cursos => res.send(cursos))
      .catch(e => next(e));
  });

router
  .route("/cursos/:id")
  .get(function (req, res, next) {
    service
      .fetchCurso(req.params.id)
      .then(curso => res.send(curso))
      .catch(e => next(e));
  })
  .put(function (req, res, next) {
    service
      .putCurso(req.params.id, req.body)
      .then(() => res.status(200).send())
      .catch(e => next(e));
  });

router.put("/cursos/:id/alumnos", function (req, res, next) {
  service
    .putAlumnoCurso(req.params.id, req.body._idPersona)
    .then(() => res.send("OK"))
    .catch(e => next(e));
});

router.put("/cursos/:id/espera", function (req, res, next) {
  service
    .putAlumnoEsperaCurso(req.params.id, req.body._idPersona)
    .then(() => res.send("OK"))
    .catch(e => next(e));
});

// Borro un Alumno de un curso
router.delete("/cursos/:id/alumnos/:idAlum", function (req, res, next) {
  service
    .deleteAlumnoCurso(req.params.id, req.params.idAlum)
    .then(() => res.send(" Ok "))
    .catch(e => next(e));
});

router.post("/cursos/:id/profesores", function (req, res, next) {
  service
    .postProfesorCurso(req.params.id, req.body._idPersona)
    .then(algo => res.send(algo))
    .catch(e => next(e));
});

/**
 * Talleres
 */

router
  .route("/talleres")
  .post(function (req, res, next) {
    service
      .pushTaller(req.body)
      .then(dataOK => res.status(201).send(dataOK))
      .catch(e => next(e));
  })
  .put(function (req, res, next) {
    service
      .editTaller(req.body)
      .then(dataOK => res.status(201).send(dataOK))
      .catch(e => next(e));
  })
  .get(function (req, res, next) {
    if (req.query.categoria) {
      next();
      return;
    }
    service
      .fetchTalleres()
      .then(t => res.send(t))
      .catch(e => next(e));
  })
  .get(function (req, res, next) {
    if (req.query.taller) {
      next();
      return;
    }
    service
      .fetchTalleresCategoria(req.query.categoria)
      .then(t => res.send(t))
      .catch(e => next(e));
  })
  .get(function (req, res, next) {
    service
      .fetchTalleresCatYTaller(req.query.categoria, req.query.taller)
      .then(t => res.send(t))
      .catch(e => next(e));
  });

router
  .route("/talleres/:id")
  .get(function (req, res, next) {
    service
      .fetchTaller(req.params.id)
      .then(t => res.send(t))
      .catch(e => next(e));
  })
  .delete(function (req, res, next) {
    return service
      .deleteByID(req.params.id)
      .then(() => res.send("ok"))
      .catch(e => next(e));
  });

router.route("/talleres/?categoria?nombre").get(function (req, res, next) {
  service
    .fetchTalleres(req.params.categoria, req.params.nombre)
    .then(t => res.send(t))
    .catch(e => next(e));
});

//creo que deberia ir con un parametro
router.get("/talleres/:id/cursos", function (req, res, next) {
  service
    .fetchCursosTaller(req.params.id)
    .then(cursos => res.send(cursos))
    .catch(e => next(e));
});

router.route("/TalleresQueContienenCursos").get(function (req, res, next) {
  service
    .fetchTalleresQueContienenCursos()
    .then(talleres => res.send(talleres))
    .catch(e => next(e));
});

// router.get("/talleres/:id/subcategorias/:subid/cursos",function(req,res,next){
//   service.fetchCursos(req.params)
//   .then(cursos => res.send(cursos))
//   .catch(e => next(e))
// })

/* PERSONAS .*/
router
  .route("/personas")
  .get(function (req, res, next) {
    service
      .fetchPersonaDNI(req.query.dni)
      .then(p => res.send(p))
      .catch(e => next(e));
  })
  .post(function (req, res, next) {
    validator.validatePerson(req.body).catch(e => next(e));
    return service
      .pushPersona(req.body)
      .then(data => res.status(201).send(data))
      .catch(e => next(e));
  });

router
  .route("/personas/:id")
  .get(function (req, res, next) {
    service
      .fetchPersona(req.params.id)
      .then(p => res.json(p))
      .catch(e => next(e));
  })
  .put(function (req, res, next) {
    validator.validatePerson(req.body).catch(e => next(e));
    return service
      .putPersona(req.body)
      .then(() => res.send("OK"))
      .catch(e => next(e));
  });

/* CATEGORIAS .*/
//Este get usa el fetch autosuficiente de STORE
router
  .route("/categorias")
  .get(function (req, res, next) {
    service
      .fetchCategorias()
      .then(cats => res.json(cats))
      .catch(e => next(e));
  })
  .post(function (req, res, next) {
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

router.use(function (e, req, res, next) {
  console.log(e);
  if (e.status) {
    res.status(e.status).send(e.objectForClient);
  } else {
    res.status(500).send({
      message: e.message
    });
  }
});

module.exports = router;