import sendWhatsapp from "../api/dialog.api";

const sendMessage = async (response: any, delay = 0, wa_id: string) => {
    return new Promise<void>((resolve, reject) => {
        try {
            if(!response) {
                return
            }
            // Check if there is delay in the response
            if (response.delay) {
                delay = response["delay"];
                delete response["delay"];
            }
        
            response.to = wa_id;
    
            setTimeout(
                async () => await sendWhatsapp(response).catch((error) => {
                    reject(error);
                }),
                delay
            );
            resolve()
        } catch(e: any) {
            if(e.response.data.errors)
                console.log('ERROR AT SEND MESSAGE 1', e);
            else 
                console.error("ERROR AT SEND MESSAGE 2", e);
            reject(e)
        }
    });
}

export default sendMessage;