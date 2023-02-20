"use strict";
module.exports = class Task {
    constructor(timeTableClass, taskClass) {
        this.timeTableClass = timeTableClass;
        this.taskClass = taskClass;
    }
    async getTasks(ttID, limit, page) {
        try {
            return await this.taskClass.getTasks({ timeTableID: ttID }, limit, page);
        }
        catch {
            throw new Error('DB error');
        }
    }
    async deleteTasks(ttID) {
        try {
            await this.taskClass.removeTasks({
                timeTableID: ttID
            });
        }
        catch {
            throw new Error('DB error');
        }
    }
    async create(data) {
        const { ttID, description, name, date } = data;
        try {
            if (await this.timeTableClass.getTimetableByID(ttID)) {
                let result;
                if (date) {
                    result = await this.taskClass.addTask({
                        name,
                        description,
                        timeTableID: ttID,
                        date,
                    });
                }
                else {
                    result = await this.taskClass.addTask({
                        name,
                        description: description,
                        timeTableID: ttID,
                    });
                }
                return result;
            }
        }
        catch {
            throw new Error('DB error');
        }
        throw new Error('Cannot find timetable');
    }
    async getTaskByID(ttID, taskID) {
        try {
            if (await this.timeTableClass.getTimetableByID(ttID) &&
                (await this.taskClass.getTaskByID(taskID))) {
                return await this.taskClass.getTaskByID(taskID);
            }
        }
        catch {
            throw new Error('DB error');
        }
        throw new Error('Incorrect task or timetable');
    }
    async deleteTaskByID(taskID) {
        try {
            return await this.taskClass.removeTaskByID(taskID);
        }
        catch {
            throw new Error('DB error');
        }
    }
    // Might need to add finding if timetable with some ttID exist.
    async changeTaskByID(taskID, name, description) {
        if (!(await this.taskClass.getTaskByID(taskID))) {
            throw new Error('No task with this id');
        }
        try {
            return await this.taskClass.changeTask(taskID, {
                name, description
            });
        }
        catch {
            throw new Error('DB error');
        }
    }
};
