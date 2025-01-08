import { NextFunction, Request, Response } from "express";

const secretString = "Passkeys are cool!";

class SecretController {
    public getSecret(req: Request, res: Response, next: NextFunction) {
        res.json({ secret: secretString });
    }
}

export default new SecretController();
