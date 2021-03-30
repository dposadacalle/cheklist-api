// server/api/v1/tasks/controller.js

const { Model, fields, references } = require('./model');
const { paginationParseParams } = require('../../../utils');
const { sortParseParams, sortCompactToStr } = require('../../../utils');

exports.create = async (req, res, next) => {
  const { body = {} } = req;
  const document = new Model(body);

  try {
    const doc = await document.save();

    res.status(201);
    res.json({
      success: true,
      data: doc,
    });
  } catch (error) {
    next(new Error(error));
  }
};

exports.all = async (req, res, next) => {
  const { query = {} } = req;
  const { limit, skip, page } = paginationParseParams(query);
  const { sortBy, direction } = sortParseParams(query, fields);
  const populate = references.join(' ');

  const all = Model.find({})
    .sort(sortCompactToStr(sortBy, direction))
    .skip(skip)
    .limit(limit)
    .populate(populate);

  const count = Model.countDocuments();

  try {
    const data = await Promise.all([all.exec(), count.exec()]);
    const [docs, total] = data;
    const pages = Math.ceil(total / limit);

    res.json({
      success: true,
      data: docs,
      meta: {
        limit,
        skip,
        total,
        page,
        pages,
        sortBy,
        direction,
      },
    });
  } catch (err) {
    next(new Error(err));
  }
};

exports.read = async (req, res, next) => {
  const { doc = {} } = req;

  res.json({
    success: true,
    data: doc,
  });
};

exports.update = async (req, res, next) => {
  const { body = {}, doc = {} } = req;

  // Object.assing: Mezcla (Union) del contenido del primer objeto con el contenido del segundo obj

  // se recomienda para otros casos mas avanzados la función merge de la librería lodash.

  Object.assign(doc, body);

  try {
    const updated = await Model.save();
    res.json({
      success: true,
      data: updated,
    });
  } catch (err) {
    next(new Error(err));
  }
};

exports.delete = async (req, res, next) => {
  const { doc = {} } = req;

  try {
    const removed = await Model.remove();

    res.json({
      success: true,
      data: removed,
    });
  } catch (err) {
    next(new Error(err));
  }
};

exports.id = async (req, res, next, id) => {
  const populate = references.join(' ');

  try {
    const doc = await await Model.findById(id).populate(populate).exec();

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
