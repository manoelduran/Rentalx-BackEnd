import express, { NextFunction, Request, Response } from 'express';
import "dotenv/config";
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from '../../../swagger.json';
import createConnection from "@shared/infra/typeorm";
import "@shared/container";
import { router } from './routes';
import { AppError } from '@shared/errors/AppError';
import upload from '@config/upload';

createConnection();

const app = express();

app.use(express.json());
console.log(swaggerFile);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`));
app.use("/cars", express.static(`${upload.tmpFolder}/cars`));
app.use(router);

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({
            message: error.message
        });
    };
    return response.status(500).json({
        status: "error",
        message: `Internal server error - ${error.message}`
    })
})

export {app};