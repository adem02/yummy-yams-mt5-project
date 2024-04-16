import React, {useContext, useEffect} from 'react'
import './App.css'
import Dice from "./components/Dice.tsx";
import Navbar from "./components/Navbar.tsx";
import {AppContext} from "./store/app.context.tsx";
import {images} from "./utils";
import WinnersList from "./components/WinnersList.tsx";

const App = () => {
    const {dices, rollDices} = useContext(AppContext);
    const {user, triesLeft, getAuthUser, token, pastriesWon, pastriesCount, getPastriesCount} = useContext(AppContext);

    const launch = () => rollDices();

    useEffect(() => {
        getPastriesCount();
        if (token) {
            getAuthUser();
        }
    }, []);

    return (
        <React.Fragment>
            <Navbar />
            <div>
                <h1>Yam's</h1>

                {dices.map((dice, index) =>
                    <Dice key={index} value={dice}/>
                )}

                <div
                    className="mt-2 text-gray-300 text-sm font-semibold bg-gray-800 bg-opacity-75 px-2 py-1 rounded-md shadow-lg animate-pulse">
                    Il y'a {pastriesCount} patisseries restant(es) à gagner
                </div>

                <div className="actions">
                    <button disabled={user === null || !triesLeft || pastriesWon.length > 0}
                            onClick={launch}>Launch({triesLeft || 0})
                    </button>
                </div>

                <div>
                    {pastriesWon.length > 0 && (
                        <div className="mt-4 bg-blue-900 p-4 rounded-lg shadow-lg">
                            <h3 className="text-white text-lg font-bold mb-2">Pâtisseries gagnées :</h3>
                            <ul className="flex justify-center items-center flex-wrap gap-4">
                                {pastriesWon.map((value, index) => (
                                    <li key={index} className="text-yellow-300 text-sm">
                                        <img height={250} width={400} src={images[value]} alt={'Pâtisserie'}/>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {pastriesCount <= 0 && <WinnersList />}
            </div>
        </React.Fragment>
    )
}

export default App;
