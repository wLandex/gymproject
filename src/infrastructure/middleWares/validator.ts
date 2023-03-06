import Joi from 'joi';
import express, {Express, NextFunction} from "express";

type Schema = Joi.Schema | { [key: string]: Joi.PartialSchemaMap }

interface ValidationI {
    body?: Schema;
    params?: Schema;
    query?: Schema;
    authenticationToken?: Schema;

}

export default function (schema: ValidationI) {
    return (req: express.Request, res: express.Response, next: NextFunction) => {
        if (schema.body) {
            try {
                req.body = Joi.attempt(req.body, Joi.object(schema.body));
            } catch (e: any) {
                return res
                    .status(400)
                    .json({reason: "Invalid body ", message: e.message});
            }
        }
        if (schema.params) {
            try {
                req.params = Joi.attempt(req.params, Joi.object(schema.params));
            } catch (e: any) {
                return res
                    .status(400)
                    .json({reason: "Invalid params", message: e.message});
            }
        }
        //TODO
        if (schema.query) {
            try {
                Joi.attempt(req.query, Joi.object(schema.query));
            } catch (e: any) {
                return res
                    .status(400)
                    .json({reason: "Invalid query", message: e.message});
            }
        }

        if (schema.authenticationToken) {
            try {
                Joi.attempt({accessToken: req.headers.accesstoken}, Joi.object(schema.authenticationToken));
            } catch (e: any) {
                return res
                    .status(400)
                    .json({reason: "Invalid headers", message: e.message});
            }
        }


        next();
    };
};
