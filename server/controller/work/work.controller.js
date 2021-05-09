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
    SOCKET_WORKING_EDITED_PHONE,
    SOCKET_WORKING_EDIT_PHONE,
    SOCKET_SETINTERVAL_PHONE,
    SOCKET_SETINTERVALED_PHONE,
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
        
        // edit sdt
        receive.on(SOCKET_WORKING_EDIT_PHONE, editPhone);

        // setinterval
        receive.on(SOCKET_SETINTERVAL_PHONE, setIntervalPhone);
    });
}

let random = () => {
    let rd = Math.floor(Math.random() * 10);
    console.log("number random", rd);
    return rd;
}

const login = function(data){
    console.log("login voi username va password",data.username, data.password);
    doLogin(data.username, data.password, socket);
}

const getListPhone = function(data){
    console.log("getListPhone", data);
    socket.send(SOCKET_LIST_PHONE, arrayNumber);
}

const addNumber = function(data){
    
    //kiểm tra có bị trùng
    arrayNumber.push(data); 
    console.log("theem soos", arrayNumber[arrayNumber.length-1]);
    // console.log()
    socket.send(SOCKET_WORKING_ADDED_NUMBER, data);
    arrayNumber[arrayNumber.length-1].interval = setInterval(()=>{
        console.log("interval new");
        arrayNumber[arrayNumber.length-1].info = random();
        socket.send(SOCKET_SETINTERVALED_PHONE, {info: arrayNumber[arrayNumber.length-1].info, index: arrayNumber.length-1});
    }, 8000);
    
    csvInstance.writeFile(arrayNumber);
}

const addSomeNumber = function(data){
    console.log("theem nhieu soos", data);
    //kiểm tra có bị trùng
    arrayNumber.push(data);
    socket.send(SOCKET_WORKING_ADDED_SOME_NUMBER, data);
}

const deletePhone = function(data){
    console.log("delete with phone and money", data);
    console.log("list number from server", arrayNumber);
    arrayNumber.splice(data.index,1);
    csvInstance.writeFile(arrayNumber);
    socket.send(SOCKET_WORKING_DELETED_PHONE, arrayNumber);
}

const editPhone = function(data){
    arrayNumber[data.index].phone = data.phone;
    arrayNumber[data.index].money = data.money;
    csvInstance.writeFile(arrayNumber);
    socket.send(SOCKET_WORKING_EDITED_PHONE, arrayNumber);
}

const setIntervalPhone = function(data){
    console.log("data in server", arrayNumber );
    arrayNumber.forEach((item, index) => {
        item.interval = setInterval(()=>{
            item.info = random();
            console.log("random", item.info);
            console.log("listphone after random", arrayNumber);
            //csvInstance.writeFile(data.listPhone);
            socket.send(SOCKET_SETINTERVALED_PHONE, {info: item.info, index: index});
        },8000);
    });
}
export default workingController;