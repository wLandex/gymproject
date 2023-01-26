const timeTable = require("../entities/classes/timeTable");
const tasks = require("../entities/classes/task");

module.exports = {
    async createTask(data) {
        const {ttID, description, name, date} = data;

        if (await timeTable.getTimetableByID(ttID)) {
            let result;


            if (date) {
                result = await tasks.addTask({
                    name,
                    description,
                    timeTableID: ttID,
                    date,
                });
            } else {
                result = await tasks.addTask({
                    name,
                    description: description,
                    timeTableID: ttID,
                });
            }
            return result;
        }
        throw new Error('Cannot find timetable');
    }
}