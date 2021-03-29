// server/api/v1/tasks/controller.js
const { Error } = require('mongoose');
const Model = require('./model');

exports.create = async (req, res, next) => {
  const { body = {} } = req;
  const document = new Model(body);

  try {
    const doc = await document.save();
    res.status(201);
    res.json(doc);
  } catch (error) {
    next(new Error(error));
  }
};

exports.all = async (req, res, next) => {
  try {
    const docs = await Model.find({}).exec();
    res.json(docs);
  } catch (err) {
    next(new Error(err));
  }
};

exports.read = async (req, res, next) => {
  const { doc = {} } = req;

  res.json(doc);
};

exports.update = async (req, res, next) => {
  const { body = {}, doc = {} } = req;

  // Object.assing: Mezcla (Union) del contenido del primer objeto con el contenido del segundo obj

  // se recomienda para otros casos mas avanzados la función merge de la librería lodash.

  Object.assign(doc, body);

  try {
    const updated = await Model.save();
    res.json(updated);
  } catch (err) {
    next(new Error(err));
  }
};

exports.delete = async (req, res, next) => {
  const { doc = {} } = req;

  try {
    const removed = await Model.remove();
    res.json(removed);
  } catch (err) {
    next(new Error(err));
  }
};

exports.id = async (req, res, next, id) => {
  try {
    const doc = await Model.findById(id).exec();

    if (!doc) {
      const message = `${Model.modelName} not found`;

      next({
        message,
        statusCode: 404,
        level: 'warn',
      });
    } else {
      req.doc = doc;
      next();
    }
  } catch (err) {
    next(new Error(err));
  }
};
