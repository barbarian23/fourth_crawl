import { MAIN_URL } from "../../../common/constants/common.constants";

function socketServer(server) {
    socketServer.io = require('socket.io')(server, {
        cors: {
            origin: MAIN_URL,
            methods: ["GET", "POST"],
            transports: ['websocket', 'polling'],
            credentials: true
        },
        allowEIO3: true
    });
    console.log("socketServer");
    let socketCLI = {
        receive: function (receive) {
            socketServer.io.on('connection', (client) => {
                receive(client);
            });
        },
        send: function(type,data){
            socketServer.io.emit(type,data);
        }
    }
    return socketCLI;
}

export default socketServer;