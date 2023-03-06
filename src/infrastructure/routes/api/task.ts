import {Router} from "express";
import validator from "../../middleWares/validator";

const taskController = require("../../controllers/api/task.js");
const validationSchemas = require("../../../validationSchemas");
const authentication = require('../../middleWares/authentication.js');

export default function (router: Router) {
    router.post(
        "/timetables/:ttID/tasks",
        validator({
            body: {
                name: validationSchemas.nameSchema,
                description: validationSchemas.descriptionSchema,
            },
            params: {ttID: validationSchemas.idSchema},
            authenticationToken: {
                accessToken: validationSchemas.tokenSchema
            }
        }),
        authentication(),

        taskController.createTask
    );

    router.get(
        "/timetables/:ttID/tasks",
        validator({
            params: {ttID: validationSchemas.idSchema},
            query: {limit: validationSchemas.limitSchema, page: validationSchemas.limitSchema},
            authenticationToken: {
                accessToken: validationSchemas.tokenSchema
            }
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
            authenticationToken: {
                accessToken: validationSchemas.tokenSchema
            }
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
            authenticationToken: {
                accessToken: validationSchemas.tokenSchema
            }
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
                name: validationSchemas.nameSchema,
                description: validationSchemas.descriptionSchema
            },
            authenticationToken: {
                accessToken: validationSchemas.tokenSchema
            }
        }),
        authentication(),
        taskController.changeTaskByID
    );
};
