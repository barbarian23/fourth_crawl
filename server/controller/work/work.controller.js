import seleniumCrawl from "../../service/crawler/selenium.server.service";
import socketServer from "../../service/socket/socket.server.service";
import csvService from "../../service/csv/csv.server.service";
import { 
    SOCKET_LOGIN, 
    SOCKET_LOGIN_STATUS, 
    SOCKET_GET_LIST_PHONE,
    SOCKET_LIST_PHONE,
    SOCKET_WORKING_SINGLE_NUMBER,
    SOCKET_WORKING_SOME_NUMBER,
    SOCKET_WORKING_ADDED_NUMBER,
    SOCKET_WORKING_ADDED_SOME_NUMBER,
    SOCKET_WORKING_DELETE_PHONE,
    SOCKET_WORKING_DELETED_PHONE,
} from "../../../common/constants/common.constants";
import doLogin from "../work/login.controller";
import { HOME_URL } from "../../constants/work/work.constants";

var socket = null;
const seleniumInsstance = new seleniumCrawl();
const csvInstance = new csvService();

let arrayNumber = [
    // {
    //     number:"090090090",
    //     money:10000,
    //     interval:null,
    //     change:false,
    // }
];

arrayNumber = csvInstance.readFile();

const workingController = function (server) {
    socket = socketServer(server);
    socket.receive((receive) => {
        // receive.on(SOCKET_LOGIN, function (data) {
        //     login(data.username, data.password);
        // });
        receive.on(SOCKET_LOGIN, login);

        //get list phone
        receive.on(SOCKET_GET_LIST_PHONE, getListPhone);
        
        // add number
        receive.on(SOCKET_WORKING_SINGLE_NUMBER, addNumber);

        // thêm sdt, số tiền qua file excel
        receive.on(SOCKET_WORKING_SOME_NUMBER, addSomeNumber);

        // delete sdt
        receive.on(SOCKET_WORKING_DELETE_PHONE, deletePhone);
        
    });
}

const login = function(data){
    console.log("login voi username va password",data.username, data.password);
   
    doLogin(data.username, data.password, socket);
    
    // socket.send(SOCKET_LOGIN_STATUS,{data:"mafy vuwaf login ak"});
    
}

const getListPhone = function(data){
    console.log("getListPhone", data);

    // arrayNumber = csvInstance.readFile();
    socket.send(SOCKET_LIST_PHONE, arrayNumber);
}

const addNumber = function(data){
    console.log("theem soos", data);
    //kiểm tra có bị trùng
    arrayNumber.push(data);
    socket.send(SOCKET_WORKING_ADDED_NUMBER, data);
    
    csvInstance.writeFile(arrayNumber);
    //seleniumInsstance.goto(HOME_URL);
}

const addSomeNumber = function(data){
    console.log("theem nhieu soos", data);
    //kiểm tra có bị trùng
    arrayNumber.push(data);
    socket.send(SOCKET_WORKING_ADDED_SOME_NUMBER, data);
    //seleniumInsstance.goto(HOME_URL);
}

const deletePhone = function(data){
    console.log("delete with phone and money", data);
    socket.send(SOCKET_WORKING_DELETED_PHONE, data);
}

export default workingController;