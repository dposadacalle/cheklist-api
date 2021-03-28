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

// No route found handlers
app.use((req, res, next) => {
  res.status(404);
  res.json({
    message: 'Error. Route not found',
  });
});

// Error handler
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  logger.error(message);

  res.status(statusCode);

  res.json({
    message,
  });
});

module.exports = app;
