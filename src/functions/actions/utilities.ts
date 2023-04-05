import handlePayload from "../actions/handle.payload";
import IAgent from "../../interfaces/agent.interface";
import ICustomer from "../../interfaces/customer.interface";
import { genImage, genText } from "./response";
import config from "../../config/config";
import ResponseBot from "../../controllers/response";
export const getPagoMensual = (amount= 50000, plazo = 60) => {
	let pagoMensual = 0;
	switch (amount) {
		case 15000:
			if (plazo === 24) {
				pagoMensual = 879.75;
			} else if (plazo === 36) {
				pagoMensual = 680.41;
			} else if (plazo === 48) {
				pagoMensual = 585.31;
			} else if (plazo === 60) {
				pagoMensual = 530.41;
			}
			break;
		case 25000:
			if (plazo === 24) {
				pagoMensual = 1466.25;
			} else if (plazo === 36) {
				pagoMensual = 1134.02;
			} else if (plazo === 48) {
				pagoMensual = 975.52;
			} else if (plazo === 60) {
				pagoMensual = 884.01;
			}
			break;
		case 50000:
			if (plazo === 48) {
				pagoMensual = 1909.15;
			} else if (plazo === 60) {
				pagoMensual = 1680.18;
			}
			break;
		case 75000:
			if (plazo === 48) {
				pagoMensual = 2863.72;
			} else if (plazo === 60) {
				pagoMensual = 2520.26;
			}
			break;
		case 100000:
			if (plazo === 48) {
				pagoMensual = 3677.73;
			} else if (plazo === 60) {
				pagoMensual = 3188.11;
			}
			break;
		case 200000:
			if (plazo === 48) {
				pagoMensual = 7355.45;
			} else if (plazo === 60) {
				pagoMensual = 6376.21;
			}
			break;
		default:
			pagoMensual = 530.41;
			break;
	}
	return pagoMensual;
};

export const getUserProfile = (name: string) => {
	let profile: {
		name: string;
		lastName: string;
	} = {
		name: "NO_REGISTRO",
		lastName: "NO_REGISTRO",
	};
	let userName: string[] = [];
	userName = name.split(" ");
	switch (userName.length) {
		case 0:
			return profile;
		case 1:
			profile.name = name;
			break;
		case 2:
			profile.name = userName[0];
			profile.lastName = userName[1];
			break;
		case 3:
			profile.name = userName[0];
			profile.lastName = `${userName[1]} ${userName[2]}`;
			break;
		case 4:
		default:
			profile.name = `${userName[0]} ${userName[1]}`;
			profile.lastName = `${userName[3]} ${userName[4]}`;
			break;
	}
	return profile;
};

export const getCurrentMessage = async (
	user: ICustomer,
	agent: IAgent
) => {
	const responseBot = new ResponseBot(config.dialog.NAMESPACE);

	let response: any[] = [];
	let start = [];
	if (!user.isStarted) {
	  user.isStarted = true;
	  if (agent) {
		if (agent.userImgs) {
		  agent.userImgs[1]
			? start.push(responseBot.genImage(`${agent.userImgs[1].Location}`))
			: null;
		} else {
		  user.isStarted = false;
		}
	  } else {
		user.isStarted = false;
	  }
	  
	  response.push(
		responseBot.genImageTemplate(
		  "best_sellers_start", 
		  "https://i.imgur.com/pgJr2Sl.jpg"
		)
	  );
	} else {
	  response.push(
		responseBot.genText(
		  `Sr@ ${user.name} me gustaría brindarle una información más exacta, en unos momentos su asesor se pondrá en contacto.`
		),
	  );
	  response.push(
		responseBot.genText(
		  `Si esto no sucede o no contesta sus mensajes, puede escribirnos ` +
			`por whatsapp a este número 4495843856 y le estaremos atendiendo. \nQuejas o cambios de asesor: 4499967297, 4496882899, 4496887301, 4496887302.`
		),
	  );
	}
	response.push(
	  responseBot.genTemplate("info_template")
	);
  
	if (Array.isArray(response)) {
	  response = start.concat(response);
	} else {
	  start.push(response);
	  response = start;
	}
	return response;
};
