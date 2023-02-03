import { Router } from "express";
import { ok, receive } from "../controllers/index";

const route = Router();

route.post('/credit', receive)
    .get('/status', ok)

export default route;