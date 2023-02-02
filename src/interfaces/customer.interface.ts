interface ICustomer {
    wa_id: string;
    Fid: string;
    name: string;
    lastName: string;
    phone: string; 
    email: string;
    last_Message: object;
    status: string;
    isIMSS: boolean;
    isJorP: boolean;
    amount: number;
    agent: string;
    reason: string;
    createdAt: object;
    mensualidades: number;
    countMessages: number;
    isLastMessageSended: boolean;
    isStarted: boolean;
    isWhatsSended: boolean;
    emailSended: boolean;
    isWaitingPhone: boolean;
    isWaitingConfirmPhone: boolean;
    isWaitingAmount: boolean;
    isWaitingConfirmAmount: boolean;
    isWaitingMensualidades: boolean;
    isWaitingEnd: boolean;
    isWaitingConfirmMensualidades: boolean;
    isPhoneConfirmed: boolean;
    isAmountConfirmed: boolean;
    isMensualidadesConfirmed: boolean;
    isMessageSended: boolean;
    pageId: string;
    lastUpdatePhone: string;
    dateLastMessageSended: string;
    dateMessageSended: string;
    state: string;
    endConfirm: boolean;
    agentStatus: string;
    idAd?: string;
    sourceId?: string;
    isComments?: boolean;
    isRenovation?: boolean;
    phoneList?: string[];
    CURP: string;
    NSS: string;
    campaign_name?: string;
    campaign_id?: string;
    birthday?: string;
    birthdayNotified?: boolean;
    age: number;
    isMultiva: boolean;
    isMacro: boolean;
    responseMessage: boolean;
    macro_sended: Date;
    type_macro: string;
}

export default ICustomer;