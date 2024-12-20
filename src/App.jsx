import React, { useEffect, useState } from 'react';
import './App.css';
import {socket, userObject} from "./socket/socket";
import {ScrambledText} from "./utils/scrableText";



export const App = () => {
    const [dataUsers, setDataUsers] = useState([]);

    const [dataUser, setDataUser] = useState( '' );

    useEffect(() => {

        if (window.Telegram?.WebApp) {
            const webApp = window.Telegram.WebApp;
            setDataUser(webApp.initDataUnsafe.user.username)
            console.log(webApp.initDataUnsafe.user.username)
        }

        socket.onmessage = (event) => {
            const receivedMessage = JSON.parse(event.data);
            console.log(receivedMessage);

            if (receivedMessage.payload === 'Авторизация успешна') {
                socket.send(JSON.stringify({
                    event_type: "get_daily_points",
                    payload: {},
                }));
            }

            if (receivedMessage.type === "daily_points") {
                setDataUsers(receivedMessage.payload);
            }
        };
    }, []);

    return (
        <div className="app">
            <header className="app__header">
                <ScrambledText text={dataUser} />
                <ScrambledText
                    text={`${dataUsers.find((user) => user.user_nick === dataUser)?.daily_points || '0'}°`}
                />
            </header>
            <main className="app__users">
                {dataUsers.length > 0 ? (
                    dataUsers.map((user) => (
                        <div key={user.id} className="app__user">
                            <ScrambledText text={`${user.user_nick || 'Нет никнейма'}°`} />
                            <ScrambledText text={`${user.daily_points}°`} />
                        </div>
                    ))
                ) : (
                    <p className="app__user app__user--empty">none users</p>
                )}
            </main>
            <footer className="app__footer"></footer>
        </div>
    );
};

