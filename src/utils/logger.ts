import winston from "winston";
import { NextFunction, Request, Response } from "express";

// Create a logger
export const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json(),
    ),
    transports: [
        new winston.transports.Console({
            format: winston.format.simple(),
        }),
    ],
});

// Middleware to log requests
export const loggerMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    logger.info(`[${req.method}] ${req.path}`);
    next();
};
