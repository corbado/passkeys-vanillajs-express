import { Request, Response } from "express";
import englishTranslations from "./corbado-translations.js";

const customTranslations = JSON.stringify({
    en: englishTranslations,
});

const projectId = process.env.CORBADO_PROJECT_ID;

export function renderWithLayout(
    req: Request,
    res: Response,
    view: string,
    options?: object,
    callback?: (err: Error, html: string) => void,
) {
    const isAuthenticated = !!req.user;
    const finalOptions = options
        ? { ...options, customTranslations, projectId, isAuthenticated }
        : { customTranslations, projectId, isAuthenticated };
    res.render(view, finalOptions, callback);
}
