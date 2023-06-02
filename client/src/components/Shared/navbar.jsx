import { faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component, useContext } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { BrowserRouter as Router, Link } from "react-router-dom";
import icon1 from "../../logo.png";
import CartContext from "../context/cartcontext";
const NavBar = () => {
  const { cart } = useContext(CartContext);

  return (
    <Navbar bg="light" expand="lg" fixed="top">
      <Navbar.Brand href="/home">
        <img src={icon1} width="90" height="75"></img>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav className="me-auto mt-2 my-lg-0">
          <Nav.Link href="/home">Acasa</Nav.Link>
          <Nav.Link href="/shop">Magazin</Nav.Link>
          <Nav.Link href="/gallery">Galerie</Nav.Link>
          <NavDropdown title="Alte Informatii" id="basic-nav-dropdown">
            <NavDropdown.Item href="/about">Despre Noi</NavDropdown.Item>
            <NavDropdown.Item href="/about/measure">
              Masurare piciorus
            </NavDropdown.Item>
            <NavDropdown.Item href="/about/return">
              Formular Returnare
            </NavDropdown.Item>
          </NavDropdown>
          {/*<Nav.Link href="/customize">Personalizare</Nav.Link>*/}
        </Nav>
        <Nav.Link className="ml-auto d-flex reduced-price" href="/shop">
          Cumparati acum!
        </Nav.Link>
        <Nav className="d-flex navbar-icons">
          <Nav.Link className="d-flex" href="/login-register">
            <FontAwesomeIcon className="nav-user" icon={faUser} />
          </Nav.Link>
          <Nav.Link className="d-flex" href="/cart">
            <FontAwesomeIcon className="nav-cart" icon={faShoppingCart} />
            <div className="cart-items">{cart.length}</div>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;

/*<nav className="navbar navbar-expand-md navbar-light bg-white fixed-top">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto nav-links">
          <Link className="nav-link" to="/">
            <img src={icon1}></img>
          </Link>
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Acasa
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/shop">
              Magazin
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/gallery">
              Galerie
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/about">
              Despre Noi
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav nav-icons">
          <li className="nav-item">
            <Link className="nav-link" to="/login-register">
              <FontAwesomeIcon className="nav-user" icon={faUser} />
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/cart">
              <FontAwesomeIcon className="nav-cart" icon={faShoppingCart} />
              <div className="cart-items">{cart.length}</div>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
    */
