import React, { Component, useContext, useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Image,
  Row,
  Table,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import ShopContext from "../../context/shopcontext";
import UserContext from "../../context/usercontext";
import CartContext from "../../context/cartcontext";
import Carousel from "react-bootstrap/Carousel";
import Modal from "react-bootstrap/Modal";
import Axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRuler } from "@fortawesome/free-solid-svg-icons";
import "animate.css/animate.min.css";
import ReturnPolicy from "../About/return_policy";
import Toastify from "../../Shared/toastify";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { Transformation } from "@cloudinary/url-gen";
import { toast } from "react-toastify";

const StoreId = (props) => {
  const { userData } = useContext(UserContext);
  const { shop, setShop } = useContext(ShopContext);
  const { cart, setCart } = useContext(CartContext);
  const { id } = useParams();
  const [quantity, setQuantity] = useState("1");
  const [size, setSize] = useState("");
  const [show, setShow] = useState(false);
  const [girth, setGirth] = useState("");
  const [width, setWidth] = useState("");
  const [error, setError] = useState(false);

  const addToCart = async (e) => {
    e.preventDefault();
    if (!girth || !width || !size) {
      setError(true);
      return;
    } else {
      setError(false);
    }
    if (!userData.user)
      if (localStorage.getItem("cart")) {
        let new_cart = JSON.parse(localStorage.getItem("cart"));
        if (
          !new_cart.some(
            (el) =>
              id == el._id &&
              size == el.size &&
              width == el.width &&
              girth == el.girth
          )
        ) {
          new_cart.push({ _id: id, size, quantity, width, girth });
          localStorage.setItem("cart", JSON.stringify(new_cart));
          setCart(new_cart);
          toast.success(Toastify.ToastCartAdd());
        } else toast.error(Toastify.ToastCartAddError());
      } else {
        let new_cart = [];
        new_cart.push({ _id: id, size, quantity, width, girth });
        localStorage.setItem("cart", JSON.stringify(new_cart));
        setCart(new_cart);
        toast.success(Toastify.ToastCartAdd());
      }
    else {
      if (
        !cart.some(
          (el) =>
            id == el._id &&
            size == el.size &&
            width == el.width &&
            girth == el.girth
        )
      ) {
        let new_cart = [...cart, { _id: id, size, quantity, width, girth }];
        console.log(new_cart);
        console.log(cart);

        await Axios.put(
          "/users/cart",
          { cart: new_cart },
          {
            headers: { "x-auth-token": userData.token },
          }
        );

        setCart(new_cart);
        toast.success(Toastify.ToastCartAdd());
      } else toast.error(Toastify.ToastCartAddError());
    }
  };

  const printItem = () => {
    {
      /*const tableConstants = [
      [18, 11.3, 5.2, 15.0],
      [19, 12.0, 5.4, 15.5],
      [20, 12.6, 5.6, 16.0],
      [21, 13.3, 5.8, 16.5],
      [22, 14.0, 6.0, 17.0],
      [23, 14.6, 6.2, 17.5],
      [24, 15.3, 6.4, 18.0],
      [25, 16.0, 6.6, 18.5],
      [26, 16.6, 6.8, 19.0],
    ];*/
    }
    if (shop.length > 0) {
      const item = shop.filter((e) => {
        return e._id == id;
      })[0];
      return (
        <React.Fragment>
          <div className="offset"></div>
          <div className="offset"></div>
          <Row>
            <Col lg="7">
              <Carousel
                style={{
                  maxWidth: "80%",
                  float: "right",
                }}
              >
                {item.image.map((image_) => {
                  console.log(image_);
                  if (image_)
                    return (
                      <Carousel.Item>
                        <img
                          src={
                            "https://res.cloudinary.com/dmpzc3ix9/image/upload/" +
                            image_ +
                            ".png"
                          }
                          alt="First slide"
                          style={{
                            width: "100%",
                            height: "100% !important",
                            objectFit: "cover",
                          }}
                        />
                      </Carousel.Item>
                    );
                })}
              </Carousel>
            </Col>
            <Col lg="5">
              <div></div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              {item.price_reduced ? (
                <h4>
                  Preț : <strike>{item.price + ",00 lei"}</strike>{" "}
                  <span class="reduced-price">
                    {item.price_reduced + ",00 lei"}
                  </span>
                </h4>
              ) : (
                <h4>Pret: {item.price + ",00 lei"}</h4>
              )}

              <Form className="size-form">
                <Form.Group as={Row}>
                  <Form.Label className="col-sm-3 col-form-label">
                    <b>Lungime</b>
                  </Form.Label>

                  <Col sm="2">
                    <Form.Control
                      type="number"
                      className="mt-1"
                      onChange={(e) => setSize(e.target.value)}
                      size="sm"
                    ></Form.Control>
                  </Col>
                  <Form.Label className="col-sm-3 col-form-label">
                    <b>Latime</b>
                  </Form.Label>

                  <Col sm="2">
                    <Form.Control
                      type="number"
                      className="mt-1"
                      onChange={(e) => setWidth(e.target.value)}
                      size="sm"
                    ></Form.Control>
                  </Col>
                </Form.Group>

                <Form.Group as={Row}>
                  <Form.Label className="col-sm-3 col-form-label">
                    <b>Grosime</b>
                  </Form.Label>
                  <Col sm="2">
                    <Form.Control
                      type="number"
                      className="mt-1"
                      onChange={(e) => setGirth(e.target.value)}
                      size="sm"
                    ></Form.Control>
                  </Col>
                  <Form.Label className="col-sm-3 col-form-label">
                    <b>Cantitate</b>
                  </Form.Label>
                  <Col sm="2">
                    <Form.Control
                      className="mt-1"
                      onChange={(e) => setQuantity(e.target.value)}
                      as="select"
                      size="sm"
                    >
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                      <option>6</option>
                      <option>7</option>
                      <option>8</option>
                      <option>9</option>
                      <option>10</option>
                    </Form.Control>
                  </Col>
                </Form.Group>
                {error && (
                  <h6 style={{ color: "red" }}>
                    Va rog completati campurile pentru latime,lungime si
                    circumferinta
                  </h6>
                )}

                <Form.Group as={Row}>
                  <Col xs="5">
                    <Button type="submit" onClick={addToCart}>
                      Adaugati in cos
                    </Button>
                  </Col>

                  <Col xs="5" className="text-center">
                    <Button variant="primary" href="/about/measure">
                      <FontAwesomeIcon icon={faRuler}></FontAwesomeIcon> Ghid
                      Marime
                    </Button>
                  </Col>
                </Form.Group>
                <Form.Label>
                  <small>Valorile sunt in centimetri.</small>
                </Form.Label>
              </Form>
            </Col>
          </Row>
          {/*<Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Marime Papucei</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Table striped bordered hover style={{ marginLeft: "0px" }}>
                <thead>
                  <tr>
                    <th>Marime</th>
                    <th>Lungime interioara (cm)</th>
                    <th>Latime la degete (cm)</th>
                    <th>Circumferinta la rist (cm)</th>
                  </tr>
                </thead>
                <tbody>
                  {tableConstants.map((row) => (
                    <tr>
                      <td className="text-center">{row[0]}</td>
                      <td className="text-center">{row[1]}</td>
                      <td className="text-center">{row[2]}</td>
                      <td className="text-center">{row[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
                  </Modal>*/}
        </React.Fragment>
      );
    }
  };

  return (
    <React.Fragment>
      <Container>{printItem()}</Container>
    </React.Fragment>
  );
};

export default StoreId;
