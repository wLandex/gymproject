"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const validationSchemas = {
    idSchema: joi_1.default.string().min(24).max(24).alphanum().required(),
    nameDescSchema: {
        date: joi_1.default.date().iso().greater("12-12-2020"),
        name: joi_1.default.string().min(6).max(25).required(),
        description: joi_1.default.string().min(6).max(50).required(),
    },
    nameSchema: {
        name: joi_1.default.string().min(6).max(25).required(),
    },
    limitPageSchema: {
        limit: joi_1.default.string().pattern(/^[0-9]+$/).max(30).required(),
        page: joi_1.default.string().pattern(/^[0-9]+$/).min(1).required()
    },
    emailPasswordSchema: {
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().min(8).max(26).required(),
    }
};
module.exports = validationSchemas;
