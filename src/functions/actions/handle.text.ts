import handlePayload from "./handle.payload";
import ResponseBot from "../../controllers/response";
import IAgent from "../../interfaces/agent.interface";
import ICustomer from "../../interfaces/customer.interface";
import config from "../../config/config";
import { genImage, genText } from "./response";
import { getCurrentMessage } from "./utilities";
import { updateState } from '../api/customers.api'

// Handles messages events with text
const responseBot = new ResponseBot(config.dialog.NAMESPACE);

// Handles messages events with text
const handleTextMessage = async (
  message: String,
  user: any,
  agent: IAgent
) => {
  message = message.trim().toLowerCase();
  let response: any;

  if (
    message.includes("volver a empezar") ||
    message === "hola" ||
    message === "empezar"
  ) {
    user.isStarted = true;
    response = [];
    if (agent) {
      if (agent.userImgs) {
        agent.userImgs[1]
          ? response.push(responseBot.genImage(`${agent.userImgs[1].Location}`))
          : null;
      } else {
        user.isStarted = false;
      }
      response.push(
        responseBot.genImageTemplate(
          "best_sellers_start", 
          "https://i.imgur.com/pgJr2Sl.jpg"
        )
      )
    } else {
      user.isStarted = false;
    }
    await updateState(user.wa_id);
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
  } else if(message.includes("info")) {
    response = [
      responseBot.genTemplate("info_template")
    ];
  } else {
    response = [
      
    ];
  }
  let currentMessage = await getCurrentMessage(user, agent);
  if(Array.isArray(response)) {
    if(Array.isArray(currentMessage)){
      response = response.concat(currentMessage);
    } else {
      response.push(currentMessage);
    }
  } else {
    if(Array.isArray(currentMessage)){
      response = [response].concat(currentMessage)
    } else {
      response = [response, currentMessage];
    }
  }
  return response;
};

export default handleTextMessage;