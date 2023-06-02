import {
  faYenSign,
  faQuoteLeft,
  faQuoteRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import React, { Component } from "react";
import { Button, Col, Row } from "react-bootstrap";

const FacebookComments = () => {
  return (
    <React.Fragment>
      <div className="offset"></div>
      <h3 className="heading text-center">Review-uri si Recenzii</h3>{" "}
      <div className="heading-underline"></div>
      <Row>
        <Col className="shadow-radius ml-md-n4 mb-4" sm={12} md={4}>
          <blockquote className="pt-3 m-3 comments">
            Mă țin de ceva timp să fac o poza piciului cu noile cizmulițe.
            Sincer sunt superbe! Nu am reușit să fac poza deoarece nu prea stă
            locului. Sunt confortabili, ușori și flexibili! Nota 10 plus și pt
            răspunsul prompt la mesaje! Super mulțumită de absolut tot!
            Mulțumesc mult!
          </blockquote>
          <div className="m-3 mb-3">
            <b>Alexandra Franga</b>
          </div>
        </Col>
        <Col className="shadow-radius ml-md-4 mr-md-4 mb-4" sm={12} md={4}>
          <blockquote className="pt-3 m-3 comments">
            Nu stiu ce mâini lucreaza acești papucei însă din mâinile lor ies
            absolut niste minunății❤! O colaborare extraordinară, promptitudine
            si atentie la orice detaliu!Recomand cu mult drag !!!❤
          </blockquote>
          <div className="m-3 mb-3">
            <b>Mireala Radu Ghenta</b>
          </div>
        </Col>
        <Col className="shadow-radius mr-md-n4 mb-md-4" sm={12} md={4}>
          <blockquote className="pt-3 m-3 comments">
            Recomandat tuturor mămicilor care sunt în căutarea primei perechi de
            pantofi pt copilașul său. Eu am comandat pentru prima dată și sunt
            foarte încântată de ei. Doamna care produce aceste încălțăminte este
            foarte drăguță, va sfătuie cu tot ce trebuie sa știți pentru a alege
            perechea și mărimea potrivită. Calitate❗
          </blockquote>
          <div className="m-3 mb-3">
            <b>Bala Silvia</b>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default FacebookComments;
