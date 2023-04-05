import { Router } from "express";
import { ok, receive } from "../controllers/index";

const route = Router();

route.post('/dist', receive)
    .get('/status', (req, res) => {
        res.send({'status': 'OK'})
    })

export default route;