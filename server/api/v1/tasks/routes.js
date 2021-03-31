// server/api/v1/tasks/routes.js

const router = require('express').Router({
  //  Indica  al enrutador de las tareas que mezcle los parámetros de la ruta padre con
  // los parámetros de las rutas dinámicas que se definan en sus ruta
  mergeParams: true,
});

const controller = require('./controller');

/*
* /api/tasks/ POST - CREATE
* /api/tasks/ GET - READ ALL
* /api/tasks/:id GET - READ ONE
* /api/tasks/:id PUT - UPDATE
1* /api/tasks/:id DELETE - DELETE
*/

router.param('id', controller.id);

router
  .route('/')
  .post(controller.parentId, controller.create)
  .get(controller.parentId, controller.all);

router
  .route('/:id')
  .get(controller.parentId, controller.read)
  .put(controller.parentId, controller.update)
  .delete(controller.parentId, controller.delete);

module.exports = router;
