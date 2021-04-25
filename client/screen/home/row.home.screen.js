import React, { useEffect, useState } from "react";
import '../../assets/css/home/row.css';

export default function Row(props) {

    let [isEdited, setEdited] = useState(false);

    return (
        <tr>
            isEdited ?
            <td> Số điện thoại </td>
            <td> Số tiền </td>
            <td> Thông tin nạp thẻ </td>
            <td> Theo dõi </td>
        :
            <td><input type="text" placeholder="Nhập số điện thoại" /></td>
            <td><input type="text" placeholder="Nhập số tiền" /></td>
            <td><input type="text" placeholder="Nhập thông tin nạp thẻ" /></td>
            <td><input type="text" placeholder="Nhập theo dõi" /></td>
        </tr>
    );

}