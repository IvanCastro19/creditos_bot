"use strict";
// node librearies
import axios from "axios";
// models, interfaces, configs and functions
import config from "../../config/config";

const { URL, KEY } = config.dialog;

const sendMessage = async (requestBody:any) => {
    let sended = false;

    try {
        let data = JSON.stringify(requestBody);

        let response = await axios({
            method: "POST",
            url: `${URL}/messages/`,
            headers: {
            "D360-API-KEY": KEY,
            "Content-Type": "application/json",
            },
            data: data,
        });

        if(response.status !== 201) {
            return sended;
        }

        sended = true;

    } catch(e: any) {
        throw e.response.data;
    }
    return sended;
}

const sendTemplate = async (requestBody:any) => {
    let sended = false;
    try {
        let response = await axios(
            `${URL}/configs/templates`,
            {
                method: "GET",
                headers: {
                "D360-API-KEY": KEY,
            },
        });
    
        if(response.status !== 200) {
            return sended;
        }

        sended = true;
    
    } catch(e) {
        console.error("ERROR AT SEND TEMPLATE", e)
    }
    return sended;
}

const callSendApi = async (requestBody: any) => {
    try {
        
        let sended = await sendMessage(requestBody);

        if(!sended) {
            console.log("MESSAGE 360 NOT SENDED");
        }

    } catch(e) {
        console.error("ERROR AT 360 API", e);
        throw e;
    }
}

export default callSendApi;