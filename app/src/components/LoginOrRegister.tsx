import React, {FC, ReactNode, useState} from "react";

type LoginOrRegisterProps = {
    isRegistered: boolean;
    onClick: () => void;
}

const LoginButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
    return (
        <button onClick={onClick}
                className="text-sm bg-blue-700 hover:bg-blue-600 px-12 py-1 rounded transition duration-300">
            Se connecter
        </button>
    )
}

const RegisterButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
    return (
        <button onClick={onClick}
                className="text-sm bg-yellow-400 hover:bg-yellow-300 px-12 py-1 rounded transition duration-300">
            S'inscrire
        </button>
    );
}

const LoginOrRegister: FC<LoginOrRegisterProps> = ({ isRegistered, onClick }) => {
    return (
        isRegistered ? <LoginButton onClick={onClick} /> : <RegisterButton onClick={onClick} />
    )
}

export default LoginOrRegister;