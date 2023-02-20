"use strict";
const timeTableModel = require("../models/timeTableCollectionModel.js");
const TimeTable = {
    async addTimetable(data) {
        try {
            return await timeTableModel.insertMany([data]);
        }
        catch {
            throw new Error("DB error");
        }
    },
    async getTimetables(filter = {}) {
        try {
            return await timeTableModel.find(filter);
        }
        catch {
            throw new Error("DB error");
        }
    },
    async getTimetableByID(id) {
        try {
            return await timeTableModel.findOne({ _id: id });
        }
        catch {
            throw new Error("DB error");
        }
    },
    async removeTimetableByID(id) {
        try {
            return await timeTableModel.deleteMany({ _id: id });
        }
        catch {
            throw new Error("DB error");
        }
    },
    async removeTimeTables(filter) {
        try {
            return await timeTableModel.deleteMany(filter);
        }
        catch {
            throw new Error("DB error");
        }
    },
};
module.export = TimeTable;
