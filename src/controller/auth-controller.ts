import { NextFunction, Request, Response } from "express";
import { renderWithLayout } from "../utils/layout.js";
import { getUser, insertUser } from "../db/queries.js";

class AuthController {
    public renderLogin(req: Request, res: Response, next: NextFunction) {
        if (req.user) {
            return res.redirect("/profile");
        }
        renderWithLayout(req, res, "pages/login", { user: req.user });
    }

    public renderSignup(req: Request, res: Response, next: NextFunction) {
        if (req.user) {
            return res.redirect("/profile");
        }
        renderWithLayout(req, res, "pages/signup", { user: req.user });
    }

    public async handleLogin(req: Request, res: Response, next: NextFunction) {
        if (getUser(req.user?.userId)?.city) {
            // the user already has a database entry and completed onboarding
            res.redirect("/profile");
        } else {
            await insertUser(req.user!.userId);
            // make the user go through onboarding
            res.redirect("/signup/onboarding");
        }
    }
}

export default new AuthController();
