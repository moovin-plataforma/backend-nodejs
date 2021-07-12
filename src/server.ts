import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import { router } from "./routes";
import * as dotenv from 'dotenv';

import "./database";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use(router);

app.use((err: Error , request: Request, response: Response, next: NextFunction) => {
    if(err instanceof Error){
        return response.status(400).json({
            error: err.message
        });
    }

    return response.status(500).json({
        status: "error",
        message: "Internal Server Error"
    });
})

app.listen(process.env.APP_PORT, () => console.log(`Server is running in port: ${process.env.APP_PORT}`));