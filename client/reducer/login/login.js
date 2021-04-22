
import { IS_LOGIN } from "../../constants/login/login";

const initialState = {
    [IS_LOGIN]: false,
    username: "",
    password: "",
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