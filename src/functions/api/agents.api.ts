import config from '../../config/config';
import axios, { AxiosResponse } from 'axios';
import IAgent from '../../interfaces/agent.interface';

const { url, api_key } = config.customer_service;

export const getAgent = async (id: string) => {
    let agent: IAgent | null = null;

    try {
        let response: AxiosResponse = await axios({
            method: "GET",
            url: `${url}/agent/getAgent/${id}`,
            headers: {
              "Authorization": `${api_key}`,
              "Content-Type": "application/json",
            }
        })
    
        if(response.status !== 200) {
            return agent;
        }

        agent = response.data.result;

        return agent;
    } catch(e) {
        console.error("ERROR AT GET AGENT", e);
        return agent;
    }
};