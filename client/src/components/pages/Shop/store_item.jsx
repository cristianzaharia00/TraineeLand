import React, { Component } from "react";
import { Card, Button, Col } from "react-bootstrap";
import { Cloudinary } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";
import base64toImage from "base64-to-image";
import { Link } from "react-router-dom";

const StoreItem = (props) => {
  const item = props.value;

  const PrintCardText = (item) => {
    if (item.price_reduced)
      return (
        <React.Fragment>
          <strike>{item.price + ",00lei "}</strike>
          <span className="reduced-price">
            &nbsp;
            {item.price_reduced + ",00lei"}
          </span>
        </React.Fragment>
      );
    else return item.price + ",00lei";
  };

  return (
    <Link to={"shop/item/" + item._id}>
      <Card>
        <Card.Img
          variant="top"
          src={
            "https://res.cloudinary.com/dmpzc3ix9/image/upload/w_400,h_500,c_scale/" +
            item.image[0]
          }
        />
        <Card.Body className="border-bottom ">
          <Card.Title className="card-title-user">{item.title}</Card.Title>
          <Card.Text>{PrintCardText(item)}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default StoreItem;
