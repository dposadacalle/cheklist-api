// server/api/v1/tasks/model.js

const mongoose = require('mongoose');

const { Schema } = mongoose;

const references = {
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },

  groupId: {
    type: Schema.Types.ObjectId,
    ref: 'group',
  },
};

const fields = {
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 128,
  },
  description: {
    type: String,
    required: true,
    default: '',
    trim: true,
    maxlength: 255,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  url: {
    type: String,
    default: '',
    trim: true, // Trim: Elimina los espacios en blanco de una cadena de texto
  },
  dueDate: {
    type: Date,
    default: null,
  },
};

const task = new Schema(Object.assign(fields, references), {
  /**
   * Opcion:timestamps -> nos añada los atributos
   * de createdAt y updatedAt, el primero se establece una vez se guarda satisfactoriamente el
   * documento y el segundo una vez se actualice satisfactoriamente el documento
   */
  timestamps: true,
});

module.exports = {
  Model: mongoose.model('tasks', task),
  fields,
  references,
};
