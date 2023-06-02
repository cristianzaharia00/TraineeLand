import React, { Component } from "react";

const RowReturn = (props) => {
  var item = props.item;
  return (
    <tr>
      <td>{item.firstName + " " + item.surname}</td>
      <td>
        {item.address + " " + item.state + " " + item.city + " " + item.zip}
      </td>
      <td>{item.phone}</td>
      <td>{item.date}</td>
      <td>{item.email}</td>
      <td>{item.orderID}</td>
      <td>{item.returnReason}</td>
      <td>{item.productName[0]}</td>
      <td>{item.comments}</td>
    </tr>
  );
};

export default RowReturn;
