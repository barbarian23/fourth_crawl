import { combineReducers } from 'redux';
import homeReducer from "./home/home";
import loginReducer from "./login/login";

const rootReducer = combineReducers({
    login:loginReducer,
    home:homeReducer
});

export default rootReducer;