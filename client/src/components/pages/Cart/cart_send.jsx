import React, { Component, useContext, useState } from "react";
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
import CartContext from "../../context/cartcontext";
import shopcontext from "../../context/shopcontext";
import ShopContext from "../../context/shopcontext";
import Axios from "axios";
import UserContext from "../../context/usercontext";
import { Steps } from "rsuite";
import { faTachometerAlt } from "@fortawesome/free-solid-svg-icons";

const Send = (props) => {
  const location = useLocation();
  const history = useHistory();
  const { userData } = useContext(UserContext);
  const { cart, setCart } = useContext(CartContext);
  const { shop } = useContext(shopcontext);
  const [deliveryType, setDeliveryType] = useState("");
  const [priceDelivery, setDeliveryPrice] = useState(0);
  const [error, setError] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const {
    email,
    firstName,
    surname,
    phone,
    address,
    states,
    city,
    zip,
    comments,
  } = location.state;

  const sendOrder = async () => {
    var userID = "";
    if (cart.length > 0 && shop.length > 0) {
      if (userData.user !== undefined) userID = userData.user.id;
      if (!deliveryType) setError(true);
      else {
        setDisableButton(true);
        const token = localStorage.getItem("auth-token");
        await Axios.post(
          "/order/",
          {
            email,
            firstName,
            surname,
            phone,
            address,
            states,
            city,
            zip,
            comments,
            command: cart,
            deliveryType,
            userID,
          },
          { headers: { "x-auth-token": token } }
        ).then(() => {
          setCart([]);
          localStorage.setItem("cart", []);
          history.push("/cart/success");
        });
      }
    }
  };

  const findItemByID = (_id) => {
    return shop.filter((e) => {
      return e._id == _id;
    })[0];
  };

  const computeSubtotal = () => {
    if (cart.length > 0 && shop.length > 0) {
      let sum = 0;
      cart.map((item) => {
        const shopItem = findItemByID(item._id);
        shopItem.price_reduced
          ? (sum += item.quantity * shopItem.price_reduced)
          : (sum += item.quantity * shopItem.price);
      });
      return sum;
    }
  };

  const total = () => {
    if (deliveryType) {
      let sum = 0;
      sum = sum + computeSubtotal();
      sum = sum + priceDelivery;
      return sum + ",00lei";
    } else return "Alegeti metoda de livrare va rog";
  };

  const printRows = () => {
    if (cart.length > 0 && shop.length > 0) {
      return cart.map((item) => {
        const shopItem = findItemByID(item._id);
        console.log(shopItem);
        return (
          <tr>
            <td>
              {item.modelImage
                ? shopItem.title +
                  " " +
                  item.shoeType +
                  " " +
                  item.primaryColor +
                  " " +
                  item.secondaryColor +
                  " " +
                  item.modelImage +
                  " (" +
                  item.size +
                  " x " +
                  item.width +
                  " x " +
                  item.girth +
                  ") x " +
                  item.quantity
                : shopItem.title +
                  " (" +
                  item.size +
                  " x " +
                  item.width +
                  " x " +
                  item.girth +
                  ") x " +
                  item.quantity}
            </td>
            <td>
              {shopItem.price_reduced
                ? item.quantity * shopItem.price_reduced + ",00lei"
                : item.quantity * shopItem.price + ",00lei"}
            </td>
          </tr>
        );
      });
    }
  };

  return (
    <Container>
      <Steps current={2}>
        <Steps.Item title="Comanda" />
        <Steps.Item title="Detalii Livrare" />
        <Steps.Item title="Plasare Comanda" />
      </Steps>
      <Form>
        <table className="send-table">
          <thead>
            <tr>
              <th>Produse</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>{printRows()}</tbody>
          <tfoot>
            <tr>
              <th>Subtotal</th>
              <td>{computeSubtotal() + ",00lei"}</td>
            </tr>
            <tr>
              <th>Livrare</th>
              <td>
                <Row>
                  <Col sm={8}>
                    <Form.Group className="mt-3" as={Row}>
                      <Form.Check
                        onClick={(e) => {
                          setDeliveryPrice(18);
                          setDeliveryType("Curier Ramburs - 18.00lei");
                        }}
                        type="radio"
                        name="formHorizontalRadios"
                        label="Curier Ramburs - 18.00lei"
                      />

                      <div
                        style={{ color: "#dc3545" }}
                        className={error ? "inline-errormsg" : "hidden"}
                      >
                        Alegeti tipul de livrare
                      </div>
                    </Form.Group>
                  </Col>
                </Row>
              </td>
            </tr>
            <tr>
              <th>Total</th>
              <td>{total()}</td>
            </tr>
          </tfoot>
        </table>

        <Button className="mt-2" onClick={sendOrder} disabled={disableButton}>
          Trimite Comanda
        </Button>
      </Form>
    </Container>
  );
};

export default Send;
