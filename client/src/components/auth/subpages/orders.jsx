import React, { useEffect, useState } from "react";
import RowOrder from "../small_components/login-register_Row_Order";
import Axios from "axios";

const Orders = () => {
  const [order, setOrder] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      const token = localStorage.getItem("auth-token");

      const axiosOrders = await Axios.get("/order/", {
        headers: { "x-auth-token": token },
      });
      const sortOrders = axiosOrders.data.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });

      setOrder(sortOrders);
      console.log(sortOrders);
    };
    getOrders();
  }, []);

  return (
    <table className="table table-striped">
      <thead>
        <th>Nume</th>
        <th>Adresa</th>
        <th>Telefon</th>
        <th>Data comenzii</th>
        <th>Email</th>
        <th>Adresa</th>
        <th>Tip de livrare</th>
        <th>Note</th>
        <th>Comanda</th>
        <th>Subtotal</th>
        <th>Email de confirmare</th>
      </thead>
      <tbody>
        {order.map((item) => {
          return <RowOrder item={item} />;
        })}
      </tbody>
    </table>
  );
};

export default Orders;
