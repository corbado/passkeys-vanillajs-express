import { NextFunction, Request, Response } from "express";
import {
    getAuthenticatedUserFromAuthorizationHeader,
    getAuthenticatedUserFromCookie,
} from "../utils/authentication.js";
import { logger } from "../utils/logger.js";

declare global {
    namespace Express {
        interface Request {
            user: { userId: string; fullName: string } | null;
            cookies: Record<string, any>;
        }
    }
}

export async function authenticateMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        // Attempt to get authenticated user from cookie
        let user = await getAuthenticatedUserFromCookie(req);
        // Else, try to get him from authorization header
        user ??= await getAuthenticatedUserFromAuthorizationHeader(req);
        // Attach user to request object
        req.user = user;
        next();
    } catch (error) {
        logger.error("Authentication middleware error", error);
        res.status(500);
    }
}

// Middleware to require authentication
export function requireAuth(req: Request, res: Response, next: NextFunction) {
    if (!req.user) {
        res.status(401).json({
            message: "Authentication required",
        });
        return;
    }
    next();
}

export function redirectIfNotAuthenticated(href: string) {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            res.redirect(href);
            return;
        }
        next();
    };
}
