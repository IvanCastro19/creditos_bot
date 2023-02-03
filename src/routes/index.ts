import { Router } from "express";
import { ok, receive } from "../controllers/index";
import { Request, Response } from 'express';

const route = Router();

route.post('/credit', receive);

export default route;