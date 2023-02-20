"use strict";
module.exports = class TimeTable {
    constructor(timeTableClass, taskClass) {
        this.timeTableClass = timeTableClass;
        this.taskClass = taskClass;
    }
    async getAll() {
        try {
            return await this.timeTableClass.getTimetables();
        }
        catch {
            throw new Error('DB error');
        }
    }
    async delete() {
        try {
            await this.timeTableClass.removeTimeTables({});
            await this.taskClass.removeTasks({});
        }
        catch {
            throw new Error('DB error');
        }
    }
    async getByID(ttID) {
        try {
            return await this.timeTableClass.getTimetableByID(ttID);
        }
        catch {
            throw new Error('DB error');
        }
    }
    async create(name) {
        try {
            return await this.timeTableClass.addTimetable({
                name
            });
        }
        catch {
            throw new Error('DB error');
        }
    }
    async deleteByID(ttID) {
        if (!await this.timeTableClass.getTimetableByID(ttID))
            throw new Error('No such timetable');
        try {
            let deletedTimeTablesInfo = await this.timeTableClass.removeTimetableByID(ttID);
            let deletedTasksInfo = await this.taskClass.removeTasks({
                timeTableID: ttID,
            });
            return [
                { about: "DeletedTimeTables", ...deletedTimeTablesInfo },
                { about: "DeletedTasks", ...deletedTasksInfo },
            ];
        }
        catch {
            throw new Error('DB error');
        }
    }
};
