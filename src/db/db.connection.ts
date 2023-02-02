import mongoose from "mongoose";
import config from "../config/config";
import logging from "../config/log/logging";
 
const SERVER = "SERVER";

const connect = () => {
    try {
        mongoose.connect(config.mongo.url, config.mongo.options)
    } catch(e) {
        logging.error(SERVER, "Ocurrio un error al conectarse a mongodb", e);
    }
}

export default connect;