import IBodyRequest from "../../interfaces/request_360.interface";
import config from "../../config/config";

const { NAMESPACE } = config.dialog;

export const genQuickReply = (text: string, quickReplies: any[]) => {
	const response: { text: string; quick_replies: any } = {
		text: text,
		quick_replies: [],
	};
	for (const quickReply of quickReplies) {
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
};

export const genGenericTemplate = (
	image_url: string,
	title: string,
	subtitle: string,
	buttons: any[]
) => {
	const response = {
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
};

export const genTemplate = (title: string) => {
	const response = {
		type: "template",
		template: {
			namespace: NAMESPACE,
			language: {
				policy: "deterministic",
				code: "ES_MX",
			},
			name: `${title}`,
		},
	};
	return response;
};

export const genImageTemplate = (title: string, image_url: string) => {
	const response = {
		type: "template",
		template: {
			namespace: NAMESPACE,
			language: {
				policy: "deterministic",
				code: "ES_MX",
			},
			name: `${title}`,
			components: [
				{
					type: "header",
					parameters: [
						{
							type: "image",
							image: {
								link: `${image_url}`,
							},
						},
					],
				},
			],
		},
	};
	return response;
};

export const genImage = (image_url: string) => {
	const response: IBodyRequest = {
		recipient_type: "individual",
		to: ``,
		type: "image",
		image: {
			link: image_url,
		},
	};
	return response;
};

export const genButtonTemplate = (title: string) => {
	const response = {
		to: "",
		type: "template",
		template: {
			namespace: NAMESPACE,
			language: {
				policy: "deterministic",
				code: "ES_MX",
			},
			name: title,
		},
	};

	return response;
};

export const genText = (text: string) => {
	const response: IBodyRequest = {
		recipient_type: "individual",
		to: "",
		type: "text",
		text: { body: text },
	};

	return response;
};

export const genPostbackButton = (title: string, payload: string) => {
	const response = {
		type: "postback",
		title: title,
		payload: payload,
	};

	return response;
};

export const genWebUrlButton = (title: string, url: string) => {
	const response = {
		type: "web_url",
		title: title,
		url: url,
		messenger_extensions: true,
	};

	return response;
};
