interface IMessage extends Document {
    id: string;
    conversationId: string;
    isOwn: boolean;
    userId: string;
    agentId: string;
    type: string;
    message?: string;
    atachment?: any;
    payload?: string;
    status: string;
    document_type?: string;
}

export default IMessage;