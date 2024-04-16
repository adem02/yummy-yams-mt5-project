import React, {useState} from "react";
import {User, UserResponse} from "../models/user.model.ts";
import {LogUserPayload, RegisterUserPayload} from "../models/auth.model.ts";
import axios from "axios";
import {getImageNames} from "../utils";

interface AuthContextType {
    token: string;
    user: User | null,
    triesLeft: number|null,
    dices: number[],
    pastriesWon: string[],
    pastriesCount: number,
    register: () => void,
    login: (payload: LogUserPayload) => void,
    logout: () => void,
    rollDices: () => void,
    getAuthUser: () => void,
    getPastriesCount: () => void,
}

export const AppContext = React.createContext<AuthContextType>({
    token: false,
    user: null,
    triesLeft: null,
    pastriesCount: -1,
    dices: [],
    pastriesWon: [],
    register: () => {},
    login: () => {},
    logout: () => {},
    getAuthUser: () => {},
    getPastriesCount: () => {}
})

const AuthContextProvider: React.FC<AuthContextType> = (props) => {
    const [user, setUser] = useState<User|null>(null);
    const [token, setToken] = useState<string>(localStorage.getItem('token') || '');
    const [triesLeft, setTriesLeft] = useState<number|null>(null);
    const [dices, setDices] = useState<number[]>([0, 0, 0, 0, 0]);
    const [pastriesWon, setPastriesWon] = useState([])
    const [pastriesCount, setPastriesCount] = useState(-1);
    const authUri = import.meta.env.VITE_API_AUTH_ROUTES;
    const diceUri = import.meta.env.VITE_API_DICE_ROUTES;
    const pastryUri = import.meta.env.VITE_API_PASTRY_ROUTES;

    const registerUserHandler = async (payload: RegisterUserPayload) => {
        const {data} = await axios.post(`${authUri}/register`, payload, {
            ...payload
        });


        const userResponse: UserResponse = data.user as UserResponse;
        const user: User = {
            email: userResponse.email,
            username: userResponse.username,
        }

        setUser(user);
        setToken(data.token);
        setTriesLeft(userResponse.nbOfTriesLeft);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', data.token);
    }

    const logoutUserHandler = () => {
        setUser(null);
        setToken('');
        setPastriesWon([]);
        setTriesLeft()
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    }

    const loginUserHandler = async (payload: LogUserPayload) => {
        const {data} = await axios.post(`${authUri}/login`, {
            ...payload
        });

        const userResponse: UserResponse = data.user as UserResponse;
        const user: User = {
            email: userResponse.email,
            username: userResponse.username,
        }

        setUser(user);
        setToken(data.token);
        setTriesLeft(userResponse.nbOfTriesLeft);
        setPastriesWon(getImageNames(...userResponse.pastriesWon))
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', data.token);
    }

    const rollDicesHandler = async () => {
        const token = localStorage.getItem('token');

        if (!token) {
            console.log('Not logged in');
        }

        const {data} = await axios.post(`${diceUri}`,
            {},
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );

        const userResponse: UserResponse = data.user as UserResponse;
        const {dices} = data;

        if (userResponse.pastriesWon.length > 0) {
            setPastriesWon(getImageNames(...userResponse.pastriesWon));

            await getPastriesCountHandler();
        }

        setDices(dices);
        setTriesLeft(userResponse.nbOfTriesLeft);
    }

    const getAuthUserHandler = async () => {

        try {
            const {data} = await axios.get(`${authUri}/me`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            const userResponse: UserResponse = data.user as UserResponse;
            const user: User = {
                email: userResponse.email,
                username: userResponse.username,
            }

            setUser(user);
            setToken(data.token);
            setTriesLeft(userResponse.nbOfTriesLeft);
            setPastriesWon(getImageNames(...userResponse.pastriesWon));
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', token);
        } catch (error) {
            console.log('No');
        }
    }

    const getPastriesCountHandler = async () => {
        const {data} = await axios.get(`${pastryUri}`);

        setPastriesCount(data.count);
    }

    const contextValue: AuthContextType = {
        user,
        token,
        triesLeft,
        dices,
        pastriesWon,
        pastriesCount,
        register: registerUserHandler,
        login: loginUserHandler,
        logout: logoutUserHandler,
        rollDices: rollDicesHandler,
        getAuthUser: getAuthUserHandler,
        getPastriesCount: getPastriesCountHandler
    };

    return <AppContext.Provider value={contextValue}>
        {props.children}
    </AppContext.Provider>
}

export default AuthContextProvider;