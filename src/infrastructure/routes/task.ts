import {Express} from "express";
import validator from "../middleWares/validator";

const taskController = require("../controllers/task.js");
const validationSchemas = require("../../validationSchemas");
const authentication = require('../middleWares/authentication.js');

export default function (router: Express) {
    router.post(
        "/timetables/:ttID/tasks",
        validator({
            body: {
                name: validationSchemas.nameSchema,
                description: validationSchemas.descriptionSchema,
                accessToken: validationSchemas.tokenSchema
            },
            params: {ttID: validationSchemas.idSchema},
        }),
        authentication(),

        taskController.createTask
    );

    router.get(
        "/timetables/:ttID/tasks",
        validator({
            params: {ttID: validationSchemas.idSchema},
            query: {limit: validationSchemas.limitSchema, page: validationSchemas.limitSchema},
            body: {accessToken: validationSchemas.tokenSchema}
        }),
        authentication(),
        taskController.getTasks
    );

    router.get(
        "/timetables/:ttID/tasks/:taskID",
        validator({
            params: {
                ttID: validationSchemas.idSchema,
                taskID: validationSchemas.idSchema,

            },
            body: {accessToken: validationSchemas.tokenSchema}
        }), authentication(),

        taskController.getTaskByID
    );

    router.delete(
        "/timetables/:ttID/tasks/:taskID",
        validator({
            params: {
                ttID: validationSchemas.idSchema,
                taskID: validationSchemas.idSchema,
            },
            body: {accessToken: validationSchemas.tokenSchema}
        }),
        authentication(),
        taskController.deleteTaskByID
    );

    router.put(
        "/timetables/:ttID/tasks/:taskID",
        validator({
            params: {
                ttID: validationSchemas.idSchema,
                taskID: validationSchemas.idSchema,
            },
            body: {
                accessToken: validationSchemas.tokenSchema,
                name: validationSchemas.nameSchema,
                description: validationSchemas.descriptionSchema
            }
        }),
        authentication(),
        taskController.changeTaskByID
    );
};
