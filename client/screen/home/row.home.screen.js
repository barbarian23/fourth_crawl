import React, { useEffect, useState } from "react";
import '../../assets/css/home/row.css';
import { TH_EDIT, TH_DELETE, TH_DONE } from "../../constants/home/home.constant";

export default function Row(props) {

    //khi bấm edit
    let [isEdited, setEdited] = useState(false);

    //số điện thoại
    let [newPhone, setNewPhone] = useState(false);
    let [newMoney, setNewMoney] = useState(false);


    let editPhone = () => {
        isEdited ? setEdited(false) : setEdited(true);
    }

    let deletePhone = () => {
        props.delete();
    }

    let update = () => {
        props.update(newPhone, newMoney);
    }

    let onChangePhone = (e) => {
        setNewPhone(e.target.value);
    }

    let onChangeMoney = (e) => {
        setNewMoney(e.target.value);
    }

    return (
        <tr>
            isEdited ?
            <td>{props.stt}</td>
            <td>{props.phone}</td>
            <td>{props.money}</td>
            <td>{props.info}</td>
            <td><div className="edit" onClick={editPhone}>{TH_EDIT}</div><div className="delete" onClick={deletePhone}>{TH_DELETE}</div></td>
        :
            <td>{props.stt}</td>
            <td><input type="text" placeholder="Nhập số điện thoại" onChange={onChangePhone} /></td>
            <td><input type="text" placeholder="Nhập số tiền" onChange={onChangeMoney} /></td>
            <td><input type="text" placeholder="Nhập thông tin nạp thẻ" onClick={update} /></td>
            <td><div className="done">{TH_DONE}</div></td>
        </tr>
    );

}