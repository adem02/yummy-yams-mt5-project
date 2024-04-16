import React, {ReactNode, useEffect, useState} from "react";
import axios from "axios";
import {UserResponse} from "../models/user.model.ts";
import {getImageNames, images} from "../utils";

const WinnersList: React.FC<{children?: ReactNode}> = (props) => {
    const userUri = import.meta.env.VITE_API_USER_ROUTES;
    const [winners, setWinners] = useState<UserResponse[]>([]);

    useEffect(() => {
        const fetchWinners = async () => {
            const response = await axios.get(userUri);
            console.log(response.data.users)
            setWinners(response.data.users);
        };

        fetchWinners();
    }, []);

    return (
        <div className="mt-8 bg-blue-900 p-6 rounded-lg shadow-lg text-center mx-auto">
            <h3 className="text-white text-lg font-bold mb-4">Liste des gagnants :</h3>
            <ul className="space-y-4">
                {winners.map((winner, index) => (
                    <li key={index} className="flex flex-col items-center space-y-2">
                        <div>
                            <p className="text-yellow-300 text-sm font-semibold">{winner.username}</p>
                            <p className="text-gray-400 text-xs">{winner.email}</p>
                        </div>
                        <div className="flex justify-center space-x-4">
                            {getImageNames(...winner.pastriesWon).map((pastry, pIndex) => (
                                <img
                                    key={pIndex}
                                    src={images[pastry]}
                                    alt={pastry.image}
                                    className="w-16 h-16 rounded-full object-cover shadow-md"
                                />
                            ))}
                        </div>
                    </li>
                ))}
            </ul>
            {props.children}
        </div>
    )
}

export default WinnersList;