import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";

import lether from "../../../assets/home/icons/true_lether1.png";
import handmade from "../../../assets/home/icons/HandMade.png";
import barefoot from "../../../assets/home/icons/barefoot.jpg";
class ItemPresentation extends Component {
  state = {};
  render() {
    return (
      <div id="features" className="offset">
        <div className="narrow">
          <div className="col-12">
            <h3 className="heading text-center">Produsele Enna Shoes</h3>
            <div className="heading-underline"></div>
          </div>
          <Row>
            <Col md={4} className="text-center">
              {" "}
              <div>
                <img
                  className="mx-auto"
                  width={100}
                  height={100}
                  src={lether}
                ></img>
                <div className="offset"></div>
                <div>
                  <h6>
                    <b>
                      Piele naturala ramane materialul cel mai apreciat datorita
                      beneficiilor pe care le ofera. Excelenta respirabilitate
                      oferita picioruselor, flexibilitate si nu in ultimul rand
                      ofera un aspect elegant si luxos. Avem grija sa folosim
                      pielea de cea mai buna calitate de la furnizori Premium.{" "}
                      <a className="read-more-hover" href="/about">
                        Citeste mai mult
                      </a>
                    </b>
                  </h6>
                </div>
              </div>
            </Col>
            <Col md={4} className="text-center">
              {" "}
              <img
                className="mx-auto"
                width={100}
                height={100}
                src={handmade}
              ></img>
              <div>
                <div>
                  <div className="offset"></div>
                  <h6>
                    <b>
                      De ce handmade? Raspunsul este pentru a aduce unicitate,
                      pentru ca fiecare copilas este unic si ne dorim sa ramana
                      asa, sa ma disting din multime si sa ma separ de
                      comercial. Toate produsele sunt lucrate manual si prin
                      asta oferim o parte din viata noastra, timp din viata!{" "}
                      <a className="read-more-hover" href="/about">
                        Citeste mai mult
                      </a>
                    </b>
                  </h6>
                </div>
              </div>
            </Col>
            <Col md={4} className="text-center">
              {" "}
              <div>
                <img
                  className="mx-auto"
                  width={100}
                  height={100}
                  src={barefoot}
                ></img>
                <div className="offset"></div>
                <div>
                  <h6>
                    <b>
                      Papucei tip Barefoot (picior gol)! Incurajam si sustinem
                      purtatul pantofiorilor nostri tip Barefoot cu scopul de a
                      ajuta copilul sa calce cat mai corect si sa puna in
                      functiune toti nervii senzoriali si muschii gleznelor.{" "}
                      <a className="read-more-hover" href="/about">
                        Citeste mai mult
                      </a>
                    </b>
                  </h6>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default ItemPresentation;
