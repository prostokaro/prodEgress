const url = "wss://dedata.degrees.tg/ws";
export let socket = new WebSocket(url);


export const userObject = {
    id: 498478092,
    first_name: 'Karo',
    last_name: '',
    username: 'karo_d',
    language_code: 'ru',
    is_premium: true,
    allows_write_to_pm: true,
    photo_url: '',
};

const encodedUserData = encodeURIComponent(JSON.stringify(userObject));



socket.onopen = function () {

    if (window.Telegram?.WebApp) {
        const webApp = window.Telegram.WebApp;
        socket.send(JSON.stringify({
            type: "init_data",
            data: JSON.stringify(webApp.initData),
            inviter_id: null,
        }));
    }

    // socket.send(JSON.stringify({
    //     type: "init_data",
    //     data: `user=${encodedUserData}&chat_instance=3646087275955135803&chat_type=private&auth_date=${Math.floor(Date.now() / 1000)}&signature=Gp0bQ1hhTZQ-G4NQVL7wAH_oL8BTPg5JIH1AnFO_G-GcDe3kyMgVJp7o-wV3Ref7Y44u9VIEUema_gH_-F8OBA&hash=6e38803cb628c9eb3b273415ba869e65db43519690d6a98f78ca4b5b7023802a`,
    //     inviter_id: null,
    // }));
    console.log("Соединение установлено");
};

socket.onerror = function (error) {
    console.error("Ошибка WebSocket:", error);
};

socket.onclose = function (event) {
    if (event.wasClean) {
        console.log(`Соединение закрыто: код=${event.code}, причина=${event.reason}`);
    } else {
        console.error('Обрыв соединения');
    }
};
