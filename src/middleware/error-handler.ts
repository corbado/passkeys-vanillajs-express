import { NextFunction, Request, Response } from "express";
import { logger } from "../utils/logger.js";

export class HttpException extends Error {
    status: number;
    message: string;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.message = message;
    }
}

export default function errorHandler(
    error: HttpException,
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const status = error.status || 500;
    const message = error.message || "Something went wrong";

    // Log the error
    logger.error(`[${req.method}] ${req.path} >> ${message}`);

    // Respond with error
    res.status(status).json({
        status: "error",
        statusCode: status,
        message,
    });
}
