interface dataIncomes {
    date: string;
    amount: number;
}
interface Iad {
    link: string;
    isActive: boolean;
}

interface IAgent extends Document {
    id: string;
    name: string;
    lastName: string;
    username: string;
    phone: string;
    email: string;
    users: any;
    roles: string[];
    userImgs: any[];
    createdAt: string;
    updatedAt: string;
    type: string;
    totalUsers: number;
    totalFollowUsers: number;
    totalClosedUsers: number;
    password: string;
    isWhatsSended: boolean;
    aceptNotif: boolean;
    product: string;
    status: string
    bot_id: string;
    loginToken: string;
    totalIncomes: dataIncomes[];
    ads: Iad[];
    isComments?: boolean;
    isRenovation?: boolean;
    imagesUpdated?: boolean;
    verified?: boolean; 
    deleted?: boolean; 
    isMacro?: boolean;
    isMultiva?: boolean; 
}

export default IAgent;