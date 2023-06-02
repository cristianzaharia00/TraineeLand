import React, { Component, useContext } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import ShopContext from "../../context/shopcontext";
import StoreItem from "../Shop/store_item";
const BestSelling = () => {
  const { shop } = useContext(ShopContext);

  const comparePopularity = (a, b) => {
    if (a.popularity < b.popularity) return 1;
    else if (a.popularity > b.popularity) return -1;
    return 0;
  };

  const printBestSelling = () => {
    if (shop.length > 0) {
      let sortShop = [...shop];
      console.log(sortShop.sort(comparePopularity));
      return sortShop
        .filter((elem) => elem.showInShop == true)
        .slice(0, 4)
        .map((item, i) => {
          if (i == 3)
            return (
              <Col
                xs="6"
                sm="6"
                md="6"
                lg="4"
                xl="3"
                className="d-sm-block d-xs-block d-md-block d-lg-none d-xl-block offset pl-0 pr-0"
              >
                <StoreItem key={item._id} value={item} />
              </Col>
            );
          else
            return (
              <Col
                xs="6"
                sm="6"
                md="6"
                lg="4"
                xl="3"
                className="offset pl-0 pr-0"
              >
                <StoreItem key={item._id} value={item} />
              </Col>
            );
        });
    }
  };

  return (
    <div className="offset">
      <h3 className="heading text-center">Cele mai vandute perechi</h3>{" "}
      <div className="heading-underline"></div>
      <Row>{printBestSelling()}</Row>
    </div>
  );
};

export default BestSelling;
