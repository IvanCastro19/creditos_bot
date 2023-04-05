export interface IAdress {
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
    country_code?: string;
    type?: string;
}

export interface IEmail {
    email?: string;
    type?: string;
}

export interface IName {
    formatted_name: string;
    first_name?: string;
    last_name?: string;
    middle_name?: string;
    suffix?: string;
    prefix?: string;
}

export interface IOrg {
    company?: string;
    department?: string;
    title?: string;
}

export interface IPhone {
    phone?: string;
    type?: string;
    wa_id?: string;
}

export interface IUrl {
    url?: string;
    type?: string;
}

export default interface IContacts {
    adresses?: IAdress[];
    birthday?: string;
    emails?: IEmail[];
    name: IName;
    org?: IOrg;
    phones?: IPhone[];
    urls?: IUrl[];
}