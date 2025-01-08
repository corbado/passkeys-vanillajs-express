import { NextFunction, Request, Response } from "express";
import { renderWithLayout } from "../utils/layout.js";
import { getUser, updateUserCity } from "../db/queries.js";
import { getUserIdentifiers } from "../utils/authentication.js";

class ProfileController {
    public async renderProfile(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        const dbUser = getUser(req.user?.userId);
        if (!dbUser) {
            res.redirect("/login");
            return;
        }
        const identifierList = await getUserIdentifiers(req.user!.userId);
        renderWithLayout(req, res, "pages/profile", {
            user: req.user,
            dbUser,
            identifiers: identifierList.identifiers,
        });
    }

    public renderOnboarding(req: Request, res: Response, next: NextFunction) {
        renderWithLayout(req, res, "pages/onboarding", { user: req.user });
    }

    public async updateCity(req: Request, res: Response, next: NextFunction) {
        const city = req.body.city;
        await updateUserCity(req.user!.userId, city);
        res.redirect("/");
    }
}

export default new ProfileController();
