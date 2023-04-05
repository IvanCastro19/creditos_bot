import IContacts from "./contact.model";
import ILocation from "./location.model";

export interface IText {
    body: string;
}

export interface IMedia {
    id?: string;
    link?: string;
    caption?: File;
    filename?: string;
    provider?: string;
}

export interface IMage {
    link: string;
}

export default interface IBodyRequest {
    preview_url?: boolean;
    recipient_type: string;
    template?: string;
    type: string;
    to: string;
    ttl?: string;
    text?: IText;
    media?: IMedia;
    contacts?: IContacts;
    location?: ILocation;
    image?: IMage;
}



