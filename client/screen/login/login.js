import React from "react";
import '../../assets/css/login/login.css';
import { loginConstant } from '../../constants/login/login';
import { IS_LOGIN, LOGIN_STATUS_TEXT } from "../../constants/login/login";
import { LOGIN } from "../../action/login/login";
import { connect } from 'react-redux';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.username = "";
        this.password = "";
        this.login = this.login.bind(this);
        this.userNameInput = this.userNameInput.bind(this);
        this.passwordInput = this.passwordInput.bind(this);
    }

    componentDidMount() {
        console.log(this.props[IS_LOGIN], "", this.props.IS_LOGIN, this.props.username);
    }

    login() {
        console.log("click login");
        this.props.updateState(LOGIN, { username: this.username, password: this.password });
    }

    /**
     * Khi đang nhập vào ô input username
     * @param {*} e - event
     */
    userNameInput(e) {
        this.username = e.target.value;
    }
    /**
     * Khi đang nhập vào ô input password
     * @param {*} e - event
     */
    passwordInput(e) {
        this.password = e.target.value;
    }

    render() {
        return (
            <div>
                {
                    this.props[IS_LOGIN] === false ?
                        <div className="crawl-login" id="crawl_login">

                            <div className="crawl-login-username-password">
                                <div className="crawl-login-username-password-upper">
                                    <span>{loginConstant.loginName}</span>
                                </div>
                                <div className="crawl-login-username-password-below">
                                    <input type="text" id="username" placeholder={loginConstant.loginNamePlaceholder} onChange={this.userNameInput} />
                                </div>
                            </div>

                            <div className="crawl-login-username-password">
                                <div className="crawl-login-username-password-upper">
                                    <span>{loginConstant.loginPassword}</span>
                                </div>
                                <div className="crawl-login-username-password-below">
                                    <input type="password" id="password" placeholder={loginConstant.loginPasswordPlaceholder} onChange={this.passwordInput} />
                                </div>
                            </div>

                            <div className="crawl-login-button-submit" id="crawl_login_button_submit" onClick={this.login}>
                                <span>{loginConstant.loginButton}</span>
                            </div>
                        </div> :
                        <div className="crawl-login" id="crawl_login_success">
                            <div className="crawl-login-success-contain">
                                <h2>{this.props[LOGIN_STATUS_TEXT]}</h2>
                            </div>
                        </div>
                }
                <h4 id="crawl_login_error_text">{this.props[LOGIN_STATUS_TEXT]}</h4>
            </div >
        );
    }
}

//Set, su dung action
const mapDispatchToProps = dispatch => {
    return {
        updateState: (type, value) => dispatch({ type: type, value: value })
    }
}


//Get
const mapStateToProps = (state, ownProps) => {
    return {
        [IS_LOGIN]: state.login[IS_LOGIN],
        [LOGIN_STATUS_TEXT]: state.login[LOGIN_STATUS_TEXT]
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);