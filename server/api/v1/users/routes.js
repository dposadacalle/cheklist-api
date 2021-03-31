// server/api/v1/tasks/routes.js

const router = require('express').Router();
const tasksRouter = require('../tasks/routes');
const controller = require('./controller');

router.use('/:userId/tasks', tasksRouter);

module.exports = router;
