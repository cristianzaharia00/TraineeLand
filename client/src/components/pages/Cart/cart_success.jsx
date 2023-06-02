import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
const Success = () => {
  const history = useHistory();
  useEffect(() => {
    //setTimeout(() => history.push("/"), 3000);
  }, []);
  const myStyle = {
    padding: "10.30vh",
  };
  const h1Style = {
    "text-align": "center",
    "font-family": "Lato",
    "font-size": "3rem",
    "font-weight": "bold",
    "flex-direction": "column",
    "align-items": "center",
  };
  const checkStyle = {
    "font-size": "10rem",
    color: "#39b6b6",
  };
  return (
    <div style={myStyle}>
      <div className="d-flex mb-5" style={h1Style}>
        Multumim pentru comanda!
        <FontAwesomeIcon className="mt-3" style={checkStyle} icon={faCheck} />
        <div className="h4 mt-4 font-weight-bold">Comanda a fost plasata.</div>
        <div className="h4 font-weight-bold">
          Ve-ti primi un e-mail de confirmare in cel mai scurt timp
        </div>
      </div>
    </div>
  );
};

export default Success;
