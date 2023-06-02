import React, { useContext, useEffect, useState } from "react";
import ShopContext from "../../context/shopcontext";
import Axios from "axios";
import Orders from "./orders";
import { Table } from "react-bootstrap";

const OwnOrders = () => {
  let token = localStorage.getItem("auth-token");
  const [items, setItems] = useState([]);
  const { shop } = useContext(ShopContext);
  useEffect(async () => {
    var response = await Axios.get("/users/getOrders", {
      headers: { "x-auth-token": token },
    });
    setItems(response);
  }, []);

  const findItemByID = (_id) => {
    return shop.filter((e) => {
      return e._id == _id;
    })[0];
  };

  const printCommand = (commands) => {
    if (shop.length > 0) {
      return commands.map((item_) => {
        let shopItem = findItemByID(item_._id);
        if (shopItem !== undefined)
          return (
            <React.Fragment>
              <a href={"/shop/item/" + shopItem._id}>
                {shopItem.title +
                  " (" +
                  item_.size +
                  " x " +
                  item_.width +
                  " x " +
                  item_.girth +
                  ") x " +
                  item_.quantity}
              </a>
              <br></br>
            </React.Fragment>
          );
        return "Nici un papucel la comanda";
      });
    }
  };

  if (items.length !== 0)
    return (
      <Table size="sm">
        <thead>
          <tr>
            <th>Adresa</th>
            <th>Oras</th>
            <th>Nume</th>
            <th>Data plasarii</th>
            <th>Tipul de Livrare</th>
            <th>Comanda</th>
          </tr>
        </thead>
        <tbody>
          {items.data["orders"].map((item) => {
            return (
              <tr>
                <td>{item.address}</td>
                <td>{item.city}</td>
                <td>{item.surname + " " + item.firstName}</td>
                <td>{item.date.split("T")[0]}</td>
                <td>{item.deliveryType}</td>
                <td>{printCommand(item.command)}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  else {
    return (
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Adresa</th>
            <th>Oras</th>
            <th>Nume</th>
            <th>Tipul de Livrare</th>
          </tr>
        </thead>
        <tbody></tbody>
      </Table>
    );
  }
};

export default OwnOrders;
