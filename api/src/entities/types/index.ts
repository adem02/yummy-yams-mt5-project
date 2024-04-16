import {Request} from "express";

export interface RegisterUserPayload {
    username: string;
    email: string;
    password: string;
}

export interface LoginUserPayload {
    email: string;
    password: string;
}

export interface AuthUser {
    userId?: string;
    token?: string;
}

export interface UserResponse {
    username: string;
    email: string;
    nbOfTriesLeft: number;
    pastriesWon: string[];
}

export interface PastriesWon {
    id: string;
    slug: string;
}

export interface AuthRequest extends AuthUser, Request {}