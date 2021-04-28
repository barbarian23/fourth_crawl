import { takeLatest, take, put, call } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { homeConstant } from "../../constants/home/home.constant";
import { ADD_PHONE } from "../../action/home/home.action";
import socketClient from "../../service/socket/socket.client.service";
import { SOCKET_WORKING_SINGLE_NUMBER, MAIN_URL } from "../../../common/constants/common.constants";

const socket = new socketClient(MAIN_URL);

const homeSocket = function (data) {
    console.log("homeSocket", data);
    return eventChannel(emitter => {
        //gửi
        socket.send(SOCKET_WORKING_SINGLE_NUMBER, { data: data.value.number });

        //nhận
        socket.receive("", function (data) {
            console.log("from server", data);
            emitter(data);
        });


        return () => {
            //unscrible
        };
    });
}

const addNumber = function* (action) {
    //laasy vee fkeest quar cuar event channel redux
    let result = yield call(homeSocket, action);

    //kết quả của socket
    while (true) {
        let responce = yield take(result);
        if (responce) {
            console.log("responce", responce);
        }
    }
}



export const watchHome = function* () {
   yield takeLatest(ADD_PHONE, addNumber);
}