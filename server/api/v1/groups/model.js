// server/api/v1/tasks/model.js

const mongoose = require('mongoose');

const { Schema } = mongoose;

const fields = {
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 128,
  },
};

const group = new Schema(fields, {
  timestamps: true,
});

module.exports = {
  Model: mongoose.model('group', group),
  fields,
};
