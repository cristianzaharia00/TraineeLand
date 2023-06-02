import React, { Component, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Axios from "axios";
import RowReturn from "../small_components/login-register_Row_Return";
const Returns = () => {
  const [returns, setReturns] = useState([]);
  useEffect(() => {
    const getReturns = async () => {
      const token = localStorage.getItem("auth-token");
      const axiosReturns = await Axios.get("/return/", {
        headers: { "x-auth-token": token },
      });
      setReturns(axiosReturns.data);
    };
    getReturns();
  }, []);

  return (
    <table className="table-order">
      <thead>
        <th>Nume</th>
        <th>Adresa</th>
        <th>Telefon</th>
        <th>Data comenzii</th>
        <th>Email</th>
        <th>ID de comanda</th>
        <th>Motiv Returnare</th>
        <th>Comanda</th>
        <th>Comentarii</th>
      </thead>
      <tbody>
        {returns.map((item) => {
          console.log(item);
          return <RowReturn item={item} />;
        })}
      </tbody>
    </table>
  );
};

export default Returns;
