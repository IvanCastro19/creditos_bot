import handlePayload from "../actions/handle.payload";
import IAgent from "../../interfaces/agent.interface";
import ICustomer from "../../interfaces/customer.interface";
import { genImage, genText } from "./response";

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

	let response: any[] = [];

	if (user.isWaitingAmount) {
		response = [await handlePayload("SI_COTIZAR", user, agent)];
	} else if (user.isWaitingConfirmAmount) {
		switch (user.amount) {
			case 15000:
				response = [await handlePayload("COTIZAR_15", user, agent)];
				break;
			case 25000:
				response = [await handlePayload("COTIZAR_25", user, agent)];
				break;
			case 50000:
				response = [await handlePayload("COTIZAR_50", user, agent)];
				break;
			case 100000:
				response = [await handlePayload("COTIZAR_100", user, agent)];
				break;
			case 200000:
				response = [await handlePayload("COTIZAR_200", user, agent)];
				break;
			default:
				response = [await handlePayload("COTIZAR_15", user, agent)];
				break;
		}
	} else if (user.isWaitingMensualidades) {
		response = [await handlePayload("AMOUNT_CONFIRMED", user, agent)];
	} else if (user.isWaitingConfirmMensualidades) {
		switch (user.mensualidades) {
			case 24:
				response = await handlePayload("24_MENSUALIDADES", user, agent);
				break;
			case 36:
				response = await handlePayload("36_MENSUALIDADES", user, agent);
				break;
			case 48:
				response = await handlePayload("48_MENSUALIDADES", user, agent);
				break;
			default:
				response = await handlePayload("60_MENSUALIDADES", user, agent);
				break;
		}
	} else if (user.isWaitingEnd) {
		response = [await handlePayload("WAITING_END", user, agent)];
	} else if (user.endConfirm) {
		response = [];
	} else {
		response = [await handlePayload("SERVICES", user, agent)];
	}
	if (!user.isStarted) {
		user.isStarted = true;
		let start = [];
		if (agent) {
			if (agent.userImgs) {
				agent.userImgs[0]
					? start.push(genImage(`${agent.userImgs[0].Location}`))
					: null;
				agent.userImgs[2]
					? start.push(genImage(`${agent.userImgs[2].Location}`))
					: null;
				agent.userImgs[3]
					? start.push(genImage(`${agent.userImgs[3].Location}`))
					: null;
			} else {
				user.isStarted = false;
			}
		} else {
			user.isStarted = false;
		}
		start.push(
			genText(
				`Hola!, ${user.name} este beneficio está dirigido a todos los Pensionados y Jubilados del IMSS, ` +
				"los préstamos son financiado por Bancos regulados por Banxico y pueden ser solicitados desde " +
				"$15,000 hasta $600,000 pesos con autorización en 48 hrs, trámite en línea y tasa de interés desde el 2% mensual."
			)
		);
		if (Array.isArray(response)) {
			response = start.concat(response);
		} else {
			start.push(response);
			response = start;
		}

		// await createUser(user);
	}
	return response;
};
