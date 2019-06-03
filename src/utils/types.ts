interface User {
    id?: number;
    username?: string;
    password?: string;
    blacklist?: boolean;
    admin?: boolean;
    connected?: boolean;
    colour?: string;
}

interface Conversation {
    id?: number;
    active?: boolean;
    theme?: string;
}

interface Message {
    id?: number;
    idUser?: number;
    idConversation?: number;
    message?: string;
}

export { User, Conversation, Message };

