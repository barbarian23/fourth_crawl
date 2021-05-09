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

const findIndex = num => {
    let tempIndex = -1;
    arrayNumber.some((item,index)=>{
        // 0 1 2 4 5
        if(item.phone == num){
            tempIndex = index; // 3
            return true;
        }
    });
    return tempIndex;
}

const addNumber = function(data){
    
    //kiểm tra có bị trùng
    arrayNumber.push(data); 
    console.log("theem soos", arrayNumber[arrayNumber.length-1]);
    let tempIndex = arrayNumber.length - 1; // 3
    // console.log()
    socket.send(SOCKET_WORKING_ADDED_NUMBER, data);
    arrayNumber[tempIndex].interval = setInterval(()=>{ // xoa 3 >> clear interval 3
        console.log("interval new");
        //lúc thêm mới thì cần thận với cái arrayNumber.length này
        let idx = findIndex(data.phone); 
        arrayNumber[idx].info = random();
        socket.send(SOCKET_SETINTERVALED_PHONE, {info: arrayNumber[idx].info, index: idx});
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
    clearInterval(arrayNumber[data.index].interval);
    // clearIntervel 3
    //0 1 2 3 4 5
    //delete 3
    //0 1 2 4 5
    arrayNumber.splice(data.index,1);
    csvInstance.writeFile(arrayNumber);
    socket.send(SOCKET_WORKING_DELETED_PHONE, {index: data.index});
}

const editPhone = function(data){
    arrayNumber[data.index].phone = data.phone;
    arrayNumber[data.index].money = data.money;
    csvInstance.writeFile(arrayNumber);
    socket.send(SOCKET_WORKING_EDITED_PHONE, {index: data.index, phone: data.phone, money: data.money});
}

const setIntervalPhone = function(data){
    console.log("data in server", arrayNumber );
    arrayNumber.forEach((item, index) => {
        item.interval = setInterval(()=>{
            item.info = random();
            console.log("random", item.info);
            console.log("listphone after random", arrayNumber);
            socket.send(SOCKET_SETINTERVALED_PHONE, {info: item.info, index: index});
        },8000);
    });
}
export default workingController;