import React, { useContext, useState } from "react";
import { Button, Col, Container, Form, ListGroup, Row } from "react-bootstrap";
import { BrowserRouter, Link, Route, useHistory } from "react-router-dom";
import UserContext from "../context/usercontext";
import Axios from "axios";
import CartContext from "../context/cartcontext";
import ErrorNotice from "./small_components/login-register_errornotice";
import Add from "./subpages/add";
import Switch from "react-bootstrap/esm/Switch";
import OwnOrders from "./subpages/ownorders";
import Modify from "./subpages/modify";
import Orders from "./subpages/orders";
import Footer from "../Shared/footer";
import Returns from "./subpages/returnorders";
function LoginRegister() {
  const { userData, setUserData } = useContext(UserContext);
  const { cart, setCart } = useContext(CartContext);
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [loginPassword, setLoginPassword] = useState();
  const [loginEmail, setLoginEmail] = useState();
  const [errorLogin, setLoginError] = useState("");
  const [errorRegister, setRegisterError] = useState("");
  const history = useHistory();

  const loginUser = async (e) => {
    try {
      console.log(e);
      e.preventDefault();

      const loginRes = await Axios.post("/users/login", {
        email: loginEmail,
        password: loginPassword,
      });

      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);

      if (localStorage.getItem("cart")) {
        await Axios.put(
          "/users/cart",
          { cart: JSON.parse(localStorage.getItem("cart")) },
          {
            headers: { "x-auth-token": userData.token },
          }
        );
        setCart(localStorage.getItem("cart"));
      }
    } catch (err) {
      err.response.data.msg && setLoginError(err.response.data.msg);
    }
  };

  const logoutUser = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const registerUser = async (e) => {
    try {
      e.preventDefault();
      const newUser = { email, password, username, passwordCheck };
      await Axios.post("/users/", newUser);
      const loginRes = await Axios.post("/users/login", {
        email,
        password,
      });

      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      if (localStorage.getItem("cart")) {
        await Axios.put(
          "/users/cart",
          { cart: JSON.parse(localStorage.getItem("cart")) },
          {
            headers: { "x-auth-token": userData.token },
          }
        );
        setCart(localStorage.getItem("cart"));
      }
      history.push("/");
    } catch (err) {
      err.response.data.msg && setRegisterError(err.response.data.msg);
    }
  };

  const loggedIn = () => {
    if (!userData.user) {
      return (
        <Row>
          <Col className="container-login" md="6">
            <Container>
              <h4>Logare</h4>
              {errorLogin && <ErrorNotice msg={errorLogin} />}
              <Form onSubmit={loginUser}>
                <Form.Group controlId="formGroupEmail">
                  <Form.Label>Adresa de Email</Form.Label>
                  <Form.Control
                    onChange={(e) => setLoginEmail(e.target.value)}
                    type="email"
                  />
                </Form.Group>
                <Form.Group controlId="formGroupPassword">
                  <Form.Label>Parola</Form.Label>
                  <Form.Control
                    onChange={(e) => setLoginPassword(e.target.value)}
                    type="password"
                  />
                </Form.Group>
                <Button type="submit">Logare</Button>
              </Form>
            </Container>
          </Col>

          <Col className="container-register" md="6">
            <Container>
              <h4>Inregistrare</h4>
              {errorRegister && <ErrorNotice msg={errorRegister} />}
              <Form onSubmit={registerUser}>
                <Form.Group controlId="formGroupEmail">
                  <Form.Label>Adresa de Email</Form.Label>
                  <Form.Control
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                  />
                </Form.Group>
                <Form.Group controlId="formGroupUsername">
                  <Form.Label>Nume de Utilizator</Form.Label>
                  <Form.Control
                    onChange={(e) => setUsername(e.target.value)}
                    type="username"
                  />
                </Form.Group>
                <Form.Group controlId="formGroupPassword">
                  <Form.Label>Parola</Form.Label>
                  <Form.Control
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                  />
                </Form.Group>
                <Form.Group controlId="formGroupPassword">
                  <Form.Label>Confirma Parola</Form.Label>
                  <Form.Control
                    onChange={(e) => setPasswordCheck(e.target.value)}
                    type="password"
                  />
                </Form.Group>
                <Button type="submit">Inregistrare</Button>
              </Form>
            </Container>
          </Col>
        </Row>
      );
    } else {
      return (
        <React.Fragment>
          <Row>
            <Col sm="4">
              <ListGroup>
                <ListGroup.Item>
                  <Link to="login-register/ownorders">Comenzile Mele</Link>
                </ListGroup.Item>
                <ListGroup.Item>Adresa</ListGroup.Item>
                <ListGroup.Item>Detalii cont</ListGroup.Item>
                <ListGroup.Item>
                  <span className="link-logout copy-a" onClick={logoutUser}>
                    Delogare
                  </span>
                </ListGroup.Item>
                {userData.user.role === "admin" && (
                  <React.Fragment>
                    <ListGroup.Item>
                      <Link to="login-register/add">
                        Adauga articol in magazin
                      </Link>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Link to="login-register/modify">
                        Modifica articole din magazin
                      </Link>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Link to="login-register/orders">Comenzile curente</Link>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Link to="login-register/returnorders">
                        Formulare Returnare
                      </Link>
                    </ListGroup.Item>
                  </React.Fragment>
                )}
              </ListGroup>
            </Col>
            <Col sm="8" className="logged">
              <p>
                Conectat ca <b>{userData.user.username}</b> (Nu esti{" "}
                <b>{userData.user.username}</b>?
                <span className="copy-a logger" onClick={logoutUser}>
                  {" "}
                  Delogare
                </span>
                ) <br></br>
                <br></br> Din contul tau poti sa-ti vezi comenzile recente,
                sa-ti modifici adresa de livrare si sa-ti modifici detalii
                despre cont
              </p>
            </Col>
          </Row>
          <div style={{ height: "100px" }}></div>
        </React.Fragment>
      );
    }
  };

  return (
    <React.Fragment>
      <BrowserRouter>
        <Switch>
          <div className="offset"></div>

          <Route path="/login-register/add">
            <Container>
              <h1>Administrare Cont</h1>
              <Add />
            </Container>
          </Route>
          <Route path="/login-register/modify">
            <Container>
              <h1>Administrare Cont</h1>
              <Modify />
            </Container>
          </Route>
          <Route path="/login-register/orders">
            <h1>Administrare Cont</h1>
            <Orders />
          </Route>
          <Route path="/login-register/ownorders">
            <Container>
              <h1>Administrare Cont</h1>
              <OwnOrders />
            </Container>
          </Route>
          <Route path="/login-register/returnorders">
            <Container>
              <h1>Administrare Cont</h1>
              <Returns />
            </Container>
          </Route>
          <Route exact path="/login-register/">
            <Container>
              <h1>Administrare Cont</h1>
              {loggedIn()}
            </Container>
          </Route>

          <Footer></Footer>
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default LoginRegister;
