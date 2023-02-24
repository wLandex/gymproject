import {Express} from "express";
import validator from "../middleWares/validator";

const taskController = require("../controllers/task.js");
const validationSchemas = require("../../validationSchemas");

export default function (router: Express) {
    router.delete(
        "/timetables/:ttID/tasks",
        validator({params: {ttID: validationSchemas.idSchema}}),
        taskController.deleteTasks
    );

    router.post(
        "/timetables/:ttID/tasks",
        validator({
            body: validationSchemas.nameDescSchema,
            params: {ttID: validationSchemas.idSchema},
        }),
        taskController.createTask
    );

    router.get(
        "/timetables/:ttID/tasks",
        validator({
            params: {ttID: validationSchemas.idSchema},
            query: validationSchemas.limitPageSchema

        }),
        taskController.getTasks
    );

    router.get(
        "/timetables/:ttID/tasks/:taskID",
        validator({
            params: {
                ttID: validationSchemas.idSchema,
                taskID: validationSchemas.idSchema,

            },
        }),

        taskController.getTaskByID
    );

    router.delete(
        "/timetables/:ttID/tasks/:taskID",
        validator({
            params: {
                ttID: validationSchemas.idSchema,
                taskID: validationSchemas.idSchema,
            },
        }),
        taskController.deleteTaskByID
    );
    //FIX
    router.put(
        "/timetables/:ttID/tasks/:taskID",
        validator({
            params: {
                ttID: validationSchemas.idSchema,
                taskID: validationSchemas.idSchema,
            },
            body: validationSchemas.nameDescSchema,
        }),
        taskController.changeTaskByID
    );
};
