import handlePayload from "./handle.payload";
import IAgent from "../../interfaces/agent.interface";
import ICustomer from "../../interfaces/customer.interface";
import { genImage, genText } from "./response";
import { getCurrentMessage } from "./utilities";

// Handles messages events with text
const handleTextCreditos = async (
	message: string,
	user: ICustomer,
	agent: IAgent
) => {
	// check greeting is here and is confident
	message = message.trim().toLowerCase();

	let response;

	if (
		message.includes("volver a empezar") ||
		message === "hola" ||
		message === "empezar"
	) {
		user.isStarted = true;
		response = [];
		if (agent) {
			if (agent.userImgs) {
				agent.userImgs[0]
					? response.push(
						genImage(
							`${agent.userImgs[0].Location}`
						)
					)
					: null;
				agent.userImgs[2]
					? response.push(
						genImage(
							`${agent.userImgs[2].Location}`
						)
					)
					: null;
				agent.userImgs[3]
					? response.push(
						genImage(
							`${agent.userImgs[3].Location}`
						)
					)
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

	} else if (
		Number(
			message
				.replaceAll(" ", "")
				.replaceAll(",", "")
				.replaceAll(".", "")
				.replaceAll("$", "")
				.replaceAll("-", "")
				.replaceAll("(", "")
				.replaceAll(")", "")
		)
	) {
		const numberMessage = Number(message
			.replaceAll(" ", "")
			.replaceAll(",", "")
			.replaceAll(".", "")
			.replaceAll("$", "")
			.replaceAll("-", "")
			.replaceAll("(", "")
			.replaceAll(")", "")
		);

		switch (numberMessage) {
			case 25000:
				response = handlePayload("COTIZAR_25", user, agent);
				break;
			case 50000:
				response = handlePayload("COTIZAR_50", user, agent);
				break;
			case 100000:
				response = handlePayload("COTIZAR_100", user, agent);
				break;
			case 200000:
				response = handlePayload("COTIZAR_200", user, agent);
				break;
			case 2500000:
				response = handlePayload("COTIZAR_25", user, agent);
				break;
			case 5000000:
				response = handlePayload("COTIZAR_50", user, agent);
				break;
			case 10000000:
				response = handlePayload("COTIZAR_100", user, agent);
				break;
			case 20000000:
				response = handlePayload("COTIZAR_200", user, agent);
				break;
			case 24:
				response = handlePayload("24_MENSUALIDADES", user, agent);
				break;
			case 36:
				response = handlePayload("36_MENSUALIDADES", user, agent);
				break;
			case 48:
				response = handlePayload("48_MENSUALIDADES", user, agent);
				break;
			case 60:
				response = handlePayload("60_MENSUALIDADES", user, agent);
				break;
		}
	} else if (message.includes("info")) {
		response = await handlePayload("INFORMATION", user, agent);
	} else if (
		message.includes("intereses") ||
		message.includes("interés") ||
		message.includes("interes") ||
		message.includes("mensual") ||
		message.includes("anual")
	) {
		response = [
			genText(
				"Los intereses son calculcados en base al monto y el tiempo solicitados pueden variar " +
				"entre un 2% a un 2.6% mensual, le recuerdo que al ser menor al 30% anual es una tasa preferencial."
			),
		];
	} else if (
		message.includes("prestamo") ||
		message.includes("prestamos") ||
		message.includes("préstamo") ||
		message.includes("préstamos") ||
		message.includes("crédito") ||
		message.includes("créditos") ||
		message.includes("credito") ||
		message.includes("creditos")
	) {
		response = [
			genText(
				`Los montos del préstamo son desde $15,000.00 hasta $600,000.00 si requiere una cotización más ` +
				`exacta tu asesor asignado ${agent.name} ${agent.lastName} le estará contactando.`
			)
		];
	} else if (
		message.includes("telefonos") ||
		message.includes("telefono") ||
		message.includes("teléfono") ||
		message.includes("teléfonos") ||
		message.includes("contacto") ||
		message.includes("información telefónica ") ||
		message.includes("informacion telefónica ")
	) {
		response = [
			genText(
				"Nuestros números telefónicos son los siguientes 4499967297, 4496887301, 4496887302 y También tenemos Whatsapp en 4495843856"
			),
		];
	} else if (
		message.includes("tiempo") ||
		message.includes("pagos") ||
		message.includes("cuanto") ||
		message.includes("cuánto") ||
		message.includes("plazo") ||
		message.includes("plazos") ||
		message.includes("plaso") ||
		message.includes("plasos")
	) {
		response = [
			genText(
				"Los pagos son ajustados a la capacidad y necedidades de cada cliente " +
				"pero el crédito puede ser liquidado sin penalización a partir de los 6 meses con un plazo máximo de 60 meses"
			),
		];
	} else if (
		message.includes("quienes son") ||
		message.includes("quien son") ||
		message.includes("quienes") ||
		message.includes("quienson")
	) {
		response = [
			genText(
				`Hola!, ${user.name} este beneficio está dirigido a todos los Pensionados y Jubilados del IMSS, ` +
				"los préstamos son financiado por Bancos regulados por Banxico y pueden ser solicitados desde " +
				"$15,000 hasta $600,000 pesos con autorización en 48 hrs, trámite en línea y tasa de interés desde el 2% mensual."
			),
		];
	} else if (
		message.includes("pasos") ||
		message.includes("como le hago") ||
		message.includes("que tengo que hacer") ||
		message.includes("que hacer") ||
		message.includes("que hago")
	) {
		response = [
			genText(
				"El trámite es en línea 100% seguro, con validaciones del IMSS y Biométricos, " +
				"le mandamos solicitud previamente llenada con la información que ustedes nos envía y le regresamos " +
				"su contrato para que no lo firme y lo valide el IMSS."
			),
		];
	} else if (
		message.includes("depósitos") ||
		message.includes("depositan") ||
		message.includes("depositos")
	) {
		response = [
			genText(
				"Le depositan el apoyo directo a su tarjeta donde tiene su nómina, antes tiene que firmar la solicitud"
			),
		];
	} else if (
		message.includes("cuanto me prestan") ||
		message.includes("me pueden prestar") ||
		message.includes("me pueden cotizar") ||
		message.includes("quiero cotizar") ||
		message.includes("una cotizacion") ||
		message.includes("una cotización") ||
		message.includes("quiero un crédito") ||
		message.includes("quiero un credito") ||
		message.includes("necesito un crédito") ||
		message.includes("necesito un credito")
	) {
		response = await handlePayload("SI_COTIZAR", user, agent);
	} else if (
		message.includes("de que parte son") ||
		message.includes("se ubican") ||
		message.includes("ubicacion") ||
		message.includes("ubicación") ||
		message.includes("instalacion") ||
		message.includes("instalación") ||
		message.includes("se encuentran") ||
		message.includes("donde estan") ||
		message.includes("donde son") ||
		message.includes("que parte de la republica") ||
		message.includes("que parte de la república")
	) {
		response = [
			genText(
				`Nuestras oficinas están ubicadas en la ciudad de Aguascalientes en Avenida Las Américas 1701 ` +
				`Locales 39, 40 y 60, Centro Comercial El Dorado,Fracc. ValleDorado, C.P. 20235."`
			),
			genText(
				`Tenemos cobertura en todo el país con más de 265 agentes ` +
				`Los trámites son 100% en línea por medio de Asistencia teléfonica, Whatsapp y Correo Electrónico."`
			),
		];
	} else if (
		message.includes("estafa") ||
		message.includes("engaño") ||
		message.includes("es estafa") ||
		message.includes("es engaño") ||
		message.includes("engañan") ||
		message.includes("que engañan") ||
		message.includes("mienten") ||
		message.includes("que mienten") ||
		message.includes("mentirosos") ||
		message.includes("son mentiras") ||
		message.includes("mentiroso") ||
		message.includes("son mentirosos")
	) {
		response = [
			genText(
				`Estos créditos, estan regulados por IMSS mediante el articulo 118 de la Ley del seguro ` +
				`social van dirigidos a pensionados por Ley 73 somos Distribuidores autorizados por Banco Multiva ` +
				`y Consubanco Institucion de Banca Multiple mi nombre es ${agent.name} ${agent.lastName} asesor autorizado ` +
				`mi numero de contacto para llamada o WhatsApp es ${agent.phone} son creditos con descuento vía nómina ` +
				`con tasa preferencial desde el 2% mensual y van desde los $15.000 hasta los $600.000.`
			),
		];
	} else if (
		message.includes("que papeles") ||
		message.includes("que documentos") ||
		message.includes("que requisitos") ||
		message.includes("que se ocupa")
	) {
		response = [
			genText(
				"La documentación requerida es: INE vigente, último estado de cuenta y comprobante de domicilio"
			),
		];
	} else if (message === "si") {
		if (user.isWaitingConfirmPhone) {
			response = await handlePayload("NUMBER_CONFIRMED", user, agent);
		} else if (user.isWaitingConfirmMensualidades) {
			response = await handlePayload("SEND_COTIZACION", user, agent);
		} else if (user.isWaitingEnd) {
			response = await handlePayload("HAPPY_END", user, agent);
		}
	} else if (message === "no") {
		if (user.isWaitingConfirmMensualidades) {
			response = await handlePayload("SI_COTIZAR", user, agent);
		} else if (user.isWaitingEnd) {
			response = await handlePayload("INFORMATION", user, agent);
		}
	} else {
		response = [
			genText(
				`Sr@ ${user.name} me gustaría brindarle una información más exacta, en unos momentos su asesor se pondrá en contacto.`
			),
			genText(
				`Si esto no sucede o no contesta sus mensajes, puede escribirnos ` +
				`por whatsapp a este número 4495843856 y le estaremos atendiendo. \nQuejas o cambios de asesor: 4499967297, 4496882899, 4496887301, 4496887302.`
			),
		];
	}
	// await createUser(user);
	const currentMessage = await getCurrentMessage(user, agent);
	if (Array.isArray(response)) {
		if (Array.isArray(currentMessage)) {
			response = response.concat(currentMessage);
		} else {
			response.push(currentMessage);
		}
	} else {
		if (Array.isArray(currentMessage)) {
			response = [response].concat(currentMessage)
		} else {
			response = [response, currentMessage];
		}
	}
	return response;
}

export default handleTextCreditos;