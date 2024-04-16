export interface User {
    email: string;
    username: string;
    password: string;
    nbOfTriesLeft?: number;
    pastriesWon?: string[];
    createdAt: Date;
}