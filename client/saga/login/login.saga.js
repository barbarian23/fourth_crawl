import { takeLatest, take, put, call } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { LOGIN } from "../../action/login/login.action";
import { IS_LOGIN, LOGIN_STATUS_TEXT } from "../../constants/login/login.constant";
import { loginConstant } from "../../constants/login/login.constant";
import socketClient from "../../service/socket/socket.client.service";
import { SOCKET_LOGIN, MAIN_URL, SOCKET_LOGIN_STATUS } from "../../../common/constants/common.constants";

const doLogin = function (data) {
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

const login = function* (action) {
    yield put({ type: LOGIN_STATUS_TEXT, value: loginConstant.logining });
    
    //gọi hàm lắng nghe socket
    let result = yield call(doLogin, action);

    //kết quả của socket
    while (true) {
        let responce = yield take(result);
        if (responce) {
            console.log("responce",responce);
            //let res = JSON.parse(responce);
            //yield put({ type: LOGIN_STATUS_TEXT, value: res.value });
            //if (res.status) {
            //     yield put({ type: LOGIN_STATUS_TEXT, value: loginConstant.loginSuccess });
            //     yield put({ type: IS_LOGIN, value: true });
            // } else {
            //     yield put({ type: LOGIN_STATUS_TEXT, value: loginConstant.loginFailed });
            //     yield put({ type: IS_LOGIN, value: false });
            // }
        }
    }

}

const loginStatus = function* (data) {
    yield put({ type: LOGIN_STATUS_TEXT, value: loginConstant.loginSuccess });
}

export const watchLogin = function* () {
    yield takeLatest(LOGIN, login);
}