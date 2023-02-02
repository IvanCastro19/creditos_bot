import { Response } from "express";

export const ok = (res: Response) => {
    return res.status(200).json({status: "ok"})
}