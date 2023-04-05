import IAgentModel from "../../interfaces/agent.interface";
import ICustomer from "../../interfaces/customer.interface";
import ResponseBot from "../../controllers/response";
import config from "../../config/config";

const responseBot = new ResponseBot(config.dialog.NAMESPACE);

const handlePayload = async(payload: string, user: ICustomer, agent: IAgentModel) => {
    let response: any[]|any = [];

    if (
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
      
    } else if (payload.includes("BENEFICIOS")) {
      response = []
      agent.userImgs[0]
        ? response.push(responseBot.genImage(`${agent.userImgs[3].Location}`))
      : null;
      response = response.concat([
        responseBot.genText(
          `Sr@ ${user.name} nuestro modelo de negocio atiende al mejor mercado que son los pensionados ` +
          `IMSS, hoy los mejores bancos buscan llegar a este nicho y nosotros somos lideres a nivel nacional.`
        ),
        responseBot.genText(
          `Cada venta ofrece comisiones desde los $3,000 hasta los $25,000 por ticket.`
        ),
        responseBot.genText(
          `Este negocio es tan bueno que no necesitas invertir nada más, puedes trabajarlo desde casa ` +
          `y te permite acceder a todo el mercado a nivel nacional.`
        )
      ]);
      response.push(
        responseBot.genTemplate("dist_site")
      );
    } else if (payload.includes("BENEFICIOS")) {
      response = []
      agent.userImgs[3]
        ? response.push(responseBot.genImage(`${agent.userImgs[3].Location}`))
      : null;
      response = response.concat([
        responseBot.genText(
          `Sr@ ${user.name} nuestro modelo de negocio atiende al mejor mercado que son los pensionados ` +
          `IMSS, hoy los mejores bancos buscan llegar a este nicho y nosotros somos lideres a nivel nacional.`
        ),
        responseBot.genText(
          `Cada venta ofrece comisiones desde los $3,000 hasta los $25,000 por ticket.`
        ),
        responseBot.genText(
          `Este negocio es tan bueno que no necesitas invertir nada más, puedes trabajarlo desde casa ` +
          `y te permite acceder a todo el mercado a nivel nacional.`
        )
      ]);
      response.push(
        responseBot.genTemplate("dist_site")
      );
    } else if (payload.includes("TRANSPARENCIA")) {
      response = [
        responseBot.genTemplate("transparencia_template")
      ];
    } else if (payload.includes("REQUISITOS")) {
      response = [
        responseBot.genText(
          `Los requísitos para ser acreedor de nuestra distribución son muy sencillos:
          1.- CONTRATO
          2.- PAGO ÚNICO
          `
        ),
        responseBot.genImageTemplate("contract_site", "https://cwvlconsultoria.com/wp-content/uploads/2022/04/cwvl_logo.jpg"),
        responseBot.genImage(`${agent.userImgs[3].Location}`)
      ];
    } else if (payload.includes("SITIO WEB")) {
      response = [
        responseBot.genImageTemplate("web_site", "https://cwvlconsultoria.com/wp-content/uploads/2022/04/cwvl_logo.jpg")
      ];
    } else if (payload.includes("DISTRIBUCIÓN")) {
      response = [
        responseBot.genImageTemplate("dist_site", "https://cwvlconsultoria.com/wp-content/uploads/2022/04/cwvl_logo.jpg")
      ];
    } else if (payload.includes("AVISO DE PRIVACIDAD")) {
      response = [
        responseBot.genImageTemplate("privacy_policy", "https://cwvlconsultoria.com/wp-content/uploads/2022/04/cwvl_logo.jpg")
      ];
    } else {
      response = response.concat([
        responseBot.genText(
          `Sr@ ${user.name} nuestro modelo de negocio atiende al mejor mercado que son los pensionados ` +
          `IMSS, hoy los mejores bancos buscan llegar a este nicho y nosotros somos lideres a nivel nacional.`
        ),
        responseBot.genText(
          `Cada venta ofrece comisiones desde los $3,000 hasta los $25,000 por ticket.`
        ),
        responseBot.genText(
          `Este negocio es tan bueno que no necesitas invertir nada más, puedes trabajarlo desde casa ` +
          `y te permite acceder a todo el mercado a nivel nacional.`
        )
      ]);
    }
    return response;
}

export default handlePayload;
