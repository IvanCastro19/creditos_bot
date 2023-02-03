import IAdsEntry from "../../interfaces/tracker.interface"
import config from "../../config/config";
import axios, { AxiosResponse } from "axios";

const { url, api_key } = config.customer_service;

export const trackerRegistry = (tracker: IAdsEntry) => {
    return new Promise<void>(async(resolve, reject) => {
        try {
            await axios({
                method: "POST",
                url: `${url}/tracker/ads`,
                headers: {
                  "Authorization": `access-token ${api_key}`,
                  "Content-Type": "application/json",
                },
                data: tracker
            });
        } catch(e) {
            console.log(e);
        }

        resolve();
    })
}