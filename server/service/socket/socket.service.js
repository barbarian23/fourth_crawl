import { PORT } from "../../../common/constants/common.constants";

function socketServer(app) {
    //khởi tạo
    socketServer.io = require('socket.io');
    socketServer.server = require('http');

    //gán biến
    socketServer.server.createServer(app);
    socketServer.server.listen(PORT);

    let socketCLI = {
        connect: function (receive, send, disconnect) {
            socketServer.sockets.io.on('connection', (client) => {
                receive(client);
                // client.on('new user', function(name, data){
                // }

                client.on('disconnect', function(data){
                    console.log("disconect",data);
                    if (!socket.nickname) return;
                    disconnect(data);
                });
            });

        }
    }

    io.sockets.on('connection', function (socket) {
        socket.on('new user', function (name, data) {
            if (name in users) {
                data(false);
            } else {
                data(true);
                socket.nickname = name;
                users[socket.nickname] = socket;
                console.log('add nickName');
                updateNickNames();
            }

        });

        function updateNickNames() {
            io.sockets.emit('usernames', Object.keys(users));
        }
        socket.on('open-chatbox', function (data) {
            users[data].emit('openbox', { nick: socket.nickname });
        });
        socket.on('send message', function (data, sendto) {
            users[sendto].emit('new message', { msg: data, nick: socket.nickname, sendto: sendto });
            users[socket.nickname].emit('new message', { msg: data, nick: socket.nickname, sendto: sendto });

            console.log(data);
        });
        socket.on('disconnect', function (data) {
            if (!socket.nickname) return;
            delete users[socket.nickname];
            updateNickNames();
        });
    });

    return socketCLI;
}

export default socketServer;