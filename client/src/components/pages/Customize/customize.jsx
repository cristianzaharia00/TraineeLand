import React, { Component, useRef, useState, useContext } from "react";
import ImagePicker from "react-image-picker";
import "react-image-picker/dist/index.css";
import ShopContext from "../../context/shopcontext";
import UserContext from "../../context/usercontext";
import CartContext from "../../context/cartcontext";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRuler } from "@fortawesome/free-solid-svg-icons";
import { Button, Col, Container, Form, ListGroup, Row } from "react-bootstrap";
import PapuceiCulori from "../../../assets/customize/colors/CuloriPapucei2.png";
import CizmuliteSageti from "../../../assets/customize/type/CizmuliteSageti.png";
import GhetuteLanaSageti from "../../../assets/customize/type/GhetuteLanaSageti.png";
import GhetuteVegetaleSageti from "../../../assets/customize/type/GhetuteVegetaleSageti.png";
import PantofioriSageti from "../../../assets/customize/type/PantofioriSageti.png";
import SandaluteSageti from "../../../assets/customize/type/SandaluteSageti.png";
import Cizmulite from "../../../assets/customize/type/Cizmulite.png";
import GhetuteLana from "../../../assets/customize/type/GhetuteLana.png";
import GhetuteVegetale from "../../../assets/customize/type/GhetuteVegetale.png";
import Pantofiori from "../../../assets/customize/type/Pantofiori.png";
import Sandalute from "../../../assets/customize/type/Sandalute.png";
import Fluturasi from "../../../assets/customize/models/Fluturasi.jpeg";
import Inimioare from "../../../assets/customize/models/Inimioare.jpeg";
import Mickey from "../../../assets/customize/models/Mickey.jpeg";
import Stele from "../../../assets/customize/models/Stele.jpeg";
import Axios from "axios";
import { left } from "@cloudinary/url-gen/qualifiers/textAlignment";
const Customize = () => {
  useEffect(() => {
    CustomSelect();
    SecondCustomSelect();
  }, []);

  const { userData } = useContext(UserContext);
  const { cart, setCart } = useContext(CartContext);
  const imageList = [Pantofiori, Sandalute, GhetuteLana, GhetuteVegetale];
  const [quantity, setQuantity] = useState("1");
  const [size, setSize] = useState("");
  const [show, setShow] = useState(false);
  const [girth, setGirth] = useState("");
  const [width, setWidth] = useState("");
  const [error, setError] = useState(false);
  const [primaryColor, setPrimaryColor] = useState("");
  const [secondaryColor, setSecondaryColor] = useState("");
  const [currentImage, setCurrentImage] = useState("Cizmulite");
  const [showColors, setShowColors] = useState(false);
  const [modelImage, setModelImage] = useState("");
  const [shoeType, setShoeType] = useState("");
  const id = "62b4b9d6993d3341b08dd5fc";
  const imageMap = {
    Cizmulite: Cizmulite,
    GhetuteLana: GhetuteLana,
    GhetuteVegetale: GhetuteVegetale,
    Pantofiori: Pantofiori,
    Sandalute: Sandalute,
  };

  const imageMapSageti = {
    Cizmulite: CizmuliteSageti,
    GhetuteLana: GhetuteLanaSageti,
    GhetuteVegetale: GhetuteVegetaleSageti,
    Pantofiori: PantofioriSageti,
    Sandalute: SandaluteSageti,
  };

  const modelsImageMap = [
    { src: Fluturasi, value: "Fluturasi" },
    { src: Inimioare, value: "Inimioare" },
    { src: Mickey, value: "Mickey" },
    { src: Stele, value: "Stele" },
  ];

  var CustomSelect = () => {
    var x, i, j, l, ll, selElmnt, a, b, c;
    /* Look for any elements with the class "custom-select": */
    x = document.getElementsByClassName("custom-select2");
    l = x.length;
    for (i = 0; i < l; i++) {
      selElmnt = x[i].getElementsByTagName("select")[0];
      ll = selElmnt.length;
      /* For each element, create a new DIV that will act as the selected item: */
      a = document.createElement("DIV");
      a.setAttribute("class", "select-selected gray-option");
      a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
      x[i].appendChild(a);
      /* For each element, create a new DIV that will contain the option list: */
      b = document.createElement("DIV");
      b.setAttribute("class", "select-items select-hide");
      for (j = 1; j < ll; j++) {
        /* For each option in the original select element,
    create a new DIV that will act as an option item: */
        c = document.createElement("DIV");
        c.innerHTML = selElmnt.options[j].innerHTML;
        c.setAttribute("class", selElmnt.options[j].className);
        c.addEventListener("click", function (e) {
          /* When an item is clicked, update the original select box,
        and the selected item: */
          var y, i, k, s, h, sl, yl;
          s = this.parentNode.parentNode.getElementsByTagName("select")[0];
          sl = s.length;
          h = this.parentNode.previousSibling;
          for (i = 0; i < sl; i++) {
            if (s.options[i].innerHTML == this.innerHTML) {
              s.selectedIndex = i;
              h.innerHTML = this.innerHTML;
              for (var p = 0; p < this.classList.length; p++)
                if (this.classList[0].includes("option"))
                  setPrimaryColor(this.classList[0].split("-option")[0]);
              h.setAttribute("class", "select-selected " + this.className);
              y = this.parentNode.getElementsByClassName("same-as-selected");
              yl = y.length;
              for (k = 0; k < yl; k++) {
                y[k].classList.remove("same-as-selected");
              }
              this.classList.add("same-as-selected");
              break;
            }
          }
          h.click();
        });
        b.appendChild(c);
      }
      x[i].appendChild(b);
      a.addEventListener("click", function (e) {
        /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
      });
    }

    function closeAllSelect(elmnt) {
      /* A function that will close all select boxes in the document,
  except the current select box: */
      var x,
        y,
        i,
        xl,
        yl,
        arrNo = [];
      x = document.getElementsByClassName("select-items");
      y = document.getElementsByClassName("select-selected");
      xl = x.length;
      yl = y.length;
      for (i = 0; i < yl; i++) {
        if (elmnt == y[i]) {
          arrNo.push(i);
        } else {
          y[i].classList.remove("select-arrow-active");
        }
      }
      for (i = 0; i < xl; i++) {
        if (arrNo.indexOf(i)) {
          x[i].classList.add("select-hide");
        }
      }
    }

    /* If the user clicks anywhere outside the select box,
then close all select boxes: */
    document.addEventListener("click", closeAllSelect);
  };

  var SecondCustomSelect = () => {
    var x, i, j, l, ll, selElmnt, a, b, c;
    /* Look for any elements with the class "custom-select": */
    x = document.getElementsByClassName("custom-select3");
    l = x.length;
    for (i = 0; i < l; i++) {
      selElmnt = x[i].getElementsByTagName("select")[0];
      ll = selElmnt.length;
      /* For each element, create a new DIV that will act as the selected item: */
      a = document.createElement("DIV");
      a.setAttribute("class", "select-selected3 gray-option");
      a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
      x[i].appendChild(a);
      /* For each element, create a new DIV that will contain the option list: */
      b = document.createElement("DIV");
      b.setAttribute("class", "select-items3 select-hide3");
      for (j = 1; j < ll; j++) {
        /* For each option in the original select element,
    create a new DIV that will act as an option item: */
        c = document.createElement("DIV");
        c.innerHTML = selElmnt.options[j].innerHTML;
        c.setAttribute("class", selElmnt.options[j].className);
        c.addEventListener("click", function (e) {
          /* When an item is clicked, update the original select box,
        and the selected item: */
          var y, i, k, s, h, sl, yl;
          s = this.parentNode.parentNode.getElementsByTagName("select")[0];
          sl = s.length;
          h = this.parentNode.previousSibling;
          for (i = 0; i < sl; i++) {
            if (s.options[i].innerHTML == this.innerHTML) {
              s.selectedIndex = i;
              h.innerHTML = this.innerHTML;
              console.log(h, this, c.className);
              for (var p = 0; p < this.classList.length; p++)
                if (this.classList[0].includes("option"))
                  setSecondaryColor(this.classList[0].split("-option")[0]);
              h.setAttribute("class", "select-selected3 " + this.className);
              y = this.parentNode.getElementsByClassName("same-as-selected3");
              yl = y.length;
              for (k = 0; k < yl; k++) {
                y[k].classList.remove("same-as-selected3");
              }
              this.classList.add("same-as-selected3");
              break;
            }
          }
          h.click();
        });
        b.appendChild(c);
      }
      x[i].appendChild(b);
      a.addEventListener("click", function (e) {
        /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide3");
        this.classList.toggle("select-arrow-active3");
      });
    }

    function closeAllSelect(elmnt) {
      /* A function that will close all select boxes in the document,
  except the current select box: */
      var x,
        y,
        i,
        xl,
        yl,
        arrNo = [];
      x = document.getElementsByClassName("select-items3");
      y = document.getElementsByClassName("select-selected3");
      xl = x.length;
      yl = y.length;
      for (i = 0; i < yl; i++) {
        if (elmnt == y[i]) {
          arrNo.push(i);
        } else {
          y[i].classList.remove("select-arrow-active3");
        }
      }
      for (i = 0; i < xl; i++) {
        if (arrNo.indexOf(i)) {
          x[i].classList.add("select-hide3");
        }
      }
    }

    /* If the user clicks anywhere outside the select box,
then close all select boxes: */
    document.addEventListener("click", closeAllSelect);
  };

  const imageRef = useRef();

  let ShoeTypeChosen = (type) => {
    setCurrentImage(type);
    setShoeType(type);
    setShowColors(false);
    setTimeout(() => {
      setShowColors(true);
    }, 200);

    setTimeout(() => {
      imageRef.current.scrollIntoView();
    }, 500);
  };

  const addToCart = async (e) => {
    e.preventDefault();
    console.log(
      girth,
      width,
      size,
      primaryColor,
      secondaryColor,
      modelImage,
      currentImage,
      shoeType
    );
    if (
      !girth ||
      !width ||
      !size ||
      !primaryColor ||
      !primaryColor ||
      !modelImage
    ) {
      setError(true);
      return;
    } else {
      setError(false);
    }

    if (!userData.user) {
      if (localStorage.getItem("cart")) {
        let new_cart = JSON.parse(localStorage.getItem("cart"));
        if (
          !new_cart
            .filter((el) => el.modelImage !== undefined)
            .some(
              (el) =>
                id == el._id &&
                size == el.size &&
                width == el.width &&
                girth == el.girth &&
                modelImage == el.modelImage &&
                primaryColor == el.primaryColor &&
                secondaryColor == el.secondaryColor &&
                currentImage == el.shoeType
            )
        ) {
          new_cart.push({
            _id: id,
            size,
            quantity,
            width,
            girth,
            primaryColor,
            secondaryColor,
            modelImage,
            shoeType,
          });
          localStorage.setItem("cart", JSON.stringify(new_cart));
          setCart(new_cart);
          //store.addNotification(notificationSucces);
        } //else store.addNotification(notificationFail);
      } else {
        let new_cart = [];
        new_cart.push({
          _id: id,
          size,
          quantity,
          width,
          girth,
          primaryColor,
          secondaryColor,
          modelImage,
          shoeType,
        });
        localStorage.setItem("cart", JSON.stringify(new_cart));
        setCart(new_cart);

        //store.addNotification(notificationSucces);
      }
    } else {
      if (
        !cart
          .filter((el) => el.modelImage !== undefined)
          .some(
            (el) =>
              id == el._id &&
              size == el.size &&
              width == el.width &&
              girth == el.girth &&
              modelImage == el.modelImage &&
              primaryColor == el.primaryColor &&
              secondaryColor == el.secondaryColor &&
              shoeType == el.shoeType
          )
      ) {
        let new_cart = [
          ...cart,
          {
            _id: id,
            size,
            quantity,
            width,
            girth,
            primaryColor,
            secondaryColor,
            modelImage,
            shoeType,
          },
        ];
        console.log(new_cart);
        console.log(cart);
        console.log(new_cart.filter((el) => el.modelImage !== undefined));
        await Axios.put(
          "/users/cart",
          { cart: new_cart },
          {
            headers: { "x-auth-token": userData.token },
          }
        );

        setCart(new_cart);
        //store.addNotification(notificationSucces);
      } //else store.addNotification(notificationFail);
    }
  };

  return (
    <React.Fragment>
      <Container>
        <h1>Customize</h1>
        <Row className="row-choose-customize">
          <Col md={{ span: 6 }} className="mb-4">
            <div
              className="col-choose-container"
              onClick={(e) => {
                e.preventDefault();
                ShoeTypeChosen("Cizmulite");
              }}
            >
              <div className="d-flex col-choose-customize pb-3 pt-3">
                <img
                  className="ml-2 image-choose-customize"
                  src={Cizmulite}
                ></img>
                <div className="ml-1 a-choose-customize ">
                  <div className="mt-3 text-center">Cizmulite</div>
                  <p className="mt-2 text-center">
                    Perfecti pentru Iarna cand temperatura scade sub 0 grade,
                  </p>
                </div>
              </div>
            </div>
          </Col>
          <Col md={{ span: 6 }} className="mb-4">
            <div
              className="col-choose-container"
              onClick={(e) => {
                ShoeTypeChosen("Pantofiori");
              }}
            >
              <div className="d-flex col-choose-customize pb-3 pt-3">
                <img
                  className="ml-2 image-choose-customize"
                  src={Pantofiori}
                ></img>
                <div className="ml-1 a-choose-customize  text-center ml-auto mr-auto">
                  <div className="mt-3 text-center">Pantofiori</div>
                  <p className="mt-2 text-center">
                    Pantofiorii sunt perfecti pentru o zi cu ploaie neprevazuta.
                  </p>
                </div>
              </div>
            </div>
          </Col>
          <Col md={{ offset: 3, span: 6 }} className="mb-4">
            <div
              className="col-choose-container "
              onClick={(e) => {
                ShoeTypeChosen("Sandalute");
              }}
            >
              <div className="d-flex col-choose-customize pb-3 pt-3">
                <img
                  className="ml-2 image-choose-customize"
                  src={Sandalute}
                ></img>
                <div className="ml-1 a-choose-customize  text-center ml-auto mr-auto">
                  <div className="mt-3 text-center">Sandalute</div>
                  <p className="mt-2 text-center">
                    Sunt perfecte vara cand piciorusul copilului trebuie sa
                    respire.
                  </p>
                </div>
              </div>
            </div>
          </Col>
          <Col md={{ span: 6 }} className="mb-4">
            <div
              className="col-choose-container"
              onClick={(e) => {
                ShoeTypeChosen("GhetuteLana");
              }}
            >
              <div className="d-flex col-choose-customize pb-3 pt-3">
                <img
                  className="ml-2 image-choose-customize"
                  src={GhetuteLana}
                ></img>
                <div className="ml-1 a-choose-customize ">
                  <div className="mt-3 text-center">Ghetute (Lana)</div>
                  <p className="mt-2 text-center">
                    Ghetute pentru toamna sau primavara cand temperatura nu
                    trece de 20 de grade
                  </p>
                </div>
              </div>
            </div>
          </Col>
          <Col md={{ span: 6 }} className="mb-4">
            <div
              className="col-choose-container"
              onClick={(e) => {
                ShoeTypeChosen("GhetuteVegetale");
              }}
            >
              <div className="d-flex col-choose-customize pb-3 pt-3">
                <img
                  className="ml-2 image-choose-customize"
                  src={GhetuteVegetale}
                ></img>
                <div className="ml-1 a-choose-customize  text-center ml-auto mr-auto">
                  <div className="mt-3 text-center">Ghetute (Vegetale)</div>
                  <p className="mt-2 text-center">
                    Pentru confortul piciorusului este o alegere perfecta
                  </p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row
          className={
            showColors
              ? "choose-color-row d-flex justify-content-center text-center mt-5 visible"
              : "choose-color-row justify-content-center text-center mt-5"
          }
        >
          <Col
            ref={imageRef}
            className="border-right align-middle"
            sm="12"
            md="6"
          >
            <Form.Group className="mb-3">
              <Form.Label>Culoarea primara:</Form.Label>
              <div class="custom-select2">
                <select>
                  <option style={{ backgroundColor: "red" }} value="0">
                    Alege Culoarea
                  </option>
                  <option className="bordo-option" value="bordo"></option>
                  <option className="rosu-option" value="rosu"></option>
                  <option
                    className="portocaliu-inchis-option"
                    value="portocaliu-inchis"
                  ></option>
                  <option
                    className="portocaliu-deschis-option"
                    value="portocaliu-deschis"
                  ></option>
                  <option
                    className="galben-lamaie-option"
                    value="galben-lamaie"
                  ></option>
                  <option className="mov-option" value="mov"></option>
                  <option className="fucsia-option" value="fucsia"></option>
                  <option
                    className="roz-bombon-option"
                    value="roz-bombon"
                  ></option>
                  <option className="roz-pal-option" value="roz-pal"></option>
                  <option className="argintiu-option" value="2"></option>
                  <option className="maro-option" value="maro"></option>
                  <option
                    className="cappuccino-option"
                    value="cappuccino"
                  ></option>
                  <option className="bronz-option" value="bronz"></option>
                  <option
                    className="latte-machiato-option"
                    value="latte-machiato"
                  ></option>
                  <option className="crem-option" value="crem"></option>
                  <option className="alb-mat-option" value="alb-mat"></option>
                  <option
                    className="alb-sidefat-option"
                    value="alb-sidefat"
                  ></option>
                  <option className="negru-option" value="negru"></option>
                  <option
                    className="gri-petrol-option"
                    value="gri-petrol"
                  ></option>
                  <option
                    className="gri-albastrui-option"
                    value="gri-albastrui"
                  ></option>
                  <option className="gri-option" value="gri"></option>
                  <option
                    className="verde-crud-option"
                    value="verde-crud"
                  ></option>
                  <option
                    className="verde-fistic-option"
                    value="verde-fistic"
                  ></option>
                  <option className="turcoaz-option" value="turcoaz"></option>
                  <option
                    className="bleumarin-inchis-lucios-option"
                    value="bleumarin-inchis-lucios"
                  ></option>
                  <option
                    className="bleumarin-lucios-option"
                    value="bleumarin-lucios"
                  ></option>
                  <option
                    className="bleumarin-mat-option"
                    value="bleumarin-mat"
                  ></option>
                  <option
                    className="amparo-blue-option"
                    value="amparo-blue"
                  ></option>
                  <option
                    className="albastru-marin-option"
                    value="albastru-marin"
                  ></option>
                  <option className="bleu-option" value="2"></option>
                </select>
              </div>
            </Form.Group>
            <Form.Group>
              <Form.Label>Culoarea secundara:</Form.Label>
              <div class="custom-select3">
                <select>
                  <option style={{ backgroundColor: "red" }} value="0">
                    Alege Culoarea
                  </option>
                  <option className="bordo-option" value="bordo"></option>
                  <option className="rosu-option" value="rosu"></option>
                  <option
                    className="portocaliu-inchis-option"
                    value="portocaliu-inchis"
                  ></option>
                  <option
                    className="portocaliu-deschis-option"
                    value="portocaliu-deschis"
                  ></option>
                  <option
                    className="galben-lamaie-option"
                    value="galben-lamaie"
                  ></option>
                  <option className="mov-option" value="mov"></option>
                  <option className="fucsia-option" value="fucsia"></option>
                  <option
                    className="roz-bombon-option"
                    value="roz-bombon"
                  ></option>
                  <option className="roz-pal-option" value="roz-pal"></option>
                  <option className="argintiu-option" value="2"></option>
                  <option className="maro-option" value="maro"></option>
                  <option
                    className="cappuccino-option"
                    value="cappuccino"
                  ></option>
                  <option className="bronz-option" value="bronz"></option>
                  <option
                    className="latte-machiato-option"
                    value="latte-machiato"
                  ></option>
                  <option className="crem-option" value="crem"></option>
                  <option className="alb-mat-option" value="alb-mat"></option>
                  <option
                    className="alb-sidefat-option"
                    value="alb-sidefat"
                  ></option>
                  <option className="negru-option" value="negru"></option>
                  <option
                    className="gri-petrol-option"
                    value="gri-petrol"
                  ></option>
                  <option
                    className="gri-albastrui-option"
                    value="gri-albastrui"
                  ></option>
                  <option className="gri-option" value="gri"></option>
                  <option
                    className="verde-crud-option"
                    value="verde-crud"
                  ></option>
                  <option
                    className="verde-fistic-option"
                    value="verde-fistic"
                  ></option>
                  <option className="turcoaz-option" value="turcoaz"></option>
                  <option
                    className="bleumarin-inchis-lucios-option"
                    value="bleumarin-inchis-lucios"
                  ></option>
                  <option
                    className="bleumarin-lucios-option"
                    value="bleumarin-lucios"
                  ></option>
                  <option
                    className="bleumarin-mat-option"
                    value="bleumarin-mat"
                  ></option>
                  <option
                    className="amparo-blue-option"
                    value="amparo-blue"
                  ></option>
                  <option
                    className="albastru-marin-option"
                    value="albastru-marin"
                  ></option>
                  <option className="bleu-option" value="2"></option>
                </select>
              </div>
            </Form.Group>
            <Form.Group>
              <Form.Label>Model: </Form.Label>
              <ImagePicker
                onPick={(e) => {
                  console.log(e);
                  setModelImage(e.value);
                }}
                images={modelsImageMap}
              ></ImagePicker>
            </Form.Group>
            <Form.Group>
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
                  Va rog completati campurile pentru latime,lungime si grosime,
                  culoare principala si secundara, dar si modelul pentru
                  papucel!
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
                <small style={{ float: left }}>
                  Valorile sunt in centimetri.
                </small>
              </Form.Label>
            </Form.Group>
          </Col>
          <Col className="align-items-center d-flex justify-content-center">
            <img
              id="image-presentation"
              src={imageMapSageti[currentImage]}
              className="img-fluid"
            ></img>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default Customize;
