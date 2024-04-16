export interface User {
    username: string;
    email: string;
}

export interface UserResponse {
    username: string;
    email: string;
    nbOfTriesLeft: number;
    pastriesWon: string[]
}
