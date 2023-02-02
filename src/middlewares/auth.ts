import { Request, Response, NextFunction } from "express";
import config from "../config/config";
import jwt from "jwt-simple";

export const auth = (req: Request, res: Response, next: NextFunction) => {

    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(403).json({
                message: "Header authentication not found"
            });
        }

        const isAuthorized = jwt.decode(token, config.server.secret_key!);

        if(!isAuthorized) {
            return res.status(403).json({
                message: "UNAUTHORIZED, Token is not valid"
            });
        }
        next();
    } catch(e) {
        return res.status(503).json({
            message: "ERROR AT AUTHENTICATE",
            error: e
        });
    }
};