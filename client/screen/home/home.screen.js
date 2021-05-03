import React, { useState, useEffect } from "react";
import '../../assets/css/home/home.css';
import { TH_STT, TH_PHONE, TH_MONEY, TH_INFO, TH_TRACK, TR_TYPE_NUMBER, TR_TYPE_MONEY, TR_TYPE_ADD, sampleData } from "../../constants/home/home.constant";
import { ADD_PHONE, GET_LIST_PHONE } from "../../action/home/home.action";
import { readFileExcel, createFileExcel } from "../../service/excel/excel.client.service";
import { useSelector, useDispatch } from 'react-redux';

import Row from './row.home.screen';

export default function Home() {
    const [phone, setPhone ] = useState("");
    const [ money, setMoney ] = useState(0);

    const dispatch = useDispatch();

    

    let listPhone = useSelector(state => state.home.listPhone);

    useEffect(() => {
        console.log("current list phone", listPhone);
        if(listPhone.length === 0){
            dispatch({ type: GET_LIST_PHONE, data: null });
        }
    }, [listPhone]);

    
    let readFile = (e) => {
        readFileExcel(e.target.files[0], (data) => {
            //data là mảng chứa danh sách thuê bao và số tiền
            data.forEach((item, index) => {
                //Bỏ qua dòng đầu vì là tiêu đề
                if (index > 0) {
                    useDispatch({ type: ADD_PHONE, value: item });
                }
            });
        });

        //phải cần dòng dưới, vì nếu như lần thứ hai chọn cùng 1 file, sẽ không được tính là opnchange, hàm onchange sẽ không gọi lại
        e.target.value = null;
    }

    let downloadFile = (e) => {
        createFileExcel(sampleData);
    }

    let onInputPhone = (e) => {
        setPhone(e.target.value);
    }

    let onInputMoney = (e) => {
        setMoney(e.target.value);
    }

    let addNew = () => {
        // console.log({ phone: phone, money: money })
        dispatch({ type: ADD_PHONE, data: { phone: phone, money: money } });
    }

    return (
        <div className="crawl-login" id="div_craw">
            <div className="crawl-login-crawl">
                <table>
                    <tbody>
                        <tr>
                            <th>{TH_STT}</th>
                            <th>{TH_PHONE}</th>
                            <th>{TH_MONEY}</th>
                            <th>{TH_INFO}</th>
                            <th>{TH_TRACK}</th>
                        </tr>
                        {
                            listPhone 
                            ? listPhone.map((item, index) => {
                                console.log(index, item);
                                return <Row key={index}
                                    data={item}
                                    index={index}
                                />
                            })
                            : null
                        }
                    </tbody>
                </table>

                <div className="divTextStatus"></div>

                <div className="input-add-div">
                    <input className="input-add" type="text" placeholder={TR_TYPE_NUMBER} onChange={onInputPhone} />
                    <input className="input-add" type="text" placeholder={TR_TYPE_MONEY} onChange={onInputMoney} />
                    <input className="input-add-button" type="button" value={TR_TYPE_ADD} onClick={addNew} />
                </div>

                <div id="crawl_login_file_input_up">
                    <img id="img_file_input" src='../assets/images/file.png' />
                    <label htmlFor="xlsx">Bấm vào đây để chọn tệp(excel):</label>
                    <input type="file"
                        id="xlsx" name="xlsx"
                        accept="xlsx" onChange={readFile} />
                    <span id="span_file_input_error"></span>
                </div>

                <div id="crawl_login_file_input_down" onClick={downloadFile} >
                    <img id="img_file_input" src='../assets/images/file.png' />
                    <label htmlFor="avatar">Bấm vào đây để tải tệp(excel) mẫu</label>
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