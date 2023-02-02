import handlePayload from "./actions/handle.payload";
import handleText from "./actions/handle.text";
import sendMessage from "./actions/send.message";
import ICustomer from '../interfaces/customer.interface';
import IAgent from '../interfaces/agent.interface';

const handleMessage = (
	event: string,
	message: string,
	customer: ICustomer,
	agent: IAgent
) => {
	return new Promise<void>( async (resolve, reject) => {
		let responses;
		try {
			switch(event) {
				case "text":
					responses = await handleText(message, customer, agent);
					break;
				case "button":
					responses = await handlePayload(message, customer, agent);
					break;
				default:
					console.log("EVENT_NOT_RECOGNIZED");
					responses = [
						{
							text: `Enviaremos su ${event} a un asesor para que lo revise.`,
						},
					];
					break;
			}
			if (Array.isArray(responses)) {
				let delay = 0;
				for (let response of responses) {
					await sendMessage(response, delay * 1000, customer.wa_id).catch((err) => {
						reject(err)
					})
					delay += 1.5;
				  }
			} else {
				await sendMessage(responses, 0, customer.wa_id).catch((err) => {
					reject(err)
				})
			}
			resolve()
		} catch (error) {
			console.error("ERROR AT HANDLE MESSAGE", error);
			responses = [
				{
					text: `Ha ocurrido un error inesperado. Notificaremos a su asesor para resolverlo de inmediato.`
				},
			];
			reject(error)
		}
	})
}

/**
	* Create and send a special message for clients how do not want be notified in the future
	* @param client - (IUserMode) this object contains the client data 
	* @param bot_id - (string) the namespace of the 360 Dialog account
	* @param messageData - (object) the message sended from the costomer to the webhook
*/
export const handleNoInteresaMessage = (wa_id: string) => {
	const text = createNoInteresaMessage();  
	
	sendMessage(text, 0, wa_id);
}

/**
	* Create and send a special message for not understood messages 
	* 
	* @param client - (IUserMode) this object contains the client data 
	* @param bot_id - (string) the namespace of the 360 Dialog account
	* @param messageData - (object) the message sended from the costomer to the webhook
*/
export const handleNoUnderstandingMessage = (wa_id: string) => {
  	const text = createNoUndestandingMessage();
  	sendMessage(text, 0, wa_id);
}

const createNoInteresaMessage = function (): object {
  	return {
		type: "text",
		text: {
			body: 'Dejarás de recibir información sobre promociones especiales de nuestra parte.\n' +
			"Si cambias de opinión, envía un mensaje al número 449 571 2433 y nos pondremos en contacto contigo." + 
			"\nEsperamos que tengas un buen día, un cordial saludo por parte de CWVL, El Préstamo del mes!."
		}
  	}
}

const createNoUndestandingMessage = () => {
  	return  {
		type: "text",
		text: {
			body: "Por favor, slecciona una de las opciones del mensaje anterior."
		}
  	}
}

export default handleMessage;
