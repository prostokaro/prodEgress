const url = "wss://dedata.degrees.tg/ws";
export let socket = new WebSocket(url);

socket.onopen = function () {

    if (window.Telegram?.WebApp) {
        const webApp = window.Telegram.WebApp;
        socket.send(JSON.stringify({
            type: "init_data",
            data: JSON.stringify(webApp.initData),
            inviter_id: null,
        }));
    }

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
