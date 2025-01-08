import { NextFunction, Request, Response } from "express";
import { renderWithLayout } from "../utils/layout.js";
import { getUser } from "../db/queries.js";

class HomeController {
    public renderHomepage(req: Request, res: Response, next: NextFunction) {
        if (req.user) {
            const dbUser = getUser(req.user.userId);
            renderWithLayout(req, res, "pages/home", {
                user: req.user,
                city: dbUser?.city ?? "unknown",
            });
        } else {
            renderWithLayout(req, res, "pages/home", { user: req.user });
        }
    }
}

export default new HomeController();
