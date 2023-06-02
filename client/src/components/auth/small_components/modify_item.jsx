import React from "react";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
const ModifyItem = (props) => {
  const item = props.value;

  return (
    <Col md="4">
      <Link to={"/login-register/modify/" + item._id}>
        <Card>
          <Card.Img
            variant="top"
            src={"https://res.cloudinary.com/dmpzc3ix9/" + item.image[0]}
          />
          <Card.Body>
            <Card.Title>{item.title}</Card.Title>
            <Card.Text>{item.price}</Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
};

export default ModifyItem;
