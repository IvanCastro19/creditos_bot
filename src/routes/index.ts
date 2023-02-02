import { Router } from "express";
import { ok, receive } from "../controllers/index";
import { Request, Response } from 'express';

const route = Router();

route.post('/credit', receive)
    .post('/dist', (req: Request, res: Response) => {
        console.log('Mensaje de distribucion entrante', req.body)
        return res.status(200).json({status: 'done'})
    })

export default route;