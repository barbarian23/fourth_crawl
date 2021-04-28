import seleniumCrawl from "../../service/crawler/selenium.server.service";
import socketServer from "../../service/socket/socket.server.service";
import { 
    SOCKET_LOGIN, 
    SOCKET_LOGIN_STATUS, 
    SOCKET_WORKING_SINGLE_NUMBER,
    SOCKET_WORKING_ADDED_NUMBER
} from "../../../common/constants/common.constants";
import { HOME_URL } from "../../constants/work/work.constants";

var socket = null;
const seleniumInsstance = new seleniumCrawl();

let obJectNumber = [
    // {
    //     number:"090090090",
    //     money:10000,
    //     interval:null,
    //     change:false,
    // }
];


const workingController = function (server) {
    socket = socketServer(server);
    socket.receive((receive) => {
        // receive.on(SOCKET_LOGIN, function (data) {
        //     login(data.username, data.password);
        // });
        receive.on(SOCKET_LOGIN, login);

        receive.on(SOCKET_WORKING_SINGLE_NUMBER, addNumber);
    });
}

const login = function(data){
    console.log(data.username, data.password);
    socket.send(SOCKET_LOGIN_STATUS,{data:"login"});
    //seleniumInsstance.goto(HOME_URL);
}

const addNumber = function(data){
    console.log("theem soos",data.value);
    //kiểm tra có bị trùng
    obJectNumber.push();
    socket.send(SOCKET_WORKING_ADDED_NUMBER,data.value);
    //seleniumInsstance.goto(HOME_URL);
}

export default workingController;