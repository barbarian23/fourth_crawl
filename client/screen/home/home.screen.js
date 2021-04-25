import React, { useState } from "react";
import '../../assets/css/home/home.css';
import { TH_PHONE, TH_MONEY, TH_INFO, TH_TRACK, TR_TYPE_NUMBER, TR_TYPE_MONEY, TR_TYPE_ADD, sampleData } from "../../constants/home/home.constant";
import { readFileExcel, createFile } from "../../service/excel/excel.client.service";

export default function Home() {
    let { number, setNumber } = useState("");
    let { money, setMoney } = useState("");
    let { listNumber, setListNumber } = useState([]);

    let readFile = (e) => {
        readFileExcel(e.target.files[0], (data) => {
            //data là mảng chứa danh sách thuê bao và số tiền
            data.forEach((item,index)=>{

            });
        });

        //phải cần dòng dưới, vì nếu như lần thứ hai chọn cùng 1 file, sẽ không được tính là opnchange, hàm onchange sẽ không gọi lại
        e.target.value = null;
    }

    let downloadFile = (e) => {
        createFile(sampleData);

        // let link = document.createElement("a");
        // if (link.download !== undefined) { // feature detection
        //     // Browsers that support HTML5 download attribute
        //     let url = URL.createObjectURL(blob);
        //     link.setAttribute("href", url);
        //     link.setAttribute("download", exportedFilename);
        //     link.style.visibility = 'hidden';
        //     document.body.appendChild(link);
        //     link.click();
        //     document.body.removeChild(link);

        // }
    }

    return (
        <div className="crawl-login" id="div_craw">
            <div className="crawl-login-crawl">
                {/* <div className="crawl-login-number-delay" id="div_delay_time">
                    <span>Thời gian nghỉ</span> <input type="number" id="second_crawl" max="60" min="1"
                        value="1" /><span>giây</span>
                </div> */}
                <table>
                    <tbody>
                        <tr>
                            <th>{TH_PHONE}</th>
                            <th>{TH_MONEY}</th>
                            <th>{TH_INFO}</th>
                            <th>{TH_TRACK}</th>
                        </tr>
                        <tr>
                            <td>{TH_PHONE}</td>
                            <td>{TH_MONEY}</td>
                            <td>{TH_INFO}</td>
                            <td>{TH_TRACK}</td>
                        </tr>
                    </tbody>
                </table>
                <div className="input-add-div">
                    <input className="input-add" type="text" placeholder={TR_TYPE_NUMBER} />
                    <input className="input-add" type="text" placeholder={TR_TYPE_MONEY} />
                    <input className="input-add-button" type="button" value={TR_TYPE_ADD} />
                </div>

                <div id="crawl_login_file_input_up">
                    <img id="img_file_input" src='../assets/images/file.png' />
                    <label for="xlsx">Bấm vào đây để chọn tệp(excel):</label>
                    <input type="file"
                        id="xlsx" name="xlsx"
                        accept="xlsx" onChange={readFile} />
                    <span id="span_file_input_error"></span>
                </div>

                <div id="crawl_login_file_input_down" onClick={downloadFile} >
                    <img id="img_file_input" src='../assets/images/file.png' />
                    <label for="avatar">Bấm vào đây để tải tệp(excel) mẫu</label>
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