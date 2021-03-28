//  server/index.js
const express = require('express');

const requestId = require('express-request-id')();

const logger = require('./config/logger');

const app = express();

// Setup middleware
app.use(requestId);
app.use(logger.requests);

// No route found handler
app.use((req, res, next) => {
  const message = 'Route not found';
  const statusCode = 404;

  logger.warn(message);

  res.status(statusCode);

  res.json({
    message,
  });
});

app.get('/', (req, res, next) => {
  res.json({
    message: 'Welcome to the API',
  });
});

// No route found handler
app.use((req, res, next) => {
  res.status(404);
  res.json({
    message: 'Error. Route not found',
  });
});

app.use((req, res, next) => {
  next({
    message: 'Route not found',
    statusCode: 404,
    level: 'warn',
  });
});

// Error handler
app.use((err, req, res, next) => {
  const { message, statusCode = 500, level = 'error' } = err;
  const log = `${logger.header(req)} ${statusCode} ${message}`;

  logger[level](log);

  logger.error(message);

  res.status(statusCode);
  res.json({
    message,
  });
});

module.exports = app;
