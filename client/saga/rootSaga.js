import { select, take, all } from 'redux-saga/effects';
import { watchLogin } from "./login/login";

//quan sát toàn bộ các âction
const watchAndLog = function* () {
    while (true) {
        const action = yield take('*');
        const state = yield select();
        console.log('action', action);
        console.log('state after', state);
    } 
}

const rootSaga = function* () {
    yield all ([
        watchAndLog(),
        watchLogin()
    ])
}

export default rootSaga;