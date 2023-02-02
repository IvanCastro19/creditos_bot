import { Request, Response } from "express";
import handleMessage from "../functions/handle.message";
import { createCustomer, getUser } from '../functions/api/customers.api';
import { getAgent } from "../functions/api/agents.api";
import config from "../config/config";

export const receive = async (req: Request, res: Response) => {
    try {
        let msg = null;
        let contact  = null;

        for (const message of req.body.messages) {
            msg = message;
        };

        for (const contacts of req.body.contacts) {
            contact = contacts; 
        };

        let wa_id = contact.wa_id;

        if(!msg || !contact)
            return res.status(400).json({"detail": "Incomplete request"});

        let client = await getUser(wa_id);
        
        if(!client) {
            client = await createCustomer({
                wa_id: wa_id,
                name: contact.profile.name,
                lastName: "",
                phone: wa_id.replace('521', ""),
                status: "New",
                bot_id: config.dialog.NAMESPACE,
                pageId: config.dialog.NAMESPACE,
                isTop: false
            });

            console.log(client);
        }

        if(!client)
            return res.status(404).json({"message": "no agent found"});

        const agent = await getAgent(client!.agent)

        if(!agent)
            return res.status(404).json({"message": "no agent found"});

        const type =  msg['type'];
        let text = '';

        switch (type) {
            case "text":
                text = msg["text"]["body"];
                break;
            case "button":
                text = msg["button"]["text"];
                break;
            }

        await handleMessage(type, text, client!, agent);

        return res.status(200).json({status: 'done'});

    } catch(e: any) {
        if (!e.meta)
            console.error("ERROR_AT_RECEIVE_MESSAGE", e);

        return res.status(400).json({
            "detail": "Error at receive message",
            "error": e 
        });
    }
}