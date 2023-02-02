import IAgentModel from "../../interfaces/agent.interface";
import ICustomer from "../../interfaces/customer.interface";
import { getPagoMensual } from "./utilities";
import {
	genImage,
	genText,
	genButtonTemplate,
	genTemplate,
	genImageTemplate,
} from "./response";

const handlePayloadCreditos = (
	payload: string,
	user: ICustomer,
	agent: IAgentModel
) => {
	let response :any = [];

	// Set the response based on the payload
	if (
		payload === "GET_STARTED" ||
		payload === "DEVDOCS" ||
		payload === "GITHUB" ||
		payload === "CHAT-PLUGIN"
	) {
		user.isStarted = true;
		response = [];
		if (agent) {
			if (agent.userImgs) {
				agent.userImgs[0]
					? response.push(genImage(`${agent.userImgs[0].Location}`))
					: null;
				agent.userImgs[2]
					? response.push(genImage(`${agent.userImgs[2].Location}`))
					: null;
				agent.userImgs[3]
					? response.push(genImage(`${agent.userImgs[3].Location}`))
					: null;
			} else {
				user.isStarted = false;
			}
		} else {
			user.isStarted = false;
		}
		response.push(
			genText(
				`Hola!, ${user.name} este beneficio está dirigido a todos los Pensionados y Jubilados del IMSS, ` +
				"los préstamos son financiado por Bancos regulados por Banxico y pueden ser solicitados desde " +
				"$15,000 hasta $600,000 pesos con autorización en 48 hrs, trámite en línea y tasa de interés desde el 2% mensual."
			)
		);
		response.push(genButtonTemplate("mensaje_informacion"));
	} else if (payload === "USER_ASSIGNED") {
		response = [
			agent !== null ? genImage(`${agent.userImgs[2].Location}`) : {},
			genText(
				`Sr@ ${user.name} ya cuenta con un asesor asignado para llevar su trámite su nombre es: ${agent.name} ${agent.lastName} ` +
				`puede comunicarse al teléfono: ${agent.phone}, o al correo ${agent.email}, si no le llama, ni contesta sus mensajes, puede escribirnos ` +
				`por whatsapp a este número 4495843856 y le estaremos atendiendo. \nQuejas o cambios de asesor: 4499967297, 4496882899, 4496887301, 4496887302.`
			),
			agent !== null ? genImage(`${agent.userImgs[3].Location}`) : {},
			handlePayloadCreditos("SI_COTIZAR", user, agent),
		];
	} else if (
		Number(
			payload
				.replaceAll(" ", "")
				.replaceAll(",", "")
				.replaceAll(".", "")
				.replaceAll("$", "")
				.replaceAll("-", "")
				.replaceAll("(", "")
				.replaceAll(")", "")
		)
	) {
		switch (payload) {
			case "$15,000.00":
				response = handlePayloadCreditos("COTIZAR_15", user, agent);
				break;
			case "$25,000.00":
				response = handlePayloadCreditos("COTIZAR_25", user, agent);
				break;
			case "$50,000.00":
				response = handlePayloadCreditos("COTIZAR_50", user, agent);
				break;
			case "$75,000.00":
				response = handlePayloadCreditos("COTIZAR_75", user, agent);
				break;
			case "$100,000.00":
				response = handlePayloadCreditos("COTIZAR_100", user, agent);
				break;
			case "$200,000.00":
				response = handlePayloadCreditos("COTIZAR_200", user, agent);
				break;
			case "24":
				response = handlePayloadCreditos("24_MENSUALIDADES", user, agent);
				break;
			case "36":
				response = handlePayloadCreditos("36_MENSUALIDADES", user, agent);
				break;
			case "48":
				response = handlePayloadCreditos("48_MENSUALIDADES", user, agent);
				break;
			case "60":
				response = handlePayloadCreditos("60_MENSUALIDADES", user, agent);
				break;
		}
	} else if (payload === "Más de $25,000.00") {
		response = genTemplate("cotizar_step_2");
	} else if (payload === "Más de $75,000.00") {
		response = genTemplate("cotizar_step_3");
	} else if (payload === "Más de $200,000.00") {
		response = handlePayloadCreditos("COTIZAR_MAS", user, agent);
	} else if (payload === "Más opciones") {
		response = genTemplate("mensualidades_2");
	} else if (payload === "AMOUNT_CONFIRMED") {
		user.isWaitingMensualidades = true;
		response = genTemplate("mensualidades");
	} else if (payload === "SERVICES") {
		response = genTemplate("main_menu");
	} else if (payload === "ACERCA DE") {
		response = handlePayloadCreditos("INFORMATION", user, agent);
	} else if (payload === "AVISO DE PRIVACIDAD") {
		response = [genTemplate("privacy_policy")];
	} else if (payload === "CONTACT" || payload === "CARE_HELP") {
		response = [
			genText(
				"Nuestros números telefónicos son los siguientes 4499967297, 4496887301, 4496887301 y También tenemos Whatsapp en 4495843856"
			),
		];
	} else if (payload === "SI_COTIZAR" || payload === "COTIZAR") {
		user.isWaitingAmount = true;
		response = genTemplate("cotizar_step_1");
	} else if (
		payload === "COTIZAR_15" ||
		payload === "COTIZAR_25" ||
		payload === "COTIZAR_50" ||
		payload === "COTIZAR_75" ||
		payload === "COTIZAR_100" ||
		payload === "COTIZAR_200" ||
		payload === "COTIZAR_MAS"
	) {
		user.isWaitingAmount = false;
		user.isWaitingMensualidades = true;
		switch (payload) {
			case "COTIZAR_15":
				user.amount = 15000;
				break;
			case "COTIZAR_25":
				user.amount = 25000;
				break;
			case "COTIZAR_50":
				user.amount = 50000;
				break;
			case "COTIZAR_75":
				user.amount = 75000;
				break;
			case "COTIZAR_100":
				user.amount = 100000;
				break;
			case "COTIZAR_200":
				user.amount = 200000;
				break;
			case "COTIZAR_MAS":
				user.amount = 600000;
				break;
			default:
				user.amount = 15000;
				break;
		}
		if (user.amount < 50000) {
			response = [genTemplate("mensualidades")];
		} else {
			genTemplate("mensualidades_2");
		}
	} else if (payload === "INFORMATION") {
		response = [
			genImageTemplate(
				"imss_validation",
				"https://www.elheraldodejuarez.com.mx/incoming/lrh72b-imss.jpg/ALTERNATES/LANDSCAPE_1140/imss.jpg"
			),
			genImageTemplate(
				"multiva_validation",
				"http://www.bybcasadecambio.com/imagenes/multiva.jpg"
			),
			genTemplate("web_site"),
		];
	} else if (
		payload === "24_MENSUALIDADES" ||
		payload === "36_MENSUALIDADES" ||
		payload === "48_MENSUALIDADES" ||
		payload === "60_MENSUALIDADES"
	) {
		user.isWaitingMensualidades = false;
		user.isWaitingConfirmMensualidades = true;
		let pagoMensual = 0;
		switch (payload) {
			case "24_MENSUALIDADES":
				user.mensualidades = 24;
				break;
			case "36_MENSUALIDADES":
				user.mensualidades = 36;
				break;
			case "48_MENSUALIDADES":
				user.mensualidades = 48;
				break;
			default:
				user.mensualidades = 60;
				break;
		}
		pagoMensual = getPagoMensual(user.amount, user.mensualidades);
		// sendEmail(user, agent, true);
		if (user.amount > 200000) {
			response = handlePayloadCreditos("SEND_COTIZACION", user, agent);
		} else if (user.amount > 50000 && user.mensualidades < 48) {
			response = [
				genText(
					"Para créditos mayores a $50,000.00 sólo son posibles a 48 o 60 mensualidades."
				),
				handlePayloadCreditos("SI_COTIZAR", user, agent),
			];
		} else {
			response = [
				genText(
					`Sr@ ${user.name} su pago mensual por el crédito solicitado de $
					${Number(user.amount).toLocaleString()} a ${user.mensualidades} 
					meses sería desde $${Number(pagoMensual).toLocaleString()} MXN`
				),
				genTemplate(`confirmar_cotizacion`),
			];
		}
	} else if (payload === "SEND_COTIZACION" || payload === "NO_COTIZAR") {
		user.isWaitingMensualidades = false;
		user.isWaitingConfirmMensualidades = false;
		user.isWaitingEnd = true;
		response = [
			genText(
				`En un momento su asesor ${agent.name} ${agent.lastName} se pondrá en contacto con usted`
			),
			genText(
				`Si esto no sucede o no contesta sus mensajes, puede escribirnos ` +
				`por whatsapp a este número 4495843856 y le estaremos atendiendo. \nQuejas o cambios de asesor: 4499967297, 4496882899, 4496887301, 4496887302.`
			),
			handlePayloadCreditos("WAITING_END", user, agent),
		];
	} else if (payload === "WAITING_END") {
		user.isWaitingEnd = true;
		response = genTemplate(`ask_end`);
	} else if (payload === "INFO_PROGRAMA") {
		response = [
			genText(
				`Este apoyo es financiado por los mejores bancos en México, con las mejores tasas del mercado, para el ` +
				`beneficio de los pensionados y Jubilados del IMSS. Los montos pueden ser hasta por $600,000 y se puede tramitar en línea. ` +
				`NOSOTROS AYUDAMOS A NUESTROS CLIENTES A OBTENER EL CREDITO CON LA TASA QUE MAS LE CONVENGA, COMPARAMOS INFORMACIÓN ` +
				`CON TODOS LOS PARTICIPANTES. En el menú le dejamos el sitio web del IMSS para que valide esta información.`
			),
		];
	} else if (payload === "INFO_EMPRESA") {
		response = [
			genText(
				`Somos una empresa verificada por la banca privada y nosotros ayudamos a nuestros clientes a obtener la mejor ` +
				`opción en préstamos para pensionados y ayudar a nuestros clientes con sus trámites`
			),
		];
	} else if (payload === "HAPPY_END") {
		user.isWaitingEnd = false;
		user.endConfirm = true;
		response = [];
	} else if (payload === "Sí" || payload === "Si" || payload === "SI") {
		if (user.isWaitingConfirmMensualidades) {
			response = handlePayloadCreditos("SEND_COTIZACION", user, agent);
		} else if (user.isWaitingEnd) {
			response = handlePayloadCreditos("HAPPY_END", user, agent);
		}
	} else if (payload === "No" || payload === "NO") {
		if (user.isWaitingConfirmMensualidades) {
			response = handlePayloadCreditos("SI_COTIZAR", user, agent);
		} else if (user.isWaitingEnd) {
			response = handlePayloadCreditos("INFORMATION", user, agent);
		}
	} else {
		response = {
			text: `This is a default postback message for payload: ${payload}!`,
		};
	}
	// await createUser(user);
	return response;
};

export default handlePayloadCreditos;
