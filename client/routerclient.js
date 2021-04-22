import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./screen/home/home.screen";
import Login from "./screen/login/login.screen";
import { COMMON_REACTJS_OBJECT, COMMON_REACTJS_KEY } from "../common/constants/common.constants";

class MainRouter extends React.Component {
    render() {
        return (
            <div>
                <Route exact path={COMMON_REACTJS_OBJECT[COMMON_REACTJS_KEY.COMMON_REACTJS_URL_LOGIN]} component={Login} /> 
                <Route path={COMMON_REACTJS_OBJECT[COMMON_REACTJS_KEY.COMMON_REACTJS_URL_HOME]} component={Home} />
            </div>
        );
    }
}
export default MainRouter;