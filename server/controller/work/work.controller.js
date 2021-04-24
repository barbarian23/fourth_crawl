import seleniumCrawl from "../../service/crawler/selenium.server.service";
import socketServer from "../../service/socket/socket.server.service";
import { SOCKET_LOGIN, SOCKET_LOGIN_STATUS } from "../../../common/constants/common.constants";

var socket = null;
const seleniumInsstance = new seleniumCrawl();

const workingController = function (server) {
    socket = socketServer(server);
    socket.receive((receive) => {
        // receive.on(SOCKET_LOGIN, function (data) {
        //     login(data.username, data.password);
        // });
        receive.on(SOCKET_LOGIN, login);
    });
}

const login = function(data){
    console.log(data.username, data.password);
    socket.send(SOCKET_LOGIN_STATUS,{data:"yea1"});
    seleniumInsstance.goto("https://google.com");
}

export default workingController;