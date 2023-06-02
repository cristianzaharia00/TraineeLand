import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component, useContext, useEffect, useState } from "react";
import { Col, Container, Form, ProgressBar, Row, Table } from "react-bootstrap";
import OrderRow from "./orederrow";
import Footer from "./../../Shared/footer";
import UserContext from "../../context/usercontext";
import CartContext from "../../context/cartcontext";
import ShopContext from "../../context/shopcontext";
import Axios from "axios";
import { Button } from "react-bootstrap";
import {
  BrowserRouter,
  Route,
  Switch,
  Link,
  useHistory,
} from "react-router-dom";
import Checkout from "./cart_checkout";
import { Steps } from "rsuite";
import Send from "./cart_send";
import Success from "./cart_success";

const Cart = () => {
  const { userData } = useContext(UserContext);
  const { shop } = useContext(ShopContext);
  const { cart, setCart } = useContext(CartContext);
  const [error, setError] = useState(false);
  const history = useHistory();
  let item;
  const costTransport = 20;

  useEffect(() => {
    const getCart = async () => {
      const token = localStorage.getItem("auth-token");
      const axiosCart = await Axios.get("/users/cart", {
        headers: { "x-auth-token": token },
      });
      cart && setCart(axiosCart.data.cart);
    };
    if (userData.user) {
      getCart();
    } else {
      if (!localStorage.getItem("cart"))
        localStorage.setItem("cart", JSON.stringify([]));
      cart && setCart(JSON.parse(localStorage.getItem("cart")));
    }
  }, []);

  const computeSubtotal = () => {
    if (cart) {
      if (shop && shop.length > 0) {
        let sum = 0;

        cart.map((item) => {
          let shopItem = findItemByID(item._id);

          shopItem.price_reduced
            ? (sum += item.quantity * shopItem.price_reduced)
            : (sum += item.quantity * shopItem.price);
        });
        return sum;
      }
      return 0;
    }
  };

  const computeTotal = () => {
    return computeSubtotal() + costTransport;
  };

  const findItemByID = (_id) => {
    return shop.filter((e) => {
      return e._id == _id;
    })[0];
  };

  const showOrders = () => {
    if (shop.length > 0) {
      if (cart.length > 0) {
        return cart.map((item) => {
          let shopItem = findItemByID(item._id);
          shopItem = {
            ...shopItem,
            quantity: item.quantity,
            size: item.size,
            girth: item.girth,
            width: item.width,
            modelImage: item.modelImage,
            primaryColor: item.primaryColor,
            secondaryColor: item.secondaryColor,
            shoeType: item.shoeType,
          };
          return (
            <OrderRow
              key={item._id + shopItem.size + item.girth + item.width}
              value={shopItem}
            />
          );
        });
      }
    }
  };

  const verifyCart = () => {
    if (cart.length > 0) history.push("/cart/checkout");
    setError(true);
  };

  return (
    <React.Fragment>
      <Switch>
        <Route path="/cart/success">
          <Success />
        </Route>
        <Route path="/cart/checkout">
          <Checkout />
        </Route>
        <Route path="/cart/send">
          <Send />
        </Route>
        <Route path="/cart">
          <Container>
            <Steps current={0}>
              <Steps.Item title="Comanda" />
              <Steps.Item title="Detalii Livrare" />
              <Steps.Item title="Plasare Comanda" />
            </Steps>
            <Row>
              <Col md="8">
                <Table className="table table-striped cart-table">
                  <thead>
                    <tr>
                      <th scope="col">Produs</th>
                      <th scope="col"></th>
                      <th scope="col">Cantitate</th>
                      <th scope="col">Pret Total</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.length != 0 ? (
                      showOrders()
                    ) : (
                      <td
                        className="td-special"
                        colspan="5"
                        style={error ? { color: "red" } : {}}
                      >
                        Cosul dumneavoastra este gol
                      </td>
                    )}
                  </tbody>
                </Table>
              </Col>
              <Col className="price-table" md="4">
                <table className="checkout">
                  <thead>
                    <tr>
                      <th colSpan="2">Detalii Cos</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <th>Subtotal</th>
                      <td>
                        <span>{computeSubtotal() + ",00lei"}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <Button className="checkout-button mt-2 " onClick={verifyCart}>
                  Spre Livrare
                </Button>
              </Col>
            </Row>
          </Container>
        </Route>
      </Switch>
      <Footer />
    </React.Fragment>
  );
};

export default Cart;
