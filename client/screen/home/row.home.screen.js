import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { DELETE_PHONE, EDIT_PHONE, SET_INTERVAL_PHONE } from "../../action/home/home.action";
import '../../assets/css/home/row.css';
import { TH_EDIT, TH_DELETE, TH_DONE } from "../../constants/home/home.constant";

export default function Row(props) {

    const {index, data} = props;
    const {phone , money, info } = data;
    let dispatch = useDispatch();
    let dispatchToStore = (action) => {
        dispatch(action);
    }

    // console.log('row data', data);

    //khi bấm edit
    let [isEdited, setEdited] = useState(false);

    //số điện thoại
    let [newPhone, setNewPhone] = useState(phone);
    let [newMoney, setNewMoney] = useState(money);

    let editPhone = () => {
        isEdited ? setEdited(false) : setEdited(true);
    }
    
    let onChangePhone = (e) => {
        console.log("row phone screen - e = ", e.target.value, "old data");
        if(e.target.value != null || e.target.value != undefined )
            setNewPhone(e.target.value);
        else
            setNewPhone(phone);
    }

    let onChangeMoney = (e) => {
        // console.log("row money screen - e = ", e.target.value);
        if(e.target.value != null || e.target.value != undefined)
            setNewMoney(e.target.value);
        else
            setNewMoney(money);
    }

    if (!isEdited){
        return (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{phone}</td>
                <td>{money}</td>   
                <td style={{backgroundColor: (data.info > 5)?"#00FF00":"#FFFFFF"}}>{info}</td>             
                <td>
                    <div className="btn edit" onClick={editPhone}>{TH_EDIT}</div>
                    <div className="btn delete" onClick={()=>dispatchToStore({type: DELETE_PHONE, data:{index: index, phone: phone, money: money, info: info}})}>{TH_DELETE}</div>
                </td>
            </tr>
        )
    }else{
        return (
            <tr key={index}>
                <td>{index + 1}</td>
                <td><input type="text" placeholder="Nhập số điện thoại" onChange={onChangePhone} defaultValue={phone}/></td>
                <td><input type="text" placeholder="Nhập số tiền" onChange={onChangeMoney} defaultValue={money}/></td>
                <td style={{backgroundColor: (data.info > 5)?"#00FF00":"#FFFFFF"}}>{info}</td> 
                <td>
                    <div className="done" 
                         onClick={()=>{
                            editPhone();
                            dispatchToStore({
                                type: EDIT_PHONE, 
                                data:{index: index, phone: newPhone, money: newMoney, info: info}});
                }}>{TH_DONE}</div></td>
            </tr>
        )

    }

}