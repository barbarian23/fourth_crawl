import {OPEN_HOME_SCREEN}from '../../action/login/login.action';

const initialState = {
    isLogin: false,
    isLoginSuccess: false,
    username: "",
    password: "",
    loginStatusText: "Đang đăng nhập"
};

const mapKey = new Map([
    ["1", () => { }],
    ["2", () => { }]
]);

export default function loginReducer(state = initialState, action) {
    // console.log("initialState " + JSON.stringify(state));
    // console.log("[loginReducers " + action.type + "]", action.value);

    switch(action.type){
        
        case OPEN_HOME_SCREEN:
        return{
            ...state,
            isLoginSuccess: true
        }
        default:
        return{
            ...state
        }
    }
    // return Object.assign({}, state, { [action.type]: action.value });
}