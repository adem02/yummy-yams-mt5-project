import React from "react";

type Props = {
    email: string;
    password: string;
    username: string;
    isRegistered: boolean;
    setEmail: (value: string) => void;
    setUsername: (value: string) => void;
    setPassword: (value: string) => void;
}

const AuthInputs: React.FC<Props> = (props) => {
    return (
        <React.Fragment>
            {props.isRegistered === false ? <input
                value={props.username}
                onChange={(e) => props.setUsername(e.target.value)}
                type="text"
                placeholder="Username"
                className="text-black px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
            /> : null}
            <input
                value={props.email}
                onChange={(e) => props.setEmail(e.target.value)}
                type="text"
                placeholder="Email"
                className="text-black px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <input
                value={props.password}
                onChange={(e) => props.setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                className="text-black px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
        </React.Fragment>
    )
}

export default AuthInputs;