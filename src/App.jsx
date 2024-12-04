import React, { useEffect, useState } from 'react';
import './App.css';
import {socket, userObject} from "./socket/socket";
import {ScrambledText} from "./utils/scrableText";



export const App = () => {
    const [dataUsers, setDataUsers] = useState([]);

    // подключить для бота

    // const [initData, setInitData] = useState(null);

    // useEffect(() => {
    //     if (typeof Telegram !== 'undefined' && Telegram.WebApp) {
    //         const data = Telegram.WebApp.InitData;
    //         setInitData(data);
    //         console.log("InitData:", data);
    //     } else {
    //         console.error("Telegram WebApp не доступен");
    //     }
    // }, []);

    useEffect(() => {
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
                <ScrambledText text={userObject.username} />
                <ScrambledText
                    text={`${dataUsers.find((user) => user.user_nick === userObject.username)?.daily_points || '0'}°`}
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

