import IBodyRequest from '../models/request.model';

export default class ResponseBot {
  namespace: string;

  constructor(namespace: string) {
    this.namespace = namespace;
  }

  genQuickReply(text: string, quickReplies: any[]) {
    let response: { text: string; quick_replies: any } = {
      text: text,
      quick_replies: [],
    };
    for (let quickReply of quickReplies) {
      if (quickReply !== null) {
        response.quick_replies.push({
          content_type: quickReply["content_type"]
            ? quickReply["content_type"]
            : "text",
          title: quickReply["title"],
          payload: quickReply["payload"],
        });
      }
    }
    return response;
  }

  genGenericTemplate(
    image_url: string,
    title: string,
    subtitle: string,
    buttons: any[]
  ) {
    let response = {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [
            {
              title: title,
              subtitle: subtitle,
              image_url: image_url,
              buttons: buttons,
            },
          ],
        },
      },
    };
    return response;
  }

  genTemplate(
    title: string
  ) {
    let response = {
      type: "template",
      template: {
        namespace: this.namespace,
        language: {
          policy: "deterministic",
          code: "ES_MX"
        },
        name: `${title}`
      },
    };
    return response;
  }

  genImageTemplate(title: string, image_url: string) {
    let response = {
      type: "template",
      template: {
        namespace: this.namespace,
        language: {
          policy: "deterministic",
          code: "ES_MX"
        },
        name: `${title}`,
        components: [
          {
            type: "header",
            parameters: [
              {
                type: "image",
                image: {
                  link: `${image_url}`
                }
              }
            ]
          }
        ]
      },
    };
    return response;
  }

  genImage(image_url: string) {
    let response: IBodyRequest = {
      recipient_type: "individual",
      to: ``,
      type: "image",
      image: {
          link: image_url,
      },
    };
    return response;
  }

  genButtonTemplate(title: string, buttons: any[] | null) {
    let response = {
      "to": "",
      "type": "template",
      "template": {
          "namespace": this.namespace,
          "language": {
              "policy": "deterministic",
              "code": "ES_MX"
          },
          "name": title,
      }
    };

    return response;
  }

  genText(text: string) {
    let response: IBodyRequest = {
      recipient_type: "individual",
      to: "",
      type: "text",
      text: { body: text },
    };

    return response;
  }

  genPostbackButton(title: string, payload: string) {
    let response = {
      type: "postback",
      title: title,
      payload: payload,
    };

    return response;
  }

  genWebUrlButton(title: string, url: string) {
    let response = {
      type: "web_url",
      title: title,
      url: url,
      messenger_extensions: true,
    };

    return response;
  }
};
