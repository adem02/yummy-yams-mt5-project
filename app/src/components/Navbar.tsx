import React, {ReactNode, useContext, useState} from "react";
import AuthInputs from "./AuthInputs.tsx";
import LoginOrRegister from "./LoginOrRegister.tsx";
import axios from "axios";
import {AppContext} from "../store/app.context.tsx";

type NavbarProps = {
    children?: ReactNode;
}

const Navbar: React.FC<NavbarProps> = () => {
    const [isRegistered, setIsRegistered] = useState<boolean>(true)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const {user, login, logout, register} = useContext(AppContext);

    const toggleRegistration = () => setIsRegistered(!isRegistered);

    const resetCredentials = () => {
        setEmail('');
        setPassword('');
        setUsername('');
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        isRegistered ? login({email, password}) : register({username, email, password});

        resetCredentials();
    }

    return (
        <div className="bg-blue-800 text-white py-2">
            <div className="container mx-auto flex items-center justify-between">
                <h1 className="text-lg font-semibold">Yam's</h1>
                {user === null ?
                    <div className="flex items-center space-x-2">
                        <AuthInputs
                            email={email}
                            password={password}
                            username={username}
                            isRegistered={isRegistered}
                            setEmail={(email: string) => setEmail(email)}
                            setPassword={(password: string) => setPassword(password)}
                            setUsername={(username: string) => setUsername(username)}
                        />

                        <div className="flex flex-col items-end">
                            <LoginOrRegister onClick={onSubmit} isRegistered={isRegistered}/>
                            <span
                                onClick={toggleRegistration}
                                className="text-yellow-400 hover:text-yellow-300 mt-1 cursor-pointer"
                                style={{fontSize: '11px'}}>
                                {isRegistered ? "Pas encore inscrit ? S'inscrire" : "Déjà inscrit ? Se connecter"}
                            </span>
                        </div>
                    </div> :
                    <div>
                        <span>Hello, {user.username}</span>
                        <button className={"text-sm bg-yellow-700 hover:bg-yellow-600 px-12 py-1 mx-2 rounded transition duration-300"}
                            onClick={logout}>Logout</button>
                    </div>
                }
            </div>
        </div>
    )
}

export default Navbar;