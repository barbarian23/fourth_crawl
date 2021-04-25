
//import { IS_LOGIN } from "../../constants/login/login.constant";

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
    console.log("initialState " + JSON.stringify(state));
    console.log("[loginReducers " + action.type + "]", action.value);
    return Object.assign({}, state, { [action.type]: action.value });
}