import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../client/screen/home/home";
import Login from "../client/screen/login/login";
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