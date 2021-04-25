import { takeLatest, take, put, call } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { homeConstant } from "../../constants/home/home.constant";
import socketClient from "../../service/socket/socket.client.service";
import { SOCKET_LOGIN, MAIN_URL, SOCKET_LOGIN_STATUS } from "../../../common/constants/common.constants";

const listenerToServer = function (data) {
    console.log("doLogin", data);
    return eventChannel(emitter => {
        const socket = new socketClient(MAIN_URL);

        //gửi
        socket.send(SOCKET_LOGIN, { username: data.value.username, password: data.value.password });

        //nhận
        socket.receive(SOCKET_LOGIN_STATUS, function (data) {
            console.log("from server", data);
            emitter(data);
        });


        return () => {
            //unscrible
        };
    });
}

const home = function* (action) {
    //laasy vee fkeest quar cuar event channel redux
    let result = yield call(listenerToServer, action);

    //kết quả của socket
    while (true) {
        let responce = yield take(result);
        if (responce) {
            console.log("responce", responce);
        }
    }
}

export const watchHome = function* () {
    yield takeLatest(LOGIN, login);
}