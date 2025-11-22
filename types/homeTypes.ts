export interface headerType {
    title: string;
    subtitle: string;
}

export interface cardsType {
    title: string;
    price: number;
    description: string[];
    button: {
        type: string;
        text: string;
    };
}

export interface tableType {
    title: string;
    gratis: boolean;
    pro: boolean;
    empresa: boolean;
}
