import { takeLatest, take, put, call } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { LOGIN } from "../../action/login/login"; loginConstant
import { IS_LOGIN, LOGIN_STATUS_TEXT } from "../../constants/login/login";
import { loginConstant } from "../../constants/login/login";
import sseClient from "../../service/sse";
//import {chromeOption} from "../../service/selenium";
//import {excelEntity} from "../../service/excel";

// const login = function* (action) {
//     try {
//         console.log("login with", action.value.username, action.value.password);
//         yield put({ type: LOGIN_STATUS_TEXT, value: loginConstant.logining });
//         let response = yield call(doLogin);
//         if (response.json()) {
//             yield put({ type: LOGIN_STATUS_TEXT, value: loginConstant.loginSuccess });
//             yield put({ type: IS_LOGIN, value: true });
//         } else {
//             yield put({ type: LOGIN_STATUS_TEXT, value: loginConstant.loginFailed });
//             yield put({ type: IS_LOGIN, value: false });
//         }
//     } catch (e) {
//         console.log("login error", e);
//         yield put({ type: LOGIN_STATUS_TEXT, value: loginConstant.loginFailed });
//         yield put({ type: IS_LOGIN, value: false });
//     }
// }

const doLogin = function (data) {
    console.log("doLogin");
    return eventChannel(emitter => {
        const listenSSE = new sseClient('http://localhost:3000/docrawl');
        listenSSE.connect(function (event) {
            console.log("from server", JSON.parse(event.data));
            emitter(event.data);
        });

        return () => {
            //unscrible
        };
    });
}

const login = function* (action) {
    yield put({ type: LOGIN_STATUS_TEXT, value: loginConstant.logining });
    let result = yield call(doLogin, action.value.username, action.value.password);

    // yield call(function* () {
    //     yield put(doLogin(action.value.username, action.value.password));
    // });

    while (true) {
        let responce = yield take(result);
        let res = JSON.parse(responce);
        yield put({ type: LOGIN_STATUS_TEXT, value: res.value });
        //if (res.status) {
        //     yield put({ type: LOGIN_STATUS_TEXT, value: loginConstant.loginSuccess });
        //     yield put({ type: IS_LOGIN, value: true });
        // } else {
        //     yield put({ type: LOGIN_STATUS_TEXT, value: loginConstant.loginFailed });
        //     yield put({ type: IS_LOGIN, value: false });
        // }
    }

}

const loginStatus = function* (data) {
    yield put({ type: LOGIN_STATUS_TEXT, value: loginConstant.loginSuccess });
}

export const watchLogin = function* () {
    yield takeLatest(LOGIN, login);
    //ield takeLatest(LOGIN, login);
    //yield call(login);

    // while(yield take(LOGIN)){
    //     const getUser = yield fork(login);
    //     //yield cancel(login);
    // }
}

//export const watchLogin = listenLogin;