import React from "react";
import '../../assets/css/home/home.css';
import { withRouter } from 'react-router-dom'

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.home = this.home.bind(this);
    }

    home() {
        console.log("click home");
        this.props.history.push('/login')
    }

    render() {
        return (
            <div className="crawl-login" id="div_craw">
                <div id="crawl_login_file_input" onClick="openFile()">
                    <img id="img_file_input" src='./assets/images/file.png' />
                    <span id="span_file_input_success">Bấm vào đây để chọn tệp</span>
                    <span id="span_file_input_error"></span>
                </div>
                <div className="crawl-login-crawl">
                    <div className="crawl-login-number-delay" id="div_delay_time">
                        <span>Thời gian nghỉ</span> <input type="number" id="second_crawl" max="60" min="1"
                            value="1" /><span>giây</span>
                    </div>
                    <div className="crawl-login-button-submit" id="btn_crawl" onclick="crawl()">
                        <span>Tra cứu thông tin</span>
                    </div>
                    <div className="crawl-loading-parent" id="div_login_loading">
                        <div className="crawl-login-loading">
                            <div className="circle"></div>
                            <div className="circle"></div>
                            <div className="circle"></div>
                            <div className="shadow"></div>
                            <div className="shadow"></div>
                            <div className="shadow"></div>
                        </div>
                    </div>
                    <div className="div-progress-bar" id="div_progress_bar">
                        <div id="div_grey"></div>
                    </div>
                    <h4 id="success_text"></h4>
                    <h4 id="error_crawl"></h4>
                </div>
            </div>
        );
    }
}

export default withRouter(Home);