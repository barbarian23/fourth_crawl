import { MAIN_URL } from "../../../common/constants/common.constants";

function socketServer(server) {
    // socketServer.io = require('socket.io')(server, {
    //     cors: {
    //         origin: MAIN_URL,
    //         methods: ["GET", "POST"],
    //         transports: ['websocket', 'polling'],
    //         credentials: true
    //     },
    //     allowEIO3: true
    // });
    socketServer.io = require('socket.io')(server, {
        wsEngine: 'ws'
    });
    // socketServer.io = require('socket.io')(server);
    console.log("socketServer");
    let socketCLI = {
        receive: function (receive) {
            socketServer.io.on('connection', (client) => {
                receive(client);
            });
        },
        send: function (type, data) {
            try {
                //console.log("socketServer send data",data);

                socketServer.io.emit(type, data);

            } catch (e) {
                console.log("socketServer eror when send data", data, "server says", e);
            }
        }
    }
    return socketCLI;
}

export default socketServer;