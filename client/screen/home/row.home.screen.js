import React, { useEffect, useState } from "react";
import '../../assets/css/home/row.css';
import { TH_EDIT, TH_DELETE, TH_DONE } from "../../constants/home/home.constant";

export default function Row(props) {

    const {index, data} = props;
    const {phone , money, info } = data;

    console.log('row data', data);

    // useEffect(() => {
    // }, [data]);

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

    if (!isEdited){
        return (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{phone}</td>
                <td>{money}</td>
                <td>{info}</td>
                <td>
                    <div className="btn edit" onClick={editPhone}>{TH_EDIT}</div>
                    <div className="btn delete" onClick={deletePhone}>{TH_DELETE}</div>
                </td>
            </tr>
        )
    }else{
        return (
            <tr key={index}>
                <td>{index + 1}</td>
                <td><input type="text" placeholder="Nhập số điện thoại" onChange={onChangePhone} defaultValue={phone}/></td>
                <td><input type="text" placeholder="Nhập số tiền" onChange={onChangeMoney} defaultValue={money}/></td>
                <td><input type="text" placeholder="Nhập thông tin nạp thẻ" onClick={update} defaultValue={info}/></td>
                <td><div className="done">{TH_DONE}</div></td>
            </tr>
        )

    }

}