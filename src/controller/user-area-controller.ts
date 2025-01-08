import { NextFunction, Request, Response } from "express";
import { renderWithLayout } from "../utils/layout.js";

class UserAreaController {
    public renderUserArea(req: Request, res: Response, next: NextFunction) {
        renderWithLayout(req, res, "pages/user-area", { user: req.user });
    }
}

export default new UserAreaController();
