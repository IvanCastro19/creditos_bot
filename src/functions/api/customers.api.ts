import config from '../../config/config';
import axios, { AxiosError, AxiosResponse } from 'axios';
import ICustomer from '../../interfaces/customer.interface';

const { url, api_key } = config.customer_service;
const { NAMESPACE } = config.dialog;

export const getUser = async (wa_id: string) => {
    let customer: ICustomer | null = null;

    try {
        let response: AxiosResponse = await axios({
            method: "GET",
            url: `${url}/user/getUser/${wa_id}`,
            headers: {
              "Authorization": `access-token ${api_key}`,
              "bot_id": NAMESPACE!,
              "Content-Type": "application/json",
            }
        })
    
        if(response.status !== 200) {
            return customer;
        }

        customer = response.data.user;

        return customer;
    } catch(e: any) {
        return customer;
    }
};

export const createCustomer = (customerData: any): Promise<ICustomer | null> => {
    return new Promise(async(resolve, reject) => {
        try {
            let res: AxiosResponse = await axios({
                method: "POST",
                url: `${url}/lead/`,
                headers: {
                    "Authorization": `access-token ${api_key}`,
                    "Content-Type": "application/json",
                },
                data: customerData
            });

            resolve(res.data.lead);
        } catch(e) {
            console.log(e);
            reject(e);
        }
    })
}

export const updateState = async (wa_id: string) => {
    let updated = false;
    
    try {
        let response: AxiosResponse = await axios({
            method: "PUT",
            url: `${url}/user/updateState/${wa_id}`,
            headers: {
              "Authorization": `${api_key}`,
              "id_bot": NAMESPACE!,
              "Content-Type": "application/json",
            }
        });
    
        if(response.status !== 200) {
            return updated;
        }
    
        updated = true;
    } catch(e) {
        console.error("ERROR AT UPDATE CUSTOMER");
        return updated;
    }
}