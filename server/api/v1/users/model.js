// server/api/v1/tasks/model.js

const mongoose = require('mongoose');

const { Schema } = mongoose;

const fields = {
    firstname: {
        type: String,
        required: true,
        trim: true,
        maxlength: 64,
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        maxlength: 64,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        trim: true, // Trim: Elimina los espacios en blanco de una cadena de texto
        min: 6,
        required: true,
    },
};

const user = new Schema(fields, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    },
});

user
    .virtual('name')
    .get(function getName() {
        return `${this.firstname} ${this.lastname}`;
    })
    .set(function setName(name) {
        const [firstname = '', lastname = ''] = name.split(' ');
        this.firstname = firstname;
        this.lastname = lastname;
    });

const hiddenFields = ['password'];

user.methods.toJSON = function toJSON() {
    const doc = this.toObject();
    hiddenFields.forEach((field) => {
        if (Object.hasOwnProperty.call(doc, field)) {
            delete doc[field];
        }
    });
    return doc;
};

module.exports = {
    Model: mongoose.model('user', user),
    fields,
};