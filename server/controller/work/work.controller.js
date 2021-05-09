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
import { HOME_URL,WAIT_TIME } from "../../constants/work/work.constants";

//selenium
const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
require('chromedriver');

const chromeOption = new chrome.Options().addArguments("start-maximized") // open Browser in maximized mode
    .addArguments("disable-infobars") // disabling infobars
    .addArguments("--disable-extensions") // disabling extensions
    .addArguments("--disable-gpu") // applicable to windows os only
    .addArguments("--disable-dev-shm-usage")// overcome limited resource problems
    .addArguments("--no-sandbox");

var driver = new webdriver.Builder().forBrowser('chrome')
.setChromeOptions(chromeOption).withCapabilities(webdriver.Capabilities.chrome()).build();

//socket
var socket = null;

// const seleniumInsstance = new seleniumCrawl();
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
  

    //khoi tao socket
    socket = socketServer(server);
    socket.receive((receive) => {

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
    //console.log("number random", rd);
    return rd;
}

const login = function(data){
    console.log("login voi username va password",data.username, data.password);
    doLogin(data.username, data.password, socket, driver, webdriver);
}

const getListPhone = function(data){
    console.log("getListPhone", data);
    socket.send(SOCKET_LIST_PHONE, arrayNumber);
}

const findIndex = num => {
    let tempIndex = -1;
    arrayNumber.some((item,index)=>{
        if(item.phone == num){
            tempIndex = index; 
            return true;
        }
    });
    return tempIndex;
}

const duplicateNumber = num => {
    let bool = false; 
    bool = arrayNumber.some((item) => {
        if(item.phone == num)
            return true;
    });
    return bool;
}
const addNumber = function(data){
    
    //kiểm tra có bị trùng
    console.log("duplicate ",duplicateNumber(data.phone));
    if(duplicateNumber(data.phone) == false){
        arrayNumber.push(data); 
        console.log("theem soos", arrayNumber[arrayNumber.length-1]);
        let tempIndex = arrayNumber.length - 1; // 3
        // console.log()
        socket.send(SOCKET_WORKING_ADDED_NUMBER, {status: 200, data: data});
        arrayNumber[tempIndex].interval = setInterval(()=>{ // xoa 3 >> clear interval 3
            //lúc thêm mới thì cần thận với cái arrayNumber.length này
            let idx = findIndex(data.phone); 
            console.log("interval new",idx, arrayNumber[idx].phone);
            arrayNumber[idx].info = random();
            socket.send(SOCKET_SETINTERVALED_PHONE, {info: arrayNumber[idx].info, index: idx, phone: data.phone});
        }, WAIT_TIME);
        csvInstance.writeFile(arrayNumber);
    } else{
        socket.send(SOCKET_WORKING_ADDED_NUMBER, {status: "Số điện thoại đã tồn tại", data: null});
    }
    
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
            let idx = findIndex(item.phone); 
            socket.send(SOCKET_SETINTERVALED_PHONE, {info: item.info, index: idx, phone:item.phone});
        },WAIT_TIME);
    });
}
export default workingController;