"use strict";
const { Schema, model } = require("mongoose");
const users = new Schema({
    email: {
        type: String,
        required: true,
    },
    hashPassword: {
        type: String,
        required: true,
    }
}, { versionKey: false });
module.exports = model("users", users);
