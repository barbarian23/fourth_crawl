import React, { useEffect } from "react";
import '../../assets/css/login/login.css';
import { useHistory } from 'react-router-dom';
import { loginConstant } from '../../constants/login/login.constant';
import { LOGIN } from "../../action/login/login.action";
import { useSelector, useDispatch } from 'react-redux';

export default function login(props) {

    let dispatch = useDispatch();

    let username = "";
    let password = "";

    let updateUsername = (e) => {
        username = e.target.value;
    }

    let updatePassword = (e) => {
        password = e.target.value;
    }

    let dispatchToStore = (action) => {
        dispatch(action);

    }

    let isLogin = useSelector(state => state.login.isLogin); // state islogin của reducer login, không phải reducer home
    let loginStatusText = useSelector(state => state.login.loginStatusText);
    let isLoginSuccess = useSelector(state => state.login.isLoginSuccess);

    let history = useHistory();
    useEffect(() => {
        if (isLoginSuccess) {
            history.push("/home");
        }
    }, [isLoginSuccess]);

    return (
        <div>
            {
                isLogin === false ?
                    <div className="crawl-login" id="crawl_login">

                        <div className="crawl-login-username-password">
                            <div className="crawl-login-username-password-upper">
                                <span>{loginConstant.loginName}</span>
                            </div>
                            <div className="crawl-login-username-password-below">
                                <input type="text" id="username" placeholder={loginConstant.loginNamePlaceholder} onChange={updateUsername} />
                            </div>
                        </div>

                        <div className="crawl-login-username-password">
                            <div className="crawl-login-username-password-upper">
                                <span>{loginConstant.loginPassword}</span>
                            </div>
                            <div className="crawl-login-username-password-below">
                                <input type="password" id="password" placeholder={loginConstant.loginPasswordPlaceholder} onChange={updatePassword} />
                            </div>
                        </div>

                        <div className="crawl-login-button-submit" id="crawl_login_button_submit"
                            onClick={() => dispatchToStore({ type: LOGIN, value: { username: username, password: password } })}>
                            <span>{loginConstant.loginButton}</span>
                        </div>
                    </div> :
                    <div className="crawl-login" id="crawl_login_success">
                        <div className="crawl-login-success-contain">
                            <h4 id="crawl_login_error_text">{loginStatusText}</h4>
                        </div>
                    </div>
            }
        </div >);

}