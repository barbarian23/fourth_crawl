import openSocket from 'socket.io-client';

function socketClient(url){
    let socketCLI = {
        open: openSocket(url),
        receive: function(event,callback){
            socket.on(event,callback);
        },
        send: function(event,data){
            socket.emit(event,data);
        }
    }
    return socketCLI;
}
export default socketClient;