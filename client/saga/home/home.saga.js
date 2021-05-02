import { takeLatest, take, put, call } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { homeConstant } from "../../constants/home/home.constant";
import { GET_LIST_PHONE, GET_LIST_PHONE_SUCCESS, ADD_PHONE, ADD_PHONE_SUCCESS,  } from "../../action/home/home.action";
import socketClient from "../../service/socket/socket.client.service";
import { SOCKET_WORKING_SINGLE_NUMBER, SOCKET_GET_LIST_PHONE, MAIN_URL } from "../../../common/constants/common.constants";

const socket = new socketClient(MAIN_URL);

// sử dụng eventChannel để gửi và nhận data qua socket
const homeSocket = function (data) {
    console.log("homeSocket", data);
    return eventChannel(emitter => {
        //gửi
        socket.send(SOCKET_WORKING_SINGLE_NUMBER, { phone: data.data.phone, money: data.data.money });

        //nhận
        socket.receive("SOCKET_WORKING_ADDED_NUMBER", function (data) {
            console.log("home.saga from server", data);
            emitter(data || '');
        });


        return () => {
            //unscrible
        };
    });
}

//get list phone socket
const getListPhoneSocket = function (data) {
    console.log("homeSocket", data);
    return eventChannel(emitter => {
        //gửi
        socket.send(SOCKET_GET_LIST_PHONE, {});

        //nhận
        socket.receive("SOCKET_LIST_PHONE", function (data) {
            console.log("home.saga from server", data);
            emitter(data || '');
        });


        return () => {
            //unscrible
        };
    });
}

// nhận kết quả từ socket
const addNumberSaga = function* (action) {
    //laasy vee fkeest quar cuar event channel redux
    let result = yield call(homeSocket, action);

    //kết quả của socket
    while (true) {
        let responce = yield take(result);
        if (responce) {
            console.log("responce", responce);
            yield put({
                type: ADD_PHONE_SUCCESS,
                value: responce
            })
        }
    }
}

const getListPhoneSaga = function* (action) {
    //laasy vee fkeest quar cuar event channel redux
    let result = yield call(getListPhoneSocket, action);

    //kết quả của socket
    while (true) {
        let responce = yield take(result);
        if (responce) {
            console.log("responce", responce);
            yield put({
                type: GET_LIST_PHONE_SUCCESS,
                value: responce
            })
        }
    }
}

export const watchHome = function* () {
   yield takeLatest(ADD_PHONE, addNumberSaga);
   yield takeLatest(GET_LIST_PHONE, getListPhoneSaga);
}